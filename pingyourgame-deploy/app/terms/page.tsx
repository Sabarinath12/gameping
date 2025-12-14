import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
                <p className="text-sm text-neutral-400 mb-8">Last Updated: December 13, 2025</p>

                <div className="prose prose-invert prose-green max-w-none">
                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Acceptance of Terms</h2>
                    <p className="text-neutral-300 mb-6">
                        By using PingYourGame, you agree to these terms. If you don&apos;t agree, please don&apos;t use our service.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Service Description</h2>
                    <p className="text-neutral-300 mb-6">
                        PingYourGame provides free, real-time ping testing to game servers. We measure connection quality (latency, jitter, packet loss) to help you assess your gaming experience.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Acceptable Use</h2>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">You May:</h3>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Use our service for personal, non-commercial purposes</li>
                        <li>Test your connection to any supported game</li>
                        <li>Share results with others</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">You May NOT:</h3>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Use automated tools to spam our servers</li>
                        <li>Attempt to hack, disrupt, or overload our infrastructure</li>
                        <li>Use our service for illegal activities</li>
                        <li>Claim our service as your own or redistribute it</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Service Availability</h2>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>We provide our service &quot;as is&quot; without guarantees of uptime</li>
                        <li>We may perform maintenance or updates at any time</li>
                        <li>We reserve the right to limit usage if abuse is detected</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Accuracy Disclaimer</h2>
                    <p className="text-neutral-300 mb-4">While we strive for accuracy, ping results may vary based on:</p>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Your internet connection quality</li>
                        <li>Network congestion</li>
                        <li>Server availability</li>
                        <li>Geographic distance</li>
                    </ul>

                    <p className="text-neutral-300 mb-4"><strong>We are not responsible for:</strong></p>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Inaccurate measurements due to network conditions</li>
                        <li>Game server availability or performance</li>
                        <li>Your gaming experience or match outcomes</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Intellectual Property</h2>
                    <p className="text-neutral-300 mb-6">
                        All content, design, and code on PingYourGame is owned by us or our licensors. You may not copy, modify, or redistribute our service without permission.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Limitation of Liability</h2>
                    <p className="text-neutral-300 mb-4">PingYourGame is provided free of charge. We are not liable for:</p>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Service interruptions or downtime</li>
                        <li>Inaccurate ping measurements</li>
                        <li>Any damages resulting from use of our service</li>
                        <li>Third-party game server issues</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Changes to Terms</h2>
                    <p className="text-neutral-300 mb-6">
                        We may update these terms at any time. Continued use of our service constitutes acceptance of new terms.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Termination</h2>
                    <p className="text-neutral-300 mb-6">
                        We reserve the right to terminate or restrict access to users who violate these terms.
                    </p>
                </div>
            </div>
        </div>
    );
}
