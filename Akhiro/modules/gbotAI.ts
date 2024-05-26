import axios from "axios";

export const metadata = {
  name: "gbotai",
  author: "AkhiroDEV",
  hasPrefix: false,
  description: "A Command Generator For GoatBot Users Through Prompt From The API Of LianeAPI",
  usage: "{p}gbotai [query]"
};

export async function onRun({ box, args, userInfos, event, fonts }) {
  const { name } = await userInfos.get(event.senderID);
  const query = args.join(" ");
  if (!query) {
    await box.react("ℹ️");
    return await box.send(`ℹ️ | Please generate a prompt to create a command for goatbot.`);
  }
  try {
    const e = await box.send(`Generating a code command for goatbot, Please wait...`);
    const response = await axios.get(`https://liaspark.chatbotcommunity.ltd/@CodingAI_Liane/api/goatbot?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}`);
    const answer = response.data.raw;
    await box.edit(`Want to create your own API? Visit on ${fonts.bold("LiaSpark")} for more information. The link is in below this message:

https://lianeapi.chatbotcommunity.ltd`, e.messageID);
    await new Promise(a => setTimeout(a, 3000));
    await box.edit(`👾 ${fonts.bold("GoatBOT AI")}

${answer}`, e.messageID);
  } catch (error) {
    console.log(error);
    await box.react("🔴");
    await box.send(`ERROR: ${error.message}`);
  }
}