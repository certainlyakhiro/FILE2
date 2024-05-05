const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  metadata: {
    name: "applealert",
    author: "AkhiroDEV| Neth",
    hasPrefix: false,
    description: "Just a random meme iPhone alert message image generator",
    usage: "{p}applealert [query]"
  },
  async onRun({ box, api, event, args }) {
    try {
      const { threadID, messageID } = event;
      const query = args.join(" ");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const path = __dirname + '/cache/' + `${timestamp}_apple.png`;
      if (!query) {
        return api.sendMessage('ℹ️ | Please provide a message to generate', threadID, messageID);
      }
      box.send('⏳ | Generating photo, please wait');
      box.react('⏳');
      const response = await axios.get(`https://api.popcat.xyz/alert?text=${query}`, { responseType: 'arraybuffer' });
      fs.writeFileSync(path, response.data);
      box.react('📳');
      setTimeout(function() {
        box.send({
          body: "𝖸𝗈 𝖺 𝗇𝗈𝗍𝗂𝖿 𝗈𝗇 𝗒𝗈𝗎𝗋 𝗉𝗁𝗈𝗇𝖾",
          attachment: fs.createReadStream(path)
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      box.send("Error: " + error.message);
    }
  }
}