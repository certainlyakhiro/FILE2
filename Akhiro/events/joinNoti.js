module.exports = {
  metadata: {
    name: "joinNoti",
    description: "Notificates when join",
    author: "Rui | AkhiroDEV | Liane",
    version: "1.0.0"
  },
  async onEvent({ box, event, api }) {
    //added log message type checking huhu
    if (event.logMessageType === "log:subscribe" && event.logMessageData.addedParticipants?.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`𝗔𝗞𝗛𝗜𝗥𝗢𝗕𝗢𝗧 ${(!global.Akhiro.config.botName) ? "Akhiro": global.Akhiro.config.botName}`, event.threadID, api.getCurrentUserID());
		await new Promise(r => setTimeout(r, 1000)); 
    /*await box.edit(`Connecting ${(!global.Akhiro.config.botName) ? "AkhiroV2": global.Akhiro.config.botName}...`);*/
      //liliyan
      const { botAdmins } = glonal.Akhiro;
      const { author, threadID } = event;
      const threadInfo = await api.getThreadInfo(threadID);
      const authorInfo = await api.getUserInfo(author);
      const targets = [...botAdmins, threadID];
      for (const uid of targets) {
        await box.send(`✅ Akhiro bot has been added to a new thread.

Name: ${threadInfo.name}
ID: ${threadID}
Added by: ${authorInfo.name} (${author})`, uid);
      }
      return;
    }
  }
};
