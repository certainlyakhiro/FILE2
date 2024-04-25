const axios = require("axios");

module.exports = {
  metadata: {
    name: "recipe",
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Search a recipe",
    usage: "recipe [ name ]",
  },
  async onRun({ api, event, args }) {
    const query = args.join(" ");
    if (!query) {
      api.sendMessage(
        "ℹ️ | Please provide a recipe name.",
        event.threadID,
        event.messageID,
      );
      return;
    }
    api.sendMessage(
      "⏳ | Generating response, Please wait....",
      event.threadID,
      event.messageID,
    );
    api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    try {
      const response = await axios.get(
        `https://lianeapi.onrender.com/ask/recipe?query=${encodeURIComponent(query)}`,
      );
      api.sendMessage(response.data.message, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage(
        "❌ | An error occurred while processing your request.",
        event.threadID,
        event.messageID,
      );
    }
  },
};