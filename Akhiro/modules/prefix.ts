import { createReadStream } from "fs";
import { resolve } from "path";

export const metadata = {
  name: "prefix",
  author: "AkhiroDEV",
  description: "Shows AkhiroV2's system prefix",
  usage: "prefix"
};

export async function onRun({ api, box }) {
  try {
    const attachment = createReadStream(resolve(__dirname, "cache", "system", "prefix.gif"));

    const Prefix = global.Akhiro.config.botPrefix;
    const Name = global.Akhiro.config.botName;

    box.react("🐾");
    await api.sendMessage({
      body: `𝗡𝗔𝗠𝗘: ${Name} 
𝗣𝗥𝗙𝗫: ${Prefix}`,
      attachment
    });
  } catch (error) {
    console.log(error);
    box.send("ERROR: " + error.message);
  }
}