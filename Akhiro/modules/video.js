const axios = require("axios");
const fs = require('fs-extra');
const path = require('path');
const ytdl = require("ytdl-core");
const yts = require("yt-search");

async function video(api, event, args, box) {
    api.setMessageReaction("🕢", event.messageID, (err) => {}, true);
    try {
        let title = '';

        const extractShortUrl = async () => {
            const attachment = event.messageReply.attachments[0];
            if (attachment.type === "video" || attachment.type === "audio") {
                return attachment.url;
            } else {
                throw new Error("Invalid attachment type.");
            }
        };

        if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
            const shortUrl = await extractShortUrl();
            const musicRecognitionResponse = await axios.get(`https://audio-recon.onrender.com/kshitiz?url=${encodeURIComponent(shortUrl)}`);
            title = musicRecognitionResponse.data.title;
        } else if (args.length === 0) {
            box.reply("Please provide a video name.");
            return;
        } else {
            title = args.join(" ");
        }

        const searchResults = await yts(title);
        if (!searchResults.videos.length) {
            box.reply("No video found for the given query.");
            return;
        }

        const videoUrl = searchResults.videos[0].url;
        const stream = ytdl(videoUrl, { filter: "audioandvideo" });

        const fileName = `puti.mp4`;
        const filePath = path.join(__dirname, "cache", fileName);
        const writer = fs.createWriteStream(filePath);

        stream.pipe(writer);

        writer.on('finish', async () => {
            const videoStream = fs.createReadStream(filePath);
            await box.reply({ body: `📹 Playing: ${title}`, attachment: videoStream });
            api.setMessageReaction("✅", event.messageID, () => {}, true);
        });

        writer.on('error', (error) => {
            console.error("Error:", error);
            box.reply("An error occurred while writing the video file.");
        });
    } catch (error) {
        console.error("Error:", error);
        box.reply("An error occurred during processing.");
    }
}

module.exports = {
    metadata: {
        name: "video", 
        author: "Kshitiz | AkhiroDEV",
        hasPrefix: false,
        description: "A video searcher and also a recognizer",
        usage: "{pn}video [name] or reply to an audio"
    },
    onRun: function ({ api, event, args, box }) {
        return video(api, event, args, box);
    }
};