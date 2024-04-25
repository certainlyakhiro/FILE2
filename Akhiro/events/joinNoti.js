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
      await box.send(`▄▀█ █▄▀ █░█ █ █▀█ █▀█
█▀█ █░█ █▀█ █ █▀▄ █▄█
━━━━━━━━━━━━━━━━━━
𝖧𝖾𝗅𝗅𝗈 𝗍𝗁𝖾𝗋𝖾 𝗔𝗸𝗵𝗶𝗿𝗼𝗕𝗢𝗧 𝗎𝗌𝖾𝗋𝗌, 𝖬𝖺𝗒 𝖨 𝗂𝗇𝗍𝗋𝗈𝖽𝗎𝖼𝖾 𝗆𝗒 𝗌𝖾𝗅𝖿 𝖿𝗂𝗋𝗌𝗍. 𝖨𝗆 ${(!global.Akhiro.config.botName) ? "𝖠𝗄𝗁𝗂𝗋𝗈" : global.Akhiro.config.botName}, 𝖢𝖺𝗆𝖾 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗌𝗒𝗌𝗍𝖾𝗆 𝗈𝖿 𝗔𝗸𝗵𝗶𝗿𝗼𝗕𝗢𝗧𝘃𝟮 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝖻𝗒 𝗙𝗿𝗮𝗻𝗰𝗶𝘀 𝗟𝗼𝘆𝗱 𝗥𝗮𝘃𝗮𝗹, 𝗥𝘂𝗶 𝗥𝗲𝗼𝗴𝗼 𝖺𝗇𝖽 𝗟𝗶𝗮𝗻𝗲 𝗖𝗮𝗴𝗮𝗿𝗮, 𝖬𝗒 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗌 [ ${global.Akhiro.config.botPrefix} ], 𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝗂𝗇𝗏𝗂𝗍𝗂𝗇𝗀 𝗆𝖾 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉. 𝖬𝗒 𝖽𝗎𝗍𝗒 𝗂𝗌 𝗍𝗈 𝖻𝗋𝗂𝗇𝗀 𝖿𝗎𝗇 𝖺𝗇𝖽 𝗁𝖺𝗉𝗉𝗂𝗇𝖾𝗌𝗌 𝗍𝗈 𝖾𝗏𝖾𝗋𝗒𝗈𝗇𝖾. 𝖨 𝗁𝗈𝗉𝖾 𝗒𝗈𝗎 𝖾𝗇𝗃𝗈𝗒 𝗎𝗌𝗂𝗇𝗀 𝗆𝖾 𝖺𝗌 𝗒𝗈𝗎𝗋 𝖠𝖨 𝖡𝗎𝖽𝖽𝗒`, event.threadID);

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