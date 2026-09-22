const fs = require('fs');
const path = require('path');
module.exports = {
    name: "owner",
    alias: ["jay","creator","boss"],
    category: "general",
    desc: "Show real owner face",
    async exec(m, { sock }) {
        let imgPath = './owner.jpg';
        if (!fs.existsSync(imgPath)) imgPath = path.join(__dirname, '../owner.jpg');
        if (!fs.existsSync(imgPath)) return m.reply("❌ owner.jpg not found! Upload your photo as owner.jpg");
        await sock.sendMessage(m.chat, {
            image: fs.readFileSync(imgPath),
            caption: `👑 *JAY JAY REAL OWNER* 👑\n\nYes boss, this is my real face! ❤️`
        }, { quoted: m });
    }
}