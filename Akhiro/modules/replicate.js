const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
   metadata: {
    name: "replicate",
    hasPrefix: false,
    author: "Vex-Kshitiz | AkhiroDEV",
    description: "Generate a image based on prompt",
    usage: "replicate [prompt]"
  },
  onRun: async function ({ box, args, api, event }) {
    api.setMessageReaction("✨", event.messageID, (err) => {}, true);
    try {
      const prompt = args.join(" ");
      const replicateApiUrl = `https://gen-img-two.vercel.app/replicate?prompt=${encodeURIComponent(prompt)}`;

      const response = await axios.get(replicateApiUrl);

      const imageUrl = response.data[0].url;

      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }

      const imagePath = path.join(cacheFolderPath, `image.png`);
      const imageStream = fs.createWriteStream(imagePath);

      const imageResponse = await axios.get(imageUrl, {
        responseType: "stream"
      });

      imageResponse.data.pipe(imageStream);

      imageStream.on("finish", () => {
        box.send({
          body: "",
          attachment: fs.createReadStream(imagePath)
        });
      });
    } catch (error) {
      console.error("Error:", error);
      box.send(`🔴 Error: ${error.message}`);
    }
  }
};