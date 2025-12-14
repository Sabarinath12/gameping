"use client";

import { BeamsBackground } from "@/components/ui/beams-background";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LiveGameCard } from "@/components/live-game-card";
import { GameDetailsModal } from "@/components/game-details-modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Mock Data
const GAMES = [
  {
    id: 1,
    title: "Valorant",
    image: "/logos/valorant.png",
    ping: 24,
    jitter: 2,
    packetLoss: 0,
    serverHealth: Array.from({ length: 40 }, () => Math.floor(Math.random() * 40) + 10),
  },
  {
    id: 2,
    title: "Counter-Strike 2",
    image: "/logos/cs2.png",
    ping: 32,
    jitter: 4,
    packetLoss: 0,
    serverHealth: Array.from({ length: 40 }, () => Math.floor(Math.random() * 50) + 15),
  },
  {
    id: 3,
    title: "Apex Legends",
    image: "/logos/apex.png",
    ping: 45,
    jitter: 6,
    packetLoss: 0.5,
    serverHealth: Array.from({ length: 40 }, () => Math.floor(Math.random() * 60) + 20),
  },
  {
    id: 4,
    title: "League of Legends",
    image: "/logos/lol.png",
    ping: 28,
    jitter: 3,
    packetLoss: 0,
    serverHealth: Array.from({ length: 40 }, () => Math.floor(Math.random() * 30) + 10),
  },
  {
    id: 5,
    title: "Dota 2",
    image: "/logos/dota2.png",
    ping: 38,
    jitter: 5,
    packetLoss: 0,
    serverHealth: Array.from({ length: 40 }, () => Math.floor(Math.random() * 40) + 20),
  },
  {
    id: 6,
    title: "Fortnite",
    image: "/logos/fortnite.png",
    ping: 18,
    jitter: 1,
    packetLoss: 0,
    serverHealth: Array.from({ length: 40 }, () => Math.floor(Math.random() * 20) + 5),
  },
  {
    id: 7,
    title: "Overwatch 2",
    image: "/logos/overwatch2.png",
    ping: 42,
    jitter: 8,
    packetLoss: 1.2,
    serverHealth: Array.from({ length: 40 }, () => Math.floor(Math.random() * 70) + 30),
  },
  {
    id: 8,
    title: "Rocket League",
    image: "/logos/rocketleague.svg",
    ping: 22,
    jitter: 2,
    packetLoss: 0,
    serverHealth: Array.from({ length: 40 }, () => Math.floor(Math.random() * 30) + 10),
  },
];

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<typeof GAMES[0] | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 font-[family-name:var(--font-geist-sans)]">
      <BeamsBackground className="fixed inset-0 z-0">
        <div className="pointer-events-none absolute inset-0 bg-neutral-950/50" />
      </BeamsBackground>

      <div className="relative z-10 flex flex-1 flex-col">
        <Header />

        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {GAMES.map((game) => (
              <LiveGameCard
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                initialPing={game.ping}
                initialJitter={game.jitter}
                initialPacketLoss={game.packetLoss}
                initialServerHealth={game.serverHealth}
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>

      <AnimatePresence>
        {selectedGame && (
          <GameDetailsModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
