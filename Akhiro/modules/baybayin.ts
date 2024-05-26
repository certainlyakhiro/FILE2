import axios from "axios";

export const metadata = {
  name: "baybayin",
  author: "AkhiroDEV",
  description: "Translate words into baybayin",
  usage: "baybayin [words]"
};

export async function onRun({ box, fonts, args, userInfos, event }) {
  const { name } = userInfos.get(event.senderID);
  const trans = args.join(" ");

  if (!trans) {
    box.react("ℹ️");
    return box.send(fonts.sans("Please provide a word to translate"));
  }

  try {
    const e = box.reply(fonts.sans(`Translating the word ${trans} into baybayin for ${name}, Please wait..`));
    const response = await axios.get(`https://deku-rest-api-3ijr.onrender.com/api/baybay?q=${trans}`);
    const reply = response.data.result;

    box.react("✅");
    box.edit(fonts.sans(`✅ Translation Complete!!
${fonts.bold("Original: ")} ${trans}
${fonts.bold("Translated: ")} ${reply}`, e.messageID));
  } catch (error) {
    console.log(error);
    box.react("🔴");
    box.send(fonts.sans(`ERROR: ${error.message}`));
  }
}