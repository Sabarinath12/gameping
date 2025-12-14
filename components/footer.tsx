import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-neutral-800 bg-neutral-950 py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4">
                <nav className="flex gap-6 text-sm text-neutral-400">
                    <Link href="/about" className="hover:text-green-500 transition-colors">About Us</Link>
                    <Link href="/privacy" className="hover:text-green-500 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-green-500 transition-colors">Terms of Service</Link>
                    <Link href="/contact" className="hover:text-green-500 transition-colors">Contact Us</Link>
                </nav>
            </div>
        </footer>
    );
}
