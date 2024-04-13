  export const metadata = {
    name: "info",
    description: "Important Fbbot related infos.",
    usage: "",
    author: "Liane",
    hasPrefix: false,
  };

  export async function onRun({ event, box, userInfos, fonts, args }) {
    let ID = event.senderID;
    if (Object.keys(event.mentions).length > 0) {
      ID = Object.keys(event.mentions)[0];
    }
    if (event.messageReply) {
      ID = event.messageReply.senderID;
    }
    if (args[0] === "raw") {
      return box.reply(`${ID}`);
    }
    if (args[0] === "tid") {
      return box.reply(`${event.threadID}`);
    }
    const info = await userInfos.get(ID);
    await box.reply(`📛 ${fonts.bold(`${info.name}`)}${info.vanity ? `\n📝 ${fonts.sans(`${info.vanity}`)}` : ""}${info.alternateName ? `\n✨ ${fonts.sans(`${info.alternateName}`)}` : ""}
${fonts.sans(`${info.gender === 1 ? "👧 Female" : "👦 Male"}`)}

𝙄𝘿: ${ID}
𝙏𝙄𝘿: ${event.threadID}`);
}