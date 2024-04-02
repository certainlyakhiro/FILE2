module.exports = {
  metadata: {
    name: ["reload", "load"],
    role: 2,
    author: "Liane",
    hasPrefix: false,
    description: "Reload modules",
    usage: "Reload",
  },
  onRun: async ({ api, event, args }) => {
    const { loadAll } = global.Akhiro.utils;
    try {
      await loadAll();
    } catch (err) {
      return api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
    await api.sendMessage(
      "✅ Loaded all modules!",
      event.threadID,
      event.messageID,
    );
  },
};
