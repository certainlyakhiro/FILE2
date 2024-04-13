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
          `👢 ${leftUserInfo.name} was kicked from ${threadInfo.name} (${event.threadID})`,
          event.threadID
        );
      } else {
        await box.send(
          `👋 ${leftUserInfo.name} has left ${threadInfo.name} (${event.threadID})`,
          event.threadID
        );
      }
    }
  },
};