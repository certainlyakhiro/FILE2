import axios from "axios";

export const metadata = {
  name: "blackbox",
  author: "AkhiroDEV | Rui",
  hasPrefix: false,
  description: "Talk to blackboxAI",
  usage: "{p}blackbox [ query ]"
};

export async function onRun({ box, args, userInfos, event, fonts }) {
  const { name } = await userInfos.get(event.senderID);
  const query = args.join(" ");
  if (!query) {
    await box.send(fonts.sans("ℹ️ | Please provide a query."));
    await box.react("ℹ️");
    return;
  }
  try {
    const e = await box.reply(`𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾..

𝗨𝘀𝗲𝗿: ${name}
𝗤𝘂𝗲𝗿𝘆: ${query}`);

    const response = await axios.get(`https://joshweb.click/blackbox?prompt=${encodeURIComponent(query)}`);
    const answer = response.data.data;

    await box.edit(answer, e.messageID);
  } catch (error) {
    console.log(error);
    await box.react("🔴");
    await box.reply(`ERROR: ${error.message}`);
  }
}