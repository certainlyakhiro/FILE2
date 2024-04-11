const axios = require("axios");

module.exports = {
  metadata: {
    name: "ask",
    role: 0,
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Ask anything to AI",
    usage: "[ ask ]",
  },
  async onRun({ api, event, args }) {
    try {
      const prompt = args.join(" ");
      if (!prompt) {
        await api.sendMessage("ℹ️ | Please provide a query.", event.threadID);
        api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        return;
      }
      api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
      api.sendMessage(
        "💭 | Thinking for response, please wait...",
        event.threadID,
      ); // Fixed typo: replaced ":" with ";"

      const response = await axios.get(
        `https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`,
      );
      const answer = response.data.answer;

      await api.sendMessage("🤖 | 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘\n\n" + answer, event.threadID); // Removed extra backticks around answer
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};
