 module.exports = {
   metadata: {
     name: ["reboot", "restart"],
     role: 2,
     author: "AkhiroDEV",
     hasPrefix: false,
     description: "Reboot the bot system",
     usage: "Reboot the bot system"
   },
   onRun: async ({ api, event, args }) => {
    await api.sendMessage("Restarting AkhiroV2 System...", event.threadID, event.messageID);

		process.exit(2);
  },
};
