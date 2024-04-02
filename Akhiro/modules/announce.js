const axios = require("axios");
const { createReadStream } = require("fs");
const { resolve } = require("path");

module.exports = {
  metadata: {
    name: "announce",
    role: 1,
    author: "AkhiroDEV | LiANE | Rui",
    hasPrefix: false,
    description: "Announce a message to all groups",
    botAdmin: true,
    usage: "announce [ message ]",
  },
  onRun: async function ({ api, event, args }) {
    const threadList = await api.getThreadList(25, null, ["INBOX"]);
    let sentCount = 0;
    const custom = args.join(" ");

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    async function sendMessage(thread) {
      try {
        await api.sendMessage(
          {
            body: `✱:｡✧𝗔𝗡𝗡𝗢𝗨𝗡𝗖𝗘𝗠𝗘𝗡𝗧✧｡:✱
━━━━━━━━━━━━━━━━━━━
╭┈ ❒ 💬 | 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
╰┈➤ ${custom}
━━━━━━━━━━━━━━━━━━━
📅 | 𝗗𝗔𝗧𝗘: ${currentDate}
⏰ | 𝗧𝗜𝗠𝗘: ${currentTime}`,
          },
          thread.threadID,
        );
        sentCount++;
      } catch (error) {
        console.error("Error sending  message:", error);
      }
    }

    async function sendAttachment(thread) {
      try {
        const attachment = createReadStream(
          resolve(__dirname, "cache", "system", "announce.mp4"),
        );
        await api.sendMessage({ attachment }, thread.threadID);
      } catch (error) {
        console.error("Error sending attachment:", error);
      }
    }

    for (const thread of threadList) {
      if (sentCount >= 20) {
        break;
      }
      if (
        thread.isGroup &&
        thread.name !== thread.threadID &&
        thread.threadID !== event.threadID
      ) {
        await sendMessage(thread);
        await sendAttachment(thread);
      }
    }

    if (sentCount > 0) {
      api.sendMessage(`› Sent the notification successfully.`, event.threadID);
    } else {
      api.sendMessage(
        "› No eligible group threads found to send the message to.",
        event.threadID,
      );
    }
  },
};
