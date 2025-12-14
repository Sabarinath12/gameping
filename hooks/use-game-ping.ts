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

    // 1. Get User Location
    useEffect(() => {
        getUserLocation().then(country => setUserCountry(country));
    }, []);

    // 2. Ping Loop
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

            // Try IPs until one works
            for (const target of targets) {
                try {
                    const res = await fetch(`/api/ping?target=${target}`);
                    const data = await res.json();
                    if (typeof data.latency === 'number' && data.latency >= 0) {
                        latency = data.latency;
                        success = true;
                        break;
                    }
                } catch (e) {
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
                // Failure
                failedPingsRef.current += 1;
                const loss = Math.min(100, Math.floor((failedPingsRef.current / totalPingsRef.current) * 100));

                setStats(prev => ({
                    ...prev,
                    ping: 0,
                    packetLoss: loss,
                    status: prev.status === 'connecting' ? 'error' : 'active' // Keep active if we had data before
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
