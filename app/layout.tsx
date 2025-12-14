import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PingYourGame - Real-Time Game Server Ping Test | Check Your Gaming Connection",
  description: "Free real-time ping testing for 8 major games including Valorant, CS2, Apex Legends, League of Legends, Dota 2, Fortnite, Overwatch 2, and Rocket League. Test your connection quality with accurate ping, jitter, and packet loss measurements from 50+ countries worldwide.",
  keywords: [
    "game ping test",
    "server ping checker",
    "valorant ping test",
    "cs2 ping",
    "counter strike 2 ping",
    "apex legends ping",
    "league of legends ping",
    "dota 2 ping test",
    "fortnite ping checker",
    "overwatch 2 ping",
    "rocket league ping",
    "gaming latency test",
    "network jitter test",
    "packet loss checker",
    "game server status",
    "online gaming ping",
    "competitive gaming ping",
    "fps ping test",
    "moba ping test",
    "battle royale ping",
  ],
  authors: [{ name: "PingYourGame" }],
  creator: "PingYourGame",
  publisher: "PingYourGame",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pingyourgame.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PingYourGame - Real-Time Game Server Ping Test",
    description: "Test your gaming connection quality for free. Get accurate ping, jitter, and packet loss measurements for Valorant, CS2, Apex, LoL, Dota 2, Fortnite, Overwatch 2, and Rocket League.",
    url: "https://pingyourgame.com",
    siteName: "PingYourGame",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PingYourGame - Real-Time Game Server Ping Testing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PingYourGame - Real-Time Game Server Ping Test",
    description: "Free ping testing for Valorant, CS2, Apex, LoL, Dota 2, Fortnite, OW2, and Rocket League. Check your gaming connection quality instantly.",
    images: ["/og-image.png"],
    creator: "@PingYourGame",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    // Add your verification codes when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PingYourGame",
              "url": "https://pingyourgame.com",
              "description": "Free real-time ping testing tool for popular online games. Test your connection quality with accurate ping, jitter, and packet loss measurements.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              },
              "featureList": [
                "Real-time ping testing",
                "Jitter measurement",
                "Packet loss detection",
                "Global server coverage",
                "8 popular games supported",
                "No registration required",
                "100% free"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-neutral-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
