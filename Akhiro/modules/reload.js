module.exports = {
  metadata: {
    name: ["reload", "load"],
    role: 2,
    author: "Liane",
    hasPrefix: false,
    description: "Reload modules",
    usage: "Reload",
  },
  async onRun({ api, event, args, box }) {
    const { loadAll } = global.Akhiro.utils;
    try {
      await loadAll();
    } catch (err) {
      return api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
    const system = `⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠
━━━━━━━━━━━━━━━`;
    //work smart, not work hard.
    const i = await box.reply(`${system}
⚙️ | Getting started..`);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`${system}
🔃 | Reloading the latest edited codes.`, i.messageID);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`${system}
📥 | Updating the system..`, i.messageID);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`${system}
📥 | Almost there...`, i.messageID);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`${system}
🟢 | Loaded All modules!`, i.messageID);
  },
};
