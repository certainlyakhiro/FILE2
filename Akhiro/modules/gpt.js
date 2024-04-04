const axios = require("axios");

module.exports = {
  metadata: {
    name: "gpt",
    role: 0,
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Talk with GPT",
    usage: "[ ask ]",
  },
  async onRun({ api, event, args, commandName, box }) {
    const query = args.join(" ");
    if (!query) {
      box.reply(
        "ℹ️ | Please provide a query for GPT."
      );
      return;
    }
    box.reply(
      "⏳ | Generating response, Please wait...."
    );
    try {
      const gpt = (
        await axios.get(
          `https://jonellccprojectapis.onrender.com/api/gpt?prompt=${query}`
        )
      ).data.result.gptResult.gpt;
      const info = await box.reply(
        "👾 | 𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━\n" + gpt
      );

      global.Akhiro.replies.set(info.messageID, commandName); // Fixed syntax: added comma after info.messageID
    } catch (error) {
      console.error("Error:", error);
      box.reply(
        "❌ | An error occurred while generating response."
      );
    }
  },
};

module.exports.onReply = module.exports.onRun;