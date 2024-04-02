const axios = require("axios");

module.exports = {
  metadata: {
    name: "quotes",
    role: 0,
    author: "AkhiroDEV",
    description: "Get a random quote by category",
    usage: "quotes [ category ]"
  },
  onRun: async function({ api, event, args }) {
    const categories = ["motivation", "life", "wisdom", "innovation"];
    const category = args[0] ? args[0].toLowerCase() : null; // Fixed: Added a null check
    if (!categories.includes(category)) {
      return api.sendMessage("Invalid category. Available categories: " + categories.join(", "), event.threadID, event.messageID); // Fixed: Corrected the syntax for returning the error message
    }
    try {
      const response = await axios.get(`https://a-k-h-i-r-o-quotes-api.onrender.com/randomQuote?key=AkhiroAPI&category=${category}`);
      const { quote, author, category: quoteCategory } = response.data.data; // Fixed: Destructuring the response data
      const message = ` 　　♡             ∩　 ∩
　　　 (๑＾◡＾๑) ♡
┏━♪━･━･━〇━･〇･━･+☆+━┓
               𝗤𝗨𝗢𝗧𝗘𝗦

  ${quote}
           
             - ${author}

┗━+☆+･━･━･━ + ･━･━･♬━┛ `; // Fixed: Constructed the message with quote, author, and category
      api.sendMessage(message, event.threadID); // Fixed: Sent the constructed message as a response
    } catch (error) {
      console.error("Error fetching quote:", error);
      api.sendMessage("An error occurred while fetching the quote.", event.threadID); // Fixed: Sent an error message if fetching quote fails
    }
  }
};