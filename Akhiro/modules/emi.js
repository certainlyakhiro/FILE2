const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  metadata: {
    name: "emi",
    hasPrefix: false,
    author: "Vex | AkhiroDEV",
    description: "Image Generator",
   usage: "emi [prompt]"
  },
  onRun: async function ({ box, args, api, event }) {
     api.setMessageReaction("🕐", event.messageID, (err) => {}, true);
    try {
      const prompt = args.join(" ");
      const emiApiUrl = "https://deku-rest-api.replit.app/emi";

      const emiResponse = await axios.get(emiApiUrl, {
        params: {
          prompt: prompt
        },
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(emiResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);
      box.reply({
        body: "",
        attachment: stream
      });
    } catch (error) {
      console.error("Error:", error);
      box.reply("❌ | An error occurred. Please try again later.");
    }
  }
};