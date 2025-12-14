"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HyperText } from "@/components/ui/hyper-text";
import { useState } from "react";
import Link from "next/link";

export function Header() {
    const [showComingSoon, setShowComingSoon] = useState(false);

    const handleSearchClick = () => {
        setShowComingSoon(true);
        setTimeout(() => setShowComingSoon(false), 2000);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
                {/* Logo - Left Side */}
                <Link href="/" className="flex-shrink-0 z-20">
                    <HyperText
                        text="PingYourGame"
                        className="text-xl font-extrabold text-neutral-300 tracking-tight"
                        duration={1000}
                        animateOnLoad={false}
                    />
                </Link>

                {/* Desktop Search - Center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                        <Input
                            type="search"
                            placeholder="Search for a game..."
                            className="w-full bg-neutral-900 border-neutral-800 pl-9 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-green-500 cursor-pointer"
                            onClick={handleSearchClick}
                            readOnly
                        />
                    </div>
                </div>

                {/* Mobile Search - visible only on small screens */}
                <div className="flex-1 mx-4 md:hidden">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full bg-neutral-900 border-neutral-800 pl-9 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-green-500 cursor-pointer"
                            onClick={handleSearchClick}
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Coming Soon Popup */}
            {showComingSoon && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-neutral-900 border border-neutral-700 rounded-lg px-6 py-4 shadow-2xl max-w-sm">
                        <p className="text-sm font-semibold text-white mb-1">Search Feature Coming Soon</p>
                        <p className="text-xs text-neutral-400">We&apos;re adding more games and improving search functionality. Stay tuned!</p>
                    </div>
                </div>
            )}
        </header>
    );
}
