module.exports = {
  metadata: {
    name: "catchpastebin",
    version: "0.0.1",
    credits: "LIANE remodeled to mirai by blue",
    description: "Send pastebin links to admins"
  },

  onEvent: async function ({ api, event, userInfos, box }) {
    const destinations = global.Akhiro?.config?.botAdmins || []; // Ensure global variable exists

    const { senderID, threadID, body } = event;
    const data = await userInfos.get(senderID).catch(err => console.error("Error fetching user info:", err)); // Error handling
    if (!data) return; // Exit if user info not available
    const name = data.name;

    const thread = await api.getThreadInfo(threadID).catch(err => console.error("Error fetching thread info:", err)); // Error handling
    if (!thread) return; // Exit if thread info not available
    const threadName = thread.name;

    // Regular expression to check for valid pastebin links
    const pastebinRegex = /(?:https?:\/\/)?(?:www\.)?pastebin\.com\/\w+/;
    if (pastebinRegex.test(body)) {
      for (const destination of destinations) {
        await box.send(`⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
» From: ${name}
» UID: ${senderID}
» Thread: ${threadName}
» GCID: ${threadID}
🔖 Content:
${body}`, destination).catch(err => console.error("Error sending message:", err)); // Error handling
      }
    }
  }
};