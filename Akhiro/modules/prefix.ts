import { createReadStream } from "fs";
import { resolve } from "path";

export const metadata = {
  name: "prefix",
  author: "AkhiroDEV",
  hasPrefix: false,
  description: "Shows AkhiroV2's system prefix",
  usage: "prefix"
};

export async function onRun({ api, box, event }) {
  try {
    const attachment = createReadStream(resolve(__dirname, "cache", "system", "prefix.gif"));

    const Prefix = global.Akhiro.config.botPrefix;
    const Name = global.Akhiro.config.botName;

    box.react("🐾");
    await api.sendMessage({
      body: `𝗡𝗔𝗠𝗘: ${Name} 
𝗣𝗥𝗙𝗫: ${Prefix}`,
      attachment
    }, event.threadID, event.messageID);
  } catch (error) {
    console.log(error);
    box.send("ERROR: " + error.message);
  }
};