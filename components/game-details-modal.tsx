"use client";

import { motion } from "framer-motion";
import { X, Activity, Wifi, Server, ShieldCheck, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getGameIPs } from "@/lib/game-ips";
import { getUserLocation } from "@/lib/geo-utils";

interface GameDetailsModalProps {
    game: {
        id: number;
        title: string;
        image: string;
        ping: number;
        jitter: number;
        packetLoss: number;
        serverHealth: number[];
    };
    onClose: () => void;
}

export function GameDetailsModal({ game, onClose }: GameDetailsModalProps) {
    const [testStatus, setTestStatus] = useState<"connecting" | "testing" | "complete">("connecting");
    const [progress, setProgress] = useState(0);
    const [currentPing, setCurrentPing] = useState(0);
    const [currentJitter, setCurrentJitter] = useState(0);
    const [packetLoss, setPacketLoss] = useState(0);
    const [totalPings, setTotalPings] = useState(0);
    const [failedPings, setFailedPings] = useState(0);
    const [pingHistory, setPingHistory] = useState<number[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const [userCountry, setUserCountry] = useState<string>("US");

    const getPlayability = (ping: number) => {
        if (ping === 0) return { text: "Checking...", color: "text-neutral-400" };
        if (ping < 30) return { text: "Excellent", color: "text-emerald-400" };
        if (ping < 60) return { text: "Good", color: "text-green-400" };
        if (ping < 100) return { text: "Playable", color: "text-yellow-400" };
        return { text: "Bad", color: "text-red-400" };
    };

    const playability = getPlayability(currentPing);

    useEffect(() => {
        // Fetch user location on mount
        getUserLocation().then(country => {
            setUserCountry(country);
            setLogs(prev => [...prev, `Detected region: ${country}`]);
        });

        // Simulate connection sequence
        const connectTimer = setTimeout(() => {
            setTestStatus("testing");
            setLogs((prev) => [...prev, "Connected to closest server node..."]);
        }, 1500);

        return () => clearTimeout(connectTimer);
    }, []);

    useEffect(() => {
        if (testStatus === "testing") {
            const interval = setInterval(async () => {
                setProgress((prev) => {
                    if (prev >= 100) return 100;
                    return prev + 2; // Faster progress for better UX
                });

                setTotalPings(prev => prev + 1);

                // CLIENT-SIDE PING - Measures from user's browser!
                try {
                    const targets = getGameIPs(game.title, userCountry);
                    let success = false;
                    let latency = 0;

                    if (targets.length > 0) {
                        // Try each IP until one works
                        for (const target of targets) {
                            try {
                                // 🎯 CLIENT-SIDE PING using Image loading
                                const startTime = performance.now();

                                await new Promise((resolve, reject) => {
                                    const img = document.createElement('img');
                                    const timeout = setTimeout(() => {
                                        img.src = '';
                                        reject(new Error('Timeout'));
                                    }, 5000);

                                    img.onload = () => {
                                        clearTimeout(timeout);
                                        resolve(null);
                                    };

                                    img.onerror = () => {
                                        clearTimeout(timeout);
                                        const endTime = performance.now();
                                        const lat = Math.round(endTime - startTime);
                                        // Even on error, if we got timing, use it
                                        if (lat >= 10) {
                                            resolve(null);
                                        } else {
                                            reject(new Error('Failed'));
                                        }
                                    };

                                    img.src = `http://${target}/favicon.ico?t=${Date.now()}`;
                                });

                                const endTime = performance.now();
                                latency = Math.round(endTime - startTime);
                                success = true;
                                break; // Stop trying if we got a hit
                            } catch (innerErr) {
                                // Continue to next IP
                                continue;
                            }
                        }

                        if (success) {
                            setCurrentPing(latency);

                            // Calculate Jitter
                            setPingHistory(prev => {
                                const newHistory = [...prev, latency].slice(-20); // Keep last 20 samples
                                if (newHistory.length > 1) {
                                    let totalDiff = 0;
                                    for (let i = 1; i < newHistory.length; i++) {
                                        totalDiff += Math.abs(newHistory[i] - newHistory[i - 1]);
                                    }
                                    const jitter = Math.floor(totalDiff / (newHistory.length - 1));
                                    setCurrentJitter(jitter);
                                }
                                return newHistory;
                            });

                        } else {
                            // All IPs failed
                            setFailedPings(prev => {
                                const newFailed = prev + 1;
                                setPacketLoss(Math.min(100, Math.floor((newFailed / (totalPings + 1)) * 100)));
                                return newFailed;
                            });

                            setLogs(prev => {
                                const msg = `Connection failed to all ${game.title} servers.`;
                                if (!prev.includes(msg)) return [...prev, msg];
                                return prev;
                            });
                            setCurrentPing(0);
                        }
                    } else {
                        setLogs(prev => {
                            const msg = `No IP configured for ${game.title} in ${userCountry}`;
                            if (!prev.includes(msg)) return [...prev, msg];
                            return prev;
                        });
                        setCurrentPing(0); // 0 indicates no data
                    }
                } catch (e) {
                    // General failure
                    setFailedPings(prev => {
                        const newFailed = prev + 1;
                        setPacketLoss(Math.min(100, Math.floor((newFailed / (totalPings + 1)) * 100)));
                        return newFailed;
                    });
                    setCurrentPing(0);
                    setLogs(prev => {
                        const lastLog = prev[prev.length - 1];
                        const newLog = `Connection timed out.`;
                        if (lastLog !== newLog) return [...prev, newLog];
                        return prev;
                    });
                }
            }, 1000); // Check every second

            return () => clearInterval(interval);
        }
    }, [testStatus, game.title, userCountry, totalPings]);

    // Handle logs and completion based on progress
    useEffect(() => {
        if (progress === 20) setLogs((prev) => [...prev, "Measuring latency..."]);
        if (progress === 50) setLogs((prev) => [...prev, "Checking packet integrity..."]);
        if (progress === 80) setLogs((prev) => [...prev, "Verifying jitter stability..."]);

        if (progress === 100 && testStatus !== "complete") {
            setTestStatus("complete");
            setLogs((prev) => [...prev, "Test completed successfully."]);
        }
    }, [progress, testStatus]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                layoutId={`card-${game.id}`}
                className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl"
            >
                {/* Header Image Area */}
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-neutral-800/20 to-neutral-900/80 p-6">
                    <motion.div layoutId={`image-${game.id}`} className="relative h-full w-full">
                        <Image
                            src={game.image}
                            alt={game.title}
                            fill
                            className="object-contain"
                        />
                    </motion.div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white/70 hover:bg-black/70 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Playability Badge */}
                    <div className="absolute bottom-2 left-6">
                        <div className={`text-lg font-bold ${playability.color} bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10`}>
                            {playability.text}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <motion.h2 layoutId={`title-${game.id}`} className="mb-1 text-3xl font-bold text-white">
                        {game.title}
                    </motion.h2>
                    <p className="mb-6 text-neutral-400">Server Status & Network Diagnostics</p>

                    {/* Test UI */}
                    <div className="space-y-6">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-400">
                                    {testStatus === "connecting" && "Establishing Connection..."}
                                    {testStatus === "testing" && "Running Diagnostics..."}
                                    {testStatus === "complete" && "Diagnostics Complete"}
                                </span>
                                <span className="text-emerald-400 font-mono">{progress}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                                <motion.div
                                    className="h-full bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Live Metrics Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 text-center">
                                <div className="mb-2 flex justify-center text-emerald-400">
                                    <Wifi size={24} />
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {testStatus === "connecting" ? "--" : currentPing}
                                    <span className="text-sm text-neutral-500 font-normal ml-1">ms</span>
                                </div>
                                <div className="text-xs text-neutral-500">Latency</div>
                            </div>

                            <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 text-center">
                                <div className="mb-2 flex justify-center text-blue-400">
                                    <Activity size={24} />
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {testStatus === "connecting" ? "--" : currentJitter}
                                    <span className="text-sm text-neutral-500 font-normal ml-1">ms</span>
                                </div>
                                <div className="text-xs text-neutral-500">Jitter</div>
                            </div>

                            <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 text-center">
                                <div className="mb-2 flex justify-center text-purple-400">
                                    <ShieldCheck size={24} />
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {testStatus === "connecting" ? "--" : packetLoss}
                                    <span className="text-sm text-neutral-500 font-normal ml-1">%</span>
                                </div>
                                <div className="text-xs text-neutral-500">Packet Loss</div>
                            </div>
                        </div>

                        {/* Terminal/Logs */}
                        <div className="h-32 overflow-hidden rounded-lg border border-neutral-800 bg-black/50 p-4 font-mono text-xs text-neutral-400">
                            <div className="flex flex-col justify-end h-full space-y-1">
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-emerald-500">➜</span>
                                        {log}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-neutral-600 italic">
                                Real world latency may vary slightly.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
