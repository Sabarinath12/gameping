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
    // Use a staggered interval to prevent all cards pinging at once
    const [intervalMs, setIntervalMs] = useState(5000);

    useEffect(() => {
        // Randomize start time slightly to distribute network load
        const randomDelay = Math.floor(Math.random() * 2000);
        const timer = setTimeout(() => {
            setIntervalMs(5000);
        }, randomDelay);
        return () => clearTimeout(timer);
    }, []);

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
