const axios = require("axios");

module.exports = {
  metadata: {
    name: "chat",
    role: 0,
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Chat with the bot",
    usage: "chat [ message ]",
  },
  async onRun({ api, event, args, fonts }) {
    const query = args.join(" ");
    try {
      const response = await axios.get(
        `https://official-akhirobot-sim-api.onrender.com/api/chat?message=${query}`,
      );
      const message =
        response.data.message || "Sorry, I couldn't find a response.";
      api.sendMessage(
        {
          body: message,
        },
        event.threadID,
        event.messageID,
      );
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage(
        {
          body: "Sorry, an error occurred while processing your request.",
        },
        event.threadID,
        event.messageID,
      );
    }
  },
};
