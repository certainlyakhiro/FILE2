const axios = require("axios");

module.exports = {
  metadata: {
    name: "snow",
    author: "hazey_API",
    description: "Talk to snowflakeAI",
    hasPrefix: false,
    usage: "snow [ query ]"
  },
  async onRun({ box, args }) {
    const query = args.join(" ");
    if (!query) {
      box.react("ℹ️");
      return box.send(`ℹ️ | Please provide a message`);
    }
    try {
      const e = box.send(`Please wait..`);
      const response = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(query)}`);
      const answer = response.data.output;
      box.edit(`${answer}` e.messageID);
    } catch (error) {
      console.log(error);
      box.react("🔴");
      box.send(`ERROR: ${error.message}`);
    }
  }
}