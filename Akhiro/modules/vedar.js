const axios = require('axios');

module.exports = {
  metadata: {
    name: "vedar",
    role: 0,
    author: "AkhiroDEV | LiANE",
    hasPrefix: false,
    description: "Chat with Vedar",
    usage: "[ query ]"
  },
  async onRun({ api, event, args }) {
    const query = args.join(" ");
    if (!query) {
      api.sendMessage("ℹ️ | Please provide a query for Vedar.", event.threadID, event.messageID);
      return;
    }
    api.sendMessage("⏳ | Generating response, Please wait....", event.threadID, event.messageID);
    api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    try {
      const response = await axios.get(`https://lianeapi.onrender.com/@LianeAPI_Reworks/api/vedar?apiKey=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`);
      api.sendMessage(response.data.message, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred while processing your request.", event.threadID, event.messageID);
    }
  }
};