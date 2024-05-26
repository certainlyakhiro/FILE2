module.exports = {
  metadata: {
    name: "antiout",
    version: "1.0.0",
  },
  async onEvent({ event, api, userInfos }) {
    if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID())
      return;
    if (event.logMessageData?.leftParticipantFbId && !event.logMessageBody?.includes("removed")) {
      const { name } = await userInfos.get(event.logMessageData?.leftParticipantFbId);
      api.addUserToGroup(
        event.logMessageData?.leftParticipantFbId,
        event.threadID,
        (error) => {
          if (error) {
            api.sendMessage(
              `❲ 𝗔𝗞𝗛𝗜𝗥𝗢 ❳ 𝗔𝗻𝘁𝗶𝗼𝘂𝘁 𝖽𝖾𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽 𝖽𝗎𝖾 𝗍𝗈 𝗍𝗁𝖾 𝗈𝗇𝖾 𝗎𝗌𝖾𝗋 𝗇𝖺𝗆𝖾𝖽 ${name} 𝗐𝖺𝗌 𝖻𝖾𝖾𝗇 𝗎𝗇𝖺𝖻𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝖺𝖽𝖽 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.`,
              event.threadID,
            );
          } else {
            api.sendMessage(
              `❲ 𝗔𝗞𝗛𝗜𝗥𝗢 ❳ 𝗔𝗻𝘁𝗶𝗼𝘂𝘁 𝗆𝗈𝖽𝖾 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽, 𝖧𝖾𝗅𝗅𝗈 𝗍𝗁𝖾𝗋𝖾 𝗎𝗌𝖾𝗋 ${name} 𝗒𝗈𝗎 𝖺𝗋𝖾 𝖻𝖾𝗂𝗇𝗀 𝗋𝖾𝖺𝖽𝖽𝖾𝖽 𝖻𝗒 𝗆𝖾, 𝖾𝗂𝗍𝗁𝖾𝗋 𝗒𝗈𝗎 𝗅𝗂𝗄𝖾 𝗁𝖾𝗋𝖾 𝗈𝗋 𝗇𝗈𝗍, 𝖺𝗌 𝗅𝗈𝗇𝗀 𝖺𝗌 𝗂𝗆 𝗁𝖾𝗋𝖾 𝗒𝗈𝗎 𝖼𝖺𝗇𝗇𝗈𝗍 𝗅𝖾𝖺𝗏𝖾 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.`,
              event.threadID,
            );
          }
        },
      );
    }
  },
};
