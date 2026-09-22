
const { getContentType } = require('@whiskeysockets/baileys')

function serialize(conn, m) {
    if (!m) return m
    let M = {}
    M.isGroup = m.key.remoteJid.endsWith('@g.us')
    M.chat = m.key.remoteJid
    M.id = m.key.id
    M.isBot = m.key.id.startsWith('BAE5') && m.key.id.length === 16
    M.fromMe = m.key.fromMe
    M.sender = conn.decodeJid(m.key.fromMe && conn.user.id || m.participant || m.key.participant || m.key.remoteJid || '')
    if (m.message) {
        M.type = getContentType(m.message)
        M.msg = m.message[M.type]
        M.body = m.message.conversation || M.msg.caption || M.msg.text || (M.type == 'listResponseMessage' && M.msg.singleSelectReply.selectedRowId) || (M.type == 'buttonsResponseMessage' && M.msg.selectedButtonId) || (M.type == 'viewOnceMessage' && M.msg.message[getContentType(M.msg.message)].text) || ''
    }
    return M
}
module.exports = { serialize }