const axios = require('axios');

module.exports = {
  metadata: {
    name: "axis",
    role: 0,
    author: "AkhiroDEV | LiANE",
    description: "Chat with Axis",
    usage: "axis [ query ]",
    hasPrefix: false
  },
  async onRun({ api, event, args }) {
    const query = args.join(" ");
    if (!query) {
      api.sendMessage("ℹ️ | Please provide a query for Axis.", event.threadID, event.messageID);
      return;
    }
    api.sendMessage("⏳ | Generating response, Please wait....", event.threadID, event.messageID);
    api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    try {
      const response = await axios.get(`https://lianeapi.onrender.com/ask/axis?apiKey=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`);
      api.sendMessage(response.data.message, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred while processing your request.", event.threadID, event.messageID);
    }
  }
};