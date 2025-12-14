// verify_probes.js
// Node 18+
// Usage: node verify_probes.js --input=servers.json --out=results.csv --concurrency=8
import { exec } from "child_process";
import fs from "fs/promises";
import dns from "dns/promises";
import net from "net";
import os from "os";
import { argv } from "process";

function parseArg(name, def) {
    const arg = argv.find(a => a.startsWith(`--${name}=`));
    return arg ? arg.split("=")[1] : def;
}

const inputFile = parseArg("input", "servers.json");
const outFile = parseArg("out", "results.csv");
const concurrency = parseInt(parseArg("concurrency", "8"), 10);

async function loadInput() {
    const raw = await fs.readFile(inputFile, "utf8");
    return JSON.parse(raw);
}

// simple wrapper for shell ping (ICMP) - uses system ping
function pingHost(host, count = 3, timeout = 5) {
    return new Promise((res) => {
        // cross-platform: Linux/Unix style
        const cmd = `ping -c ${count} -W ${timeout} ${host}`;
        exec(cmd, { timeout: (count * timeout + 2) * 1000 }, (err, stdout, stderr) => {
            if (err) {
                return res({ ok: false, rtt_ms: null, raw: stderr || err.message });
            }
            // parse avg rtt from stdout
            const m = stdout.match(/rtt min\/avg\/max\/mdev = [^/]+\/([^/]+)\//);
            const avg = m ? parseFloat(m[1]) : null;
            res({ ok: true, rtt_ms: avg, raw: stdout });
        });
    });
}

function tcpConnect(host, port = 80, timeout = 4000) {
    return new Promise((res) => {
        const s = new net.Socket();
        let done = false;
        s.setTimeout(timeout);
        s.on("connect", () => { if (!done) { done = true; s.destroy(); res({ ok: true }) } });
        s.on("timeout", () => { if (!done) { done = true; s.destroy(); res({ ok: false, reason: "timeout" }) } });
        s.on("error", (e) => { if (!done) { done = true; res({ ok: false, reason: e.message }) } });
        s.connect(port, host);
    });
}

async function verifyEndpoint(ep) {
    // resolve first to ip if hostname
    let ip = ep;
    try {
        const r = await dns.lookup(ep);
        ip = r.address;
    } catch (e) {
        // keep hostname if DNS fails
        ip = ep;
    }

    const pingRes = await pingHost(ip).catch(() => ({ ok: false }));
    const tcp80 = await tcpConnect(ip, 80).catch(() => ({ ok: false }));
    const tcp443 = await tcpConnect(ip, 443).catch(() => ({ ok: false }));

    return {
        endpoint: ep,
        ip,
        icmp_ok: !!pingRes.ok,
        icmp_rtt_ms: pingRes.rtt_ms,
        tcp80_ok: !!tcp80.ok,
        tcp443_ok: !!tcp443.ok,
        raw: pingRes.raw ? String(pingRes.raw).slice(0, 200) : "",
    };
}

async function main() {
    const data = await loadInput(); // expecting [{game,country,city,endpoint}, ...]
    const out = [];
    for (const row of data) {
        console.log(`Verifying ${row.game} ${row.country} ${row.city} -> ${row.endpoint}`);
        const r = await verifyEndpoint(row.endpoint);
        out.push({ ...row, ...r });
    }
    // write CSV
    const header = Object.keys(out[0]).join(",");
    const lines = out.map(o => Object.values(o).map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
    await fs.writeFile(outFile, [header, ...lines].join(os.EOL), "utf8");
    console.log("Done. Results:", outFile);
}

main().catch(e => { console.error(e); process.exit(1) });
