const axios = require("axios");

module.exports = {
  metadata: {
    name: "akhiro",
    role: 0,
    hasPrefix: false,
    author: "AkhiroDEV",
    description: "Chat with AI",
    usage: "[ query ]",
  },
  onRun: async ({ api, event, args }) => {
    const query = args.join(" ");
    if (!query) {
      api.sendMessage(
        fonts.sans(
          "ℹ️ | Please provide a query.",
          event.threadID,
          event.messageID,
        ),
      );
      api.setMessageReaction("ℹ️", event.messageID, (err) => {}, true);
      return;
    }
    api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    try {
      const response = await axios.get(
        `https://lianeapi.onrender.com/@unregistered/api/🙋‍♂️|akhiroai?query=${encodeURIComponent(query)}`,
      );
      const content = response.data.message;

      api.sendMessage(content, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage(
        "⚠️ | An error occurred while processing your request.",
        event.threadID,
        event.messageID,
      );
    }
  },
};
