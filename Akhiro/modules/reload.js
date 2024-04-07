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
    const errs = await loadAll();
    const system = `⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠
━━━━━━━━━━━━━━━`;
    //work smart, not work hard.
    const i = await box.reply(`${system}
⚙️ | Getting started..`);
    await new Promise(r => setTimeout(r, 1000));
    await box.edit(`${system}
🔃 | Reloading the latest edited codes.`, i.messageID);
    let res = `${system}
❌ | Failed to reload ${Object.keys(errs).length} modules:\n\n`;
    await new Promise(r => setTimeout(r, 1000));
    let num = 1;
    if (errs) {
      for (const [ file, error ] of Object.entries(errs)) {
        res += `${num}. ${file}\n--> ${error}\n`;
        num++;
      }
      return await box.edit(res, i.messageID);
    }
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
