const fs = require('fs');
const path = require('path');

module.exports = {
  name: "owner",
  alias: ["jay", "realowner", "creator", "boss"],
  category: "general",
  desc: "Show real owner JAY JAY face",

  async exec(m, { sock }) {
    const ownerImage = path.join(__dirname, '..', 'owner.jpg');
    
    const caption = `👑 *JAY JAY REAL OWNER* 👑

┏━━━━━━━━━━━━━━━━┓
┃  REAL OWNER    ┃
┗━━━━━━━━━━━━━━━━┛

👤 *NAME:* JAY JAY
👑 *ROLE:* FOUNDER & REAL OWNER
🤖 *BOT:* JAWAD-MD
⚡ *POWER:* FULL ADMIN
✅ *STATUS:* VERIFIED

🔗 *GITHUB:* github.com/justiceosagie502-prog
📂 *REPO:* JAWAD-MD

💎 *I AM THE REAL BOSS!*
👑 *GITHUB AUTHORIZED OWNER*

Type *.menu* for commands`;

    try {
      if (fs.existsSync(ownerImage)) {
        await sock.sendMessage(m.chat, {
          image: fs.readFileSync(ownerImage),
          caption: caption
        }, { quoted: m });
      } else {
        await sock.sendMessage(m.chat, { text: caption }, { quoted: m });
      }
    } catch (e) {
      await m.reply(caption);
    }
  }
}
