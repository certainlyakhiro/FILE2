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
              `Unable to re-add member ${name} to the group!`,
              event.threadID,
            );
          } else {
            api.sendMessage(
              `Active antiout mode, ${name} has been re-added to the group successfully!`,
              event.threadID,
            );
          }
        },
      );
    }
  },
};
