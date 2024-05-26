module.exports = {
  metadata: {
    name: "leaveNoti",
    description: "Notifies when users leave",
    author: "AkhiroDEV",
    version: "1.0.0",
  },
  async onEvent({ box, event, api, userInfos }) {
    if (
      event.logMessageType === "log:unsubscribe" &&
      event.logMessageData.leftParticipantFbId
    ) {
      const leftUserId = event.logMessageData.leftParticipantFbId;
      const leftUserInfo = await userInfos.get(leftUserId);
      const threadInfo = await api.getThreadInfo(event.threadID);

      if (event.logMessageData.leftParticipantFbId === event.logMessageData.kickedParticipantFbId) {
        await box.send(
          `👢 𝖠 𝗈𝗇𝖾 𝗎𝗌𝖾𝗋 𝗇𝖺𝗆𝖾𝖽 ${leftUserInfo.name} 𝗐𝖺𝗌 𝖻𝖾𝖾𝗇 𝗄𝗂𝖼𝗄𝖾𝖽 𝖻𝗒 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗈𝖿 ${threadInfo.name} 𝖽𝗎𝖾 𝗍𝗈 𝖾𝗑𝖼𝖾𝗌𝗌𝗂𝗏𝖾 𝖻𝖾𝗁𝖺𝗏𝗂𝗈𝗋 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝖻𝗒 𝗁𝗂𝗆/𝗁𝖾𝗋. 
          
𝙉𝘼𝙈𝙀: ${leftUserInfo.name}
𝙏𝙄𝘿: ${event.threadID}`,
          event.threadID
        );
      } else {
        await box.send(
          `🙋 𝖠𝗇𝗈𝗍𝗁𝖾𝗋 𝗎𝗌𝖾𝗋 𝗇𝖺𝗆𝖾𝖽 ${leftUserInfo.name} 𝗁𝖺𝗌 𝗅𝖾𝖿𝗍 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗈𝖿 ${threadInfo.name}, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗆𝖾𝖻𝖺𝖼𝗄 𝗐𝗂𝗍𝗁 𝗎𝗌 𝗌𝗈𝗈𝗇. 
          
𝙉𝘼𝙈𝙀: ${leftUserInfo.name}
𝙏𝙄𝘿: ${event.threadID}`,
          event.threadID
        );
      }
    }
  },
};