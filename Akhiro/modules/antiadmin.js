export default {
  metadata: {
    name: "antiadmin",
    role: 1,
    author: "AkhiroDEV | kshitz",
    hasPrefix: false,
    botAdmin: true,
    description: "Moye moye",
    usage: "antiadmin"
  },
  async onRun({ box: /*pede*/ message , event, threadConfig, args }) {
    if (args[0] === "off") {
      threadConfig.setInfo(event.threadID, {
        antiAdmin: "off"
      });
      return message.reply(`Disabled.`);
    } else if (args[0] === "on") {
      threadConfig.setInfo(event.threadID, {
        antiAdmin: "on"
      });
      return message.reply(`Enabled.`);
    } else {
      const { antiAdmin = 'off' } = await threadConfig.getInfo(event.threadID);
      return message.reply(`Status: ${antiAdmin}
Usage: {pn} off to turn off`);
    }
  },

  async onEvent({ api, event, threadConfig }) {
    const { antiAdmin = 'off' } = await threadConfig.getInfo(event.threadID);
    if (antiAdmin !== 'on' || !event.logMessageData || event.logMessageData.ADMIN_EVENT !== "remove_admin") {
      return;
    }

    const d = event.threadID;
    const f = event.logMessageData.TARGET_ID;
    const g = event.author;

    try {
      if (g !== api.getCurrentUserID() && f !== api.getCurrentUserID()) {
        await api.changeAdminStatus(d, f, true);
        await api.changeAdminStatus(d, g, false);
      }
    } catch (h) {
      console.error("Error", h);
    }
  }
};
