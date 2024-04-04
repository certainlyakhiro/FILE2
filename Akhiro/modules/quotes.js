const axios = require("axios");

module.exports = {
  metadata: {
    name: "quotes",
    role: 0,
    author: "AkhiroDEV",
    description: "Get a random quote by category",
    usage: "quotes [ category ]",
  },
  async onRun({ api, event, args, box }) {
    const categories = ["motivation", "life", "wisdom", "innovation", "love"];
    const category = args[0] ? args[0].toLowerCase() : null;
    if (!categories.includes(category)) {
      return box.reply(
        `Invalid category. Available categories:  ${categories.join(", ")}`,
      );
    }
    try {
      const response = await axios.get(
        `https://a-k-h-i-r-o-quotes-api.onrender.com/randomQuote?key=AkhiroAPI&category=${category}`,
      );
      const { quote, author, category: quoteCategory } = response.data.data;
      const message = ` 　　♡             ∩　 ∩
　　　 (๑＾◡＾๑) ♡
┏━♪━･━･━〇━･〇･━･+☆+━┓
               𝗤𝗨𝗢𝗧𝗘𝗦

  ${quote}
           
             - ${author}

┗━+☆+･━･━･━ + ･━･━･♬━┛ `; // Fixed: Constructed the message with quote, author, and category
      box.reply(message);
    } catch (error) {
      console.error("Error fetching quote:", error);
      box.reply(
        `An error occurred while fetching the quote: ${error.mesaage}
at ${error.stack}`,
      );
      //hay nako francis di kana natuto huhu 😭
    }
  },
};
