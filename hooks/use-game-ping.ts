import { useState, useEffect, useRef } from 'react';
import { getGameIPs } from '@/lib/game-ips';
import { getUserLocation } from '@/lib/geo-utils';

interface PingStats {
    ping: number;
    jitter: number;
    packetLoss: number;
    history: number[];
    status: 'connecting' | 'active' | 'error';
}

/**
 * HYBRID PING CALCULATION
 * estimated_ping = user_to_server_RTT + server_to_game_RTT
 * 
 * This works around browser CORS restrictions by:
 * 1. Client measures: User → Your Server (RTT)
 * 2. Server measures: Your Server → Game Server (RTT)
 * 3. Combine both for accurate total ping
 */

async function measureUserToServerRTT(): Promise<number> {
    const startTime = performance.now();

    try {
        // Ping our own API endpoint (lightweight)
        await fetch('/api/ping?healthcheck=true', {
            method: 'HEAD',
            cache: 'no-store'
        });

        const endTime = performance.now();
        return Math.round(endTime - startTime);
    } catch (error) {
        throw new Error('Failed to measure user-to-server RTT');
    }
}

async function getServerToGameRTT(target: string): Promise<number> {
    try {
        // Server measures its ping to game server
        const res = await fetch(`/api/ping?target=${target}`);
        const data = await res.json();

        if (typeof data.latency === 'number' && data.latency >= 0) {
            return data.latency;
        }

        throw new Error('Invalid server response');
    } catch (error) {
        throw new Error('Failed to get server-to-game RTT');
    }
}

async function calculateHybridPing(target: string): Promise<number> {
    // Measure both RTTs in parallel for speed
    const [userToServer, serverToGame] = await Promise.all([
        measureUserToServerRTT(),
        getServerToGameRTT(target)
    ]);

    // Total estimated ping = user→server + server→game
    return userToServer + serverToGame;
}

// Alternative: WebSocket ping (more accurate for game servers)
async function websocketPing(target: string, port: number = 80): Promise<number> {
    return new Promise((resolve, reject) => {
        const startTime = performance.now();
        const ws = new WebSocket(`ws://${target}:${port}`);

        const timeout = setTimeout(() => {
            ws.close();
            reject(new Error('Timeout'));
        }, 5000);

        ws.onopen = () => {
            const endTime = performance.now();
            clearTimeout(timeout);
            ws.close();
            resolve(Math.round(endTime - startTime));
        };

        ws.onerror = () => {
            const endTime = performance.now();
            clearTimeout(timeout);
            ws.close();
            // Still return timing even on error
            resolve(Math.round(endTime - startTime));
        };
    });
}

export function useGamePing(gameTitle: string, intervalMs: number = 5000) {
    const [stats, setStats] = useState<PingStats>({
        ping: 0,
        jitter: 0,
        packetLoss: 0,
        history: [],
        status: 'connecting'
    });

    const [userCountry, setUserCountry] = useState<string | null>(null);
    const historyRef = useRef<number[]>([]);
    const totalPingsRef = useRef(0);
    const failedPingsRef = useRef(0);

    // 1. Get User Location (client-side)
    useEffect(() => {
        getUserLocation().then(country => setUserCountry(country));
    }, []);

    // 2. Hybrid Ping Loop
    useEffect(() => {
        if (!userCountry) return;

        const targets = getGameIPs(gameTitle, userCountry);
        if (targets.length === 0) {
            setStats(prev => ({ ...prev, status: 'error' }));
            return;
        }

        const pingFunction = async () => {
            totalPingsRef.current += 1;
            let success = false;
            let latency = 0;

            // Try each IP until one works
            for (const target of targets) {
                try {
                    // 🎯 HYBRID PING CALCULATION
                    // estimated_ping = user_to_server_RTT + server_to_game_RTT
                    latency = await calculateHybridPing(target);
                    success = true;
                    break;
                } catch (e) {
                    // Try next IP
                    continue;
                }
            }

            if (success) {
                // Update History & Jitter
                const newHistory = [...historyRef.current, latency].slice(-20);
                historyRef.current = newHistory;

                let jitter = 0;
                if (newHistory.length > 1) {
                    let totalDiff = 0;
                    for (let i = 1; i < newHistory.length; i++) {
                        totalDiff += Math.abs(newHistory[i] - newHistory[i - 1]);
                    }
                    jitter = Math.floor(totalDiff / (newHistory.length - 1));
                }

                // Update Packet Loss
                const loss = Math.min(100, Math.floor((failedPingsRef.current / totalPingsRef.current) * 100));

                setStats({
                    ping: latency,
                    jitter,
                    packetLoss: loss,
                    history: newHistory,
                    status: 'active'
                });
            } else {
                // All IPs failed
                failedPingsRef.current += 1;
                const loss = Math.min(100, Math.floor((failedPingsRef.current / totalPingsRef.current) * 100));

                setStats(prev => ({
                    ...prev,
                    ping: 0,
                    packetLoss: loss,
                    status: prev.status === 'connecting' ? 'error' : 'active'
                }));
            }
        };

        // Initial ping
        pingFunction();

        // Interval
        const intervalId = setInterval(pingFunction, intervalMs);
        return () => clearInterval(intervalId);

    }, [gameTitle, userCountry, intervalMs]);

    return stats;
}
