const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  metadata: {
    name: "random",
    role: 0,
    author: "AkhiroDEV",
    hasPrefix: false,
    description: "Randomized video in category",
    usage: "rand [category]"
  },
  onRun: async ({ box, args, event }) => {
    const categories = ["codm", "anime"];
    const category = args[0] ? args[0].toLowerCase() : null;
    if (!categories.includes(category)) {
      return box.reply(
        `Invalid category. Available categories:  ${categories.join(", ")}`,
      );
    }
    try {
      const response = await axios.get(`https://a-k-h-i-r-o-randomvideo-api.onrender.com/randomVideo?key=AkhiroAPI&category=${encodeURIComponent(category)}`);

      if (response.data.code === 200) {
        const videoData = response.data.data;
        const videoURL = videoData.url;
        const title = videoData.title;
        const videoFilename = `${event.senderID}.mp4`;

        // Download the video
        const videoBuffer = await axios.get(videoURL, { responseType: 'arraybuffer' });
        const videoPath = path.join(__dirname, 'videos', videoFilename);
        fs.writeFileSync(videoPath, Buffer.from(videoBuffer.data, 'binary'));

        // Create a read stream for the video file
        const fileStream = fs.createReadStream(videoPath);

        // Send the video as an attachment
        /*await box.sendAttachment(fileStream, `${title}`);
        punyeta ano to
        */ 
        await box.reply({
          attachment: fileStream,
          body: title
        });

        // Delete the downloaded video file after a delay
        fs.unlinkSync(videoPath);

        // Set reaction on the message
        box.react("✅");
      } else {
        // Handle API error
        box.reply(`❌ | API Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      box.reply(`❌ | An error occurred: ${error.message}`);
    }
  }
}