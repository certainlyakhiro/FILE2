module.exports.metadata = {
  name: "catchpastebin",
  version: "0.0.1",
  hasPermssion: 0,
  credits: " LIANE remodell to mirai by blue",
  description: "Send pastebin links to admins",
  commandCategory: "ai",
  usePrefix: true,
  usages: "cmdname question",
  cooldowns: 0,
  dependencies: {},
};

module.exports.onEvent = async function ({ api, event, args, userInfos, box }) {
  const destinations = global.Akhiro.config.botAdmins; // change to your uid

  const { senderID, threadID, body } = event;
  const data = await userInfos.get(senderID);
  const name = data.name;
  const thread = await api.getThreadInfo(threadID);
  const threadName = thread.name;

  if (body.includes(`pastebin.com`)) {
    for (const destination of destinations) {
      await box.send(`⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
» From: ${name}
» UID: ${senderID}
» Thread: ${threadName}
» GCID: ${threadID}
🔖 Content:
${body}`, destination);
    }
  }
};
