const axios = require("axios");

module.exports = {
  metadata: {
    name: "ask",
    role: 0,
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Ask anything to AI",
    usage: "[ ask ]"
  },
  onRun: async ({ api, event, args }) => {
    try {
      const prompt = args.join(" ");
      if (!prompt) {
        await api.sendMessage("Hey I'm your virtual assistant, ask me a question.", event.threadID);
        return;
      }

      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

      await api.sendMessage(answer, event.threadID);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};