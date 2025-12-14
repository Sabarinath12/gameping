import { NextResponse } from "next/server";
import net from "net";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const target = searchParams.get("target");

    if (!target) {
        return NextResponse.json({ error: "Target is required" }, { status: 400 });
    }

    const checkPort = (port: number, timeout: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            const socket = new net.Socket();
            socket.setTimeout(timeout);

            socket.on("connect", () => {
                socket.destroy();
                resolve();
            });

            socket.on("timeout", () => {
                socket.destroy();
                reject(new Error(`Connection timed out on port ${port}`));
            });

            socket.on("error", (err) => {
                socket.destroy();
                reject(err);
            });

            socket.connect(port, target);
        });
    };

    const start = Date.now();
    const TIMEOUT = 2500;

    try {
        // Try Port 80 first
        try {
            await checkPort(80, TIMEOUT);
        } catch (e) {
            // If 80 fails, try 443
            await checkPort(443, TIMEOUT);
        }

        const latency = Date.now() - start;
        return NextResponse.json({ latency });
    } catch (error) {
        return NextResponse.json({ error: "Failed to ping target", details: String(error) }, { status: 500 });
    }
}
