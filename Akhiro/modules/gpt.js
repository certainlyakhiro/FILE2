const axios = require("axios");

module.exports = {
  metadata: {
    name: "gpt",
    role: 0,
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Talk with GPT",
    usage: "[ ask ]"
  },
  onRun: async ({ api, event, args }) => {
    const query = args.join(" ");
    if (!query) {
      api.sendMessage("ℹ️ | Please provide a query for GPT.", event.threadID, event.messageID);
      return;
    }
    api.sendMessage("⏳ | Generating response, Please wait....", event.threadID, event.messageID);
    try {
      const gpt = (await axios.get(`https://jonellccprojectapis.onrender.com/api/gpt?prompt=${query}`)).data.result.gptResult.gpt;
      api.sendMessage("👾 | 𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━\n" + gpt, event.threadID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred while generating response.", event.threadID);
    }
  }
};