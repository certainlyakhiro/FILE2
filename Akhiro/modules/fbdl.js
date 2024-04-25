const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  metadata: {
    name: "fbdl",
    author: "kshitiz",
    hasPrefix: false,
    description: "Downloads Facebook Video",
    usage: "{pn}fbget [audio/video link]",
  },
  onRun: async function ({ api, event, args }) {
    try {
      if (args[0] === "audio") {
        api.sendMessage(`Processing request!!`, event.threadID, (err, info) => {
          setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, 100);
        }, event.messageID);

        const path = __dirname + `/cache/2.mp3`;
        let audioData = (await axios.get(event.attachments[0].playableUrl, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path, Buffer.from(audioData, "binary"));

        return api.sendMessage(
          {
            body: `𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗗`,
            attachment: fs.createReadStream(path),
          },
          event.threadID,
          () => fs.unlinkSync(path),
          event.messageID
        );
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage(`Unable to process the request`, event.threadID, event.messageID);
    }

    try {
      if (args[0] === "video") {
        api.sendMessage(`Processing request!!!`, event.threadID, (err, info) => {
          setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, 100);
        }, event.messageID);

        const path1 = __dirname + `/cache/1.mp4`;
        let videoData = (await axios.get(event.attachments[0].playableUrl, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path1, Buffer.from(videoData, "binary"));

        return api.sendMessage(
          {
            body: `𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗗`,
            attachment: fs.createReadStream(path1),
          },
          event.threadID,
          () => fs.unlinkSync(path1),
          event.messageID
        );
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage(`Unable to process request`, event.threadID, event.messageID);
    }
  },
};