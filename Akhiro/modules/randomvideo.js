const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  metadata: {
    name: "random",
    role: 0,
    author: "AkhiroDEV & Liane",
    hasPrefix: false,
    description: "Randomized video in category",
    usage: "rand [category]",
  },
  onRun: async ({ box, args, event, api }) => {
    const categories = ["codm", "anime", "gd", "undertale"];
    const category = args[0] ? args[0].toLowerCase() : null;
    if (!categories.includes(category)) {
      return box.reply(
        `Invalid category. Available categories:  ${categories.join(", ")}`,
      );
    }
    try {
      box.react("⏳");
      const response = await axios.get(
        `https://a-k-h-i-r-o-randomvideo-api.onrender.com/randomVideo?key=AkhiroAPI&category=${encodeURIComponent(category)}`,
      );

      if (/*response.data.code === 200  puta ano to*/ true) {
        const videoData = response.data.data;
        const videoURL = videoData.url;
        const title = videoData.title;
        const videoFilename = `${event.senderID}.mp4`;

        const ytdl = require("ytdl-core");
        const stream = ytdl(videoURL, {
          quality: "lowest"
        });
        const time = new Date();
        const timestamp = time.toISOString().replace(/[:.]/g, "-");
        const filePath = path.join(
          __dirname,
          "cache",
          `${timestamp}_vid.mp4`,
        );
        stream.pipe(fs.createWriteStream(filePath));
        stream.on("response", () => {});
        stream.on("info", (info) => {});
        stream.on("end", async () => {
          if (fs.statSync(filePath).size > 1000000000) {
            // 1GB in bytes
            fs.unlinkSync(filePath);
            return api.sendMessage(
              "The file could not be sent because it is larger than 1GB.",
              event.threadID,
              event.messageID,
            );
          }

          api.sendMessage({
            attachment: fs.createReadStream(filePath),
            body: title,
          }, event.threadID, () => {
            fs.unlinkSync(filePath);

          // Set reaction on the message
          box.react("✅");
            
          }, event.messageID);

          // Delete the downloaded video file after a delay
                  });
      } else {
        // Handle API error
        box.reply(`❌ | API Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      box.reply(`❌ | An error occurred: ${error.message}`);
    }
  },
};
