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
 * CLIENT-SIDE PING using Image loading
 * This measures latency directly from the user's browser to the target server
 * Works around CORS by using image loading timing
 */
async function clientSidePing(target: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const startTime = performance.now();
        const img = document.createElement('img');

        // Timeout after 5 seconds
        const timeout = setTimeout(() => {
            img.src = '';
            reject(new Error('Timeout'));
        }, 5000);

        img.onload = () => {
            clearTimeout(timeout);
            const endTime = performance.now();
            resolve(Math.round(endTime - startTime));
        };

        img.onerror = () => {
            clearTimeout(timeout);
            const endTime = performance.now();
            const latency = Math.round(endTime - startTime);

            // Even on error, we got timing data
            // If it failed too quickly, it's a real error
            if (latency < 10) {
                reject(new Error('Connection failed'));
            } else {
                // Server responded (even with error), so we have latency
                resolve(latency);
            }
        };

        // Try to load a tiny resource from the target
        // Add timestamp to prevent caching
        img.src = `http://${target}/favicon.ico?t=${Date.now()}`;
    });
}

/**
 * Alternative: Multiple ping samples for accuracy
 */
async function measureLatency(target: string, samples: number = 3): Promise<number> {
    const results: number[] = [];

    for (let i = 0; i < samples; i++) {
        try {
            const latency = await clientSidePing(target);
            results.push(latency);
        } catch (e) {
            // Skip failed attempts
            continue;
        }
    }

    if (results.length === 0) {
        throw new Error('All ping attempts failed');
    }

    // Return median for accuracy
    results.sort((a, b) => a - b);
    return results[Math.floor(results.length / 2)];
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

    // 2. Client-Side Ping Loop
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
                    // 🎯 CLIENT-SIDE PING - Measures from user's browser!
                    // This is the actual user's latency to the game server
                    latency = await clientSidePing(target);
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
