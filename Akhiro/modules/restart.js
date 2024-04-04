module.exports = {
  metadata: {
    name: ["reboot", "restart"],
    role: 2,
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Reboot the bot system",
    usage: "Reboot the bot system",
  },
  async onRun({ api, event, args, box }) {
    await box.reply(
      "Restarting AkhiroV2 System...");

    process.exit(2);
  },
};
