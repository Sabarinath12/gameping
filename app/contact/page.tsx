import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Bug, Users } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
                <p className="text-lg text-neutral-300 mb-12">
                    We&apos;d love to hear from you! Whether you have questions, feedback, or need support, we&apos;re here to help.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* General Inquiries */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="h-6 w-6 text-green-500" />
                            <h2 className="text-xl font-semibold text-white">General Inquiries</h2>
                        </div>
                        <p className="text-neutral-400 mb-2">For general questions and information</p>
                        <a href="mailto:support@pingyourgame.com" className="text-green-500 hover:text-green-400 transition-colors">
                            support@pingyourgame.com
                        </a>
                    </div>

                    {/* Technical Support */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Bug className="h-6 w-6 text-green-500" />
                            <h2 className="text-xl font-semibold text-white">Technical Support</h2>
                        </div>
                        <p className="text-neutral-400 mb-2">Having technical issues?</p>
                        <a href="mailto:tech@pingyourgame.com" className="text-green-500 hover:text-green-400 transition-colors">
                            tech@pingyourgame.com
                        </a>
                    </div>

                    {/* Feedback */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageSquare className="h-6 w-6 text-green-500" />
                            <h2 className="text-xl font-semibold text-white">Feedback & Suggestions</h2>
                        </div>
                        <p className="text-neutral-400 mb-2">Share your ideas with us</p>
                        <a href="mailto:support@pingyourgame.com" className="text-green-500 hover:text-green-400 transition-colors">
                            support@pingyourgame.com
                        </a>
                    </div>

                    {/* Business */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="h-6 w-6 text-green-500" />
                            <h2 className="text-xl font-semibold text-white">Business Inquiries</h2>
                        </div>
                        <p className="text-neutral-400 mb-2">Partnerships and collaborations</p>
                        <a href="mailto:business@pingyourgame.com" className="text-green-500 hover:text-green-400 transition-colors">
                            business@pingyourgame.com
                        </a>
                    </div>
                </div>

                <div className="prose prose-invert prose-green max-w-none">
                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Response Time</h2>
                    <p className="text-neutral-300 mb-6">
                        We typically respond within 24-48 hours. For urgent technical issues, please include &quot;URGENT&quot; in your subject line.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Bug Reports</h2>
                    <p className="text-neutral-300 mb-4">Found a bug? Please include:</p>
                    <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-2">
                        <li>Your browser and operating system</li>
                        <li>Steps to reproduce the issue</li>
                        <li>Screenshots if applicable</li>
                        <li>Which game you were testing</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">General Support</h2>
                    <p className="text-neutral-300">
                        For any questions, feedback, or support, please email us at{" "}
                        <a href="mailto:support@pingyourgame.com" className="text-green-500 hover:text-green-400 font-semibold">
                            support@pingyourgame.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
