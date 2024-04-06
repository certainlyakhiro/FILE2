module.exports = {
  metadata: {
    name: "joinNoti",
    description: "Notificates when join",
    author: "Rui | AkhiroDEV | Liane",
    version: "1.0.0",
  },
  async onEvent({ box, event, api, userInfos }) {
    // added log message type checking
    if (
      event.logMessageType === "log:subscribe" &&
      event.logMessageData.addedParticipants?.some(
        (i) => i.userFbId == api.getCurrentUserID(),
      )
    ) {
      api.changeNickname(
        `𝗔𝗞𝗛𝗜𝗥𝗢𝘃𝟮 ${!global.Akhiro.config.botName ? "𝖠𝗄𝗁𝗂𝗋𝗈" : global.Akhiro.config.botName}`,
        event.threadID,
        api.getCurrentUserID(),
      );

      // Send a confirmation message after changing nickname
      await box.send("𝗔𝗞𝗛𝗜𝗥𝗢𝘃𝟮 𝖼𝗈𝗇𝗇𝖾𝖼𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒", event.threadID);

      // Notify bot admins about the new thread addition
      const { botAdmins } = global.Akhiro;
      const { threadID, author } = event;
      const threadInfo = await api.getThreadInfo(threadID);
      const authorInfo = await userInfos.get(event.author);
      const targets = [...botAdmins, threadID];
      for (const uid of targets) {
        await box.send(
          `✅ Akhiro bot has been added to a new thread.\nName: ${threadInfo.name}\nID: ${threadID}\nAdded by: ${authorInfo.name} (${author})`,
          uid,
        );
      }
    }
    //dito kapag hindi bot yung inad
    if (
      event.logMessageType === "log:subscribe" &&
      event.logMessageData.addedParticipants?.some(
        (i) => i.userFbId !== api.getCurrentUserID(),
      )
    ) {
      const { addedParticipants } = event.logMessageData;
      const { threadID, author } = event;
      const authorInfo = await userInfos.get(author);

      const threadInfo = await api.getThreadInfo(threadID);
      await box.send(
        `✨ Welcome ${addedParticipants.map((i) => i.fullName).join(", ")} to ${threadInfo.name} (${threadID})!

Added by: ${authorInfo.name} (${author})`,
        event.threadID,
      );
    }
  },
};
