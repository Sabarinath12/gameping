"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity, Wifi, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

interface GameCardProps {
    id: number;
    title: string;
    image: string;
    ping: number;
    jitter: number;
    packetLoss: number;
    serverHealth: number[];
    onClick: () => void;
}

export function GameCard({
    id,
    title,
    image,
    ping,
    jitter,
    packetLoss,
    serverHealth,
    onClick,
}: GameCardProps) {
    const getPlayability = (ping: number) => {
        if (ping === 0) return { text: "N/A", color: "text-neutral-500 bg-neutral-500/10 border-neutral-500/20" };
        if (ping < 30) return { text: "Excellent", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" };
        if (ping < 60) return { text: "Good", color: "text-green-400 bg-green-400/10 border-green-400/20" };
        if (ping < 100) return { text: "Playable", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" };
        return { text: "Bad", color: "text-red-400 bg-red-400/10 border-red-400/20" };
    };

    const status = getPlayability(ping);

    return (
        <motion.div
            layoutId={`card-${id}`}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            className="h-full cursor-pointer"
        >
            <GlowCard
                customSize={true}
                className="h-full aspect-square p-4 overflow-hidden relative"
                glowColor="cyan"
            >
                <div className="flex flex-col h-full z-10 relative">
                    <div className="flex-1 relative w-full min-h-0">
                        <motion.div layoutId={`image-${id}`} className="relative h-full w-full drop-shadow-2xl">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-contain p-2"
                            />
                        </motion.div>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 pt-3">
                        <motion.h3 layoutId={`title-${id}`} className="truncate text-lg font-bold text-white text-center w-full">
                            {title}
                        </motion.h3>
                        <div className="flex items-center gap-2 justify-center">
                            <div className={`text-xs font-medium px-2 py-0.5 rounded-full border ${status.color}`}>
                                {status.text}
                            </div>
                            <div className="text-xs text-neutral-400 font-mono">
                                {ping}ms
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sparkline */}
                <div className="absolute bottom-0 left-0 right-0 flex h-12 items-end gap-0.5 opacity-20 px-4 pb-4 pointer-events-none z-0">
                    {serverHealth.slice(-20).map((value, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-t-sm ${value > 80 ? "bg-red-500" : value > 50 ? "bg-yellow-500" : "bg-emerald-500"}`}
                            style={{ height: `${value}%` }}
                        />
                    ))}
                </div>
            </GlowCard>
        </motion.div>
    );
}
