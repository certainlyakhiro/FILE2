module.exports = {
  metadata: {
    name: "confess",
    version: "1.0.7",
    hasPermssion: 0,
    credits: "AkhiroDEV",
    description: "Confess with others anonymously",
    usages: "confessmsg [uid] [text]"
   },
  async onRun({ api, box, event, args }) {
    if (args.length < 2) return box.send("Please provide a valid format. For example: \n\n.confess [UID Of Your Crush] [Your Message Confess]", event.threadID, event.messageID);

    const idbox = args.shift(); // Get the first element as idbox
    const reason = args.join(" "); // Join the remaining elements as reason
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    box.send(`
    𖣘❀:｡✧𝗖𝗢𝗡𝗙𝗘𝗦𝗦✧｡:❀𖣘
━━━━━━━━━━━━━━━━━
𝖧𝖾𝗅𝗅𝗈 𝗍𝗁𝖾𝗋𝖾 𝗎𝗌𝖾𝗋, 𝖠 𝗈𝗇𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖿𝗈𝗋 𝗒𝗈𝗎 𝖻𝗒, 𝖠𝗇𝗈𝗇𝗒𝗆𝗈𝗎𝗌:

 ${reason}
━━━━━━━━━━━━━━━━━
ℹ️ | 𝖶𝖾 𝖽𝗈𝗇'𝗍 𝖾𝗑𝗉𝗈𝗌𝖾 𝗍𝗁𝖾 𝗂𝖽𝖾𝗇𝗍𝗂𝗍𝗒 𝗐𝗁𝗈 𝗌𝖾𝗇𝖽 𝗂𝗍 𝖺𝗌 𝖺 𝗉𝗋𝗂𝗏𝖺𝖼𝗒.`, idbox, () => {
      api.sendMessage(`Sent message: ${reason}`, event.threadID);
    });
  }
};