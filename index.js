require('http').createServer((_,r)=>r.end('JAWAD-MD ALIVE')).listen(process.env.PORT||10000, '0.0.0.0');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const P = require("pino");
const config = require("./config");
const { serialize } = require("./lib/serialize");
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, P({ level: "silent" })) },
        browser: ["JAY JAY MD", "Chrome", "1.0.0"]
    });
    sock.ev.on("creds.update", saveCreds);
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom && lastDisconnect.error.output.statusCode!== DisconnectReason.loggedOut);
            if (shouldReconnect) startBot();
        } else if (connection === "open") {
            console.log("✅ JAY JAY MD Connected!");
        }
    });
    sock.ev.on("messages.upsert", async (m) => {
        try {
            const msg = m.messages[0];
            if (!msg.message) return;
            const serialized = await serialize(sock, msg);
            const pluginsDir = path.join(__dirname, "plugins");
            const files = fs.readdirSync(pluginsDir);
            for (const file of files) {
                if (!file.endsWith(".js")) continue;
                try {
                    const plugin = require(path.join(pluginsDir, file));
                    if (plugin.exec) await plugin.exec(serialized, { sock, config });
                } catch {}
            }
        } catch (e) { console.log(e); }
    });
}
startBot();