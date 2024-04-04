const path = require("path");

module.exports = {
  metadata: {
    name: "music",
    role: 0,
    author: "AkhiroDEV | Cliff",
    hasPrefix: false,
    description: "Music commands",
    usage: "music [ query ]"
  },
  async onRun({
    api,
    event,
    args,
    box
  }) {
    const fs = require("fs");
    const ytdl = require("ytdl-core");
    const yts = require("yt-search");
    const musicName = args.join(' ');
    if (!musicName) {
      box.reply(`To get started, type music and the title of the song you want.`);
      return;
    }
    try {
      box.reply(`🔎 | Searching for "${musicName}"...`);
      const searchResults = await yts(musicName);
      if (!searchResults.videos.length) {
        return box.reply("Can't find the search.");
      } else {
        const music = searchResults.videos[0];
        const musicUrl = music.url;
        const stream = ytdl(musicUrl, {
          filter: "audioonly"
        });
        const time = new Date();
        const timestamp = time.toISOString().replace(/[:.]/g, "-");
        const filePath = path.join(__dirname, 'cache', `${timestamp}_music.mp3`);
        stream.pipe(fs.createWriteStream(filePath));
        stream.on('response', () => {});
        stream.on('info', (info) => {});
        stream.on('end', () => {
          if (fs.statSync(filePath).size > 1000000000) { // 1GB in bytes
            fs.unlinkSync(filePath);
            return api.sendMessage('The file could not be sent because it is larger than 1GB.', event.threadID, event.messageID);
          }
          const message = {
            body: `${music.title}`,
            attachment: fs.createReadStream(filePath)
          };
          api.sendMessage(message, event.threadID, () => {
            fs.unlinkSync(filePath);
          }, event.messageID);
        });
      }
    } catch (error) {
      api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
  }
};