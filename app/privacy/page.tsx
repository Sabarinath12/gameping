import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                <p className="text-sm text-neutral-400 mb-8">Last Updated: December 13, 2025</p>

                <div className="prose prose-invert prose-green max-w-none">
                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Your Privacy Matters</h2>
                    <p className="text-neutral-300 mb-6">
                        At PingYourGame, we respect your privacy. This policy explains what data we collect and how we use it.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Information We Collect</h2>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Automatically Collected:</h3>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Your approximate location (country-level only) to route ping tests to the nearest server</li>
                        <li>Ping test results (latency, jitter, packet loss)</li>
                        <li>Browser type and device information for compatibility purposes</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">We DO NOT Collect:</h3>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Personal information (name, email, phone number)</li>
                        <li>Precise location (city, street address, GPS coordinates)</li>
                        <li>Gaming accounts or credentials</li>
                        <li>Payment information (we don&apos;t charge for anything)</li>
                        <li>Browsing history or cookies for tracking</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How We Use Your Data</h2>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li><strong>Location Data</strong>: Used only to select the nearest game server for accurate ping testing</li>
                        <li><strong>Test Results</strong>: Displayed to you in real-time, not stored permanently</li>
                        <li><strong>Technical Data</strong>: Used to improve service compatibility and performance</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Data Storage</h2>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Ping test results are temporary and not permanently stored</li>
                        <li>No user accounts or databases of personal information</li>
                        <li>All data is processed in real-time and discarded after display</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Third-Party Services</h2>
                    <p className="text-neutral-300 mb-6">
                        We do not share your data with third parties. We do not use analytics, advertising, or tracking services.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Your Rights</h2>
                    <p className="text-neutral-300 mb-6">
                        Since we don&apos;t collect or store personal data, there&apos;s nothing to delete or export. You can use our service completely anonymously.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Changes to This Policy</h2>
                    <p className="text-neutral-300 mb-6">
                        We may update this policy occasionally. Changes will be posted on this page with an updated date.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Contact</h2>
                    <p className="text-neutral-300">
                        If you have questions about privacy, contact us at: <a href="mailto:support@pingyourgame.com" className="text-green-500 hover:text-green-400">support@pingyourgame.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
