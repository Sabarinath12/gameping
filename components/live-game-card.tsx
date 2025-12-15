"use client";

import { GameCard } from "@/components/game-card";
import { useGamePing } from "@/hooks/use-game-ping";
import { useEffect, useState } from "react";

interface LiveGameCardProps {
    id: number;
    title: string;
    image: string;
    initialPing: number;
    initialJitter: number;
    initialPacketLoss: number;
    initialServerHealth: number[];
    onClick: () => void;
}

export function LiveGameCard({
    id,
    title,
    image,
    initialPing,
    initialJitter,
    initialPacketLoss,
    initialServerHealth,
    onClick
}: LiveGameCardProps) {
    // Use longer interval on mobile to save battery
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseInterval = isMobile ? 10000 : 5000; // 10s on mobile, 5s on desktop

    const [intervalMs, setIntervalMs] = useState(baseInterval);

    useEffect(() => {
        // Randomize start time slightly to distribute network load
        const randomDelay = Math.floor(Math.random() * 2000);
        const timer = setTimeout(() => {
            setIntervalMs(baseInterval);
        }, randomDelay);
        return () => clearTimeout(timer);
    }, [baseInterval]);

    const { ping, jitter, packetLoss, history, status } = useGamePing(title, intervalMs);

    // Use real data if active, otherwise fall back to initial (mock) data
    // But for "serverHealth" (sparkline), we want to show the real history if available

    const displayPing = status === 'active' ? ping : initialPing;
    const displayJitter = status === 'active' ? jitter : initialJitter;
    const displayPacketLoss = status === 'active' ? packetLoss : initialPacketLoss;

    // If history is empty (connecting), show initial mock health, otherwise show real history
    // We need to pad the history to 40 items for the sparkline to look consistent if needed, 
    // or just pass what we have. GameCard expects number[].
    const displayHealth = history.length > 0 ? history : initialServerHealth;

    return (
        <GameCard
            id={id}
            title={title}
            image={image}
            ping={displayPing}
            jitter={displayJitter}
            packetLoss={displayPacketLoss}
            serverHealth={displayHealth}
            onClick={onClick}
        />
    );
}
