module.exports = {
  metadata: {
    name: ["reload", "load"],
    role: 2,
    author: "Liane",
    hasPrefix: false,
    description: "Reload modules",
    usage: "Reload",
  },
  onRun: async ({ api, event, args, box }) => {
    const { loadAll } = global.Akhiro.utils;
    try {
      await loadAll();
    } catch (err) {
      return api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
    const i = await box.reply(`⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠
━━━━━━━━━━━━━━━
⚙️ | Getting started..`);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠
━━━━━━━━━━━━━━━
🔃 | Reloading the latest edited codes.`, i.messageID);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠
━━━━━━━━━━━━━━━
📥 | Updating the system..`, i.messageID);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠 ━━━━━━━━━━━━━━━
📥 | Almost there...`, i.messageID);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠 ━━━━━━━━━━━━━━━
🟢 | Loaded All modules!`, i.messageID);
  },
};
