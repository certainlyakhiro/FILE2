module.exports.metadata = {
  name: "underfight",
  role: 0,
  hasPrefix: false,
  author: "Liane",
  description: "Simple Undertale-based rpg",
  usage: "no args",
  bypassHasPrefixRestriction: true
};

module.exports.style = {
  title: "⚔️ Underfight",
  titleFont: "bold",
  contentFont: "fancy",
};


const choices = `⚔️ 𝗙𝗶𝗴𝗵𝘁\n🔊 𝗔𝗰𝘁\n🔥 𝗠𝗮𝗴𝗶𝗰\n❌ 𝗠𝗲𝗿𝗰𝘆\n🛡️ 𝗗𝗲𝗳𝗲𝗻𝗱`;

module.exports.onRun = async function({ box, commandName, api, event, args, sendStyled }) {
  const info = await sendStyled(`* Coming soon!

𝗖𝗛𝗔𝗥𝗔 𝗟𝗩 1
𝗛𝗣 20/20
𝙏𝙋 [ 0% ]

${choices}

Don't reply with the choice.`);
  global.Akhiro.replies.set(info.messageID, {
    commandName
  });
}

module.exports.onReply = async function({ box, commandName, api, event, args, sendStyled }) {
  box.reply(`❌ Unavailable!!!!`);
}