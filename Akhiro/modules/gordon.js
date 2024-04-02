const axios = require('axios');

module.exports = {
  metadata: {
    name: ["gordon", "ramsey"],
    role: 0,
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Chat with GordonGPT",
    usage: "gordon [ query ]"
  },
  async onRun({ api, event, args }) {
    const query = args.join(" ");
    if (!query) {
      api.sendMessage("ℹ️ | Please provide a query for GordonGPT.", event.threadID, event.messageID);
      return;
    }
    api.sendMessage("⏳ | Generating response, Please wait....", event.threadID, event.messageID);
    api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    try {
      const response = await axios.get(`https://lianeapi.onrender.com/@renn/api/GordonAI?query=${encodeURIComponent(query)}`);
      api.sendMessage(response.data.message, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred while processing your request.", event.threadID, event.messageID);
    }
  }
};