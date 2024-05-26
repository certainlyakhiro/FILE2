export const metadata = {
  name: "unsend",
  author: "AkhiroDEV",
  hasPrefix: false,
  description: "Unsending his own message's",
  usage: "unsend [ reply to the bot message ]"
};

export async function onRun({ box, api, event, fonts }) {
  try {
    if (event.type !== "message_reply") {
      box.react("ℹ️");
      return box.send(fonts.sans(`ℹ️ | Please reply to the message to unsend.`));
    }
    if (event.messageReply.senderID !== api.getCurrentUserID()) {
      return box.send(fonts.sans(`Can't unsend other user's message`));
    }
    api.unsendMessage(event.messageReply.messageID);
  } catch (error) {
    console.log(error);
    box.send(`ERROR: ${error.stack}`);
  }
}