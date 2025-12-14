import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>

                <div className="prose prose-invert prose-green max-w-none">
                    <p className="text-lg text-neutral-300 mb-6">
                        <strong>PingYourGame</strong> is a free, real-time game server ping testing tool designed for gamers worldwide. We help you check your connection quality to popular online games before you start playing.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Mission</h2>
                    <p className="text-neutral-300 mb-4">
                        We believe every gamer deserves to know their connection quality before jumping into a match. Our platform provides accurate, real-time ping data to help you:
                    </p>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Choose the best server for your location</li>
                        <li>Identify connection issues before they affect gameplay</li>
                        <li>Make informed decisions about your gaming experience</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What We Offer</h2>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li><strong>Real-time Ping Testing</strong>: Live connection monitoring to game servers</li>
                        <li><strong>Global Coverage</strong>: Support for 8 major games across 50+ countries</li>
                        <li><strong>Accurate Metrics</strong>: Ping, jitter, and packet loss measurements</li>
                        <li><strong>Free Forever</strong>: No registration, no hidden fees, no ads</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Technology</h2>
                    <p className="text-neutral-300 mb-6">
                        We use TCP-based ping testing to provide the most accurate measurements possible. Our infrastructure spans multiple regions worldwide, ensuring reliable testing from anywhere on the globe.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Supported Games</h2>
                    <p className="text-neutral-300">
                        Counter-Strike 2 • Valorant • Apex Legends • League of Legends • Dota 2 • Fortnite • Overwatch 2 • Rocket League
                    </p>
                </div>
            </div>
        </div>
    );
}
