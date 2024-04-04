module.exports = {
  metadata: {
    name: "joinNoti",
    description: "Notificates when join",
    author: "Rui | AkhiroDEV",
    version: "1.0.0"
  },
  async onEvent({ box, event }) {
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`𝗔𝗞𝗛𝗜𝗥𝗢𝗕𝗢𝗧 ${(!global.Akhiro.config.botName) ? "Akhiro": global.Akhiro.config.botName}`, threadID, api.getCurrentUserID());
		return await new Promise(r => setTimeout(r, 1000)); await box.edit(`Connecting ${(!global.Akhiro.config.botName) ? "AkhiroV2": global.Akhiro.config.botName}...`);
    }
  }
};