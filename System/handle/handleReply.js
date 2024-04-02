//liliyan

module.exports = async function ({ ...entryObj }) {
  const { replies } = global.Akhiro;
  const { api, event, box } = entryObj;
  //check box.reply and box.send on listen.js, it's reworked
  try {
    const { messageReply: replier = {} } = event;
    if (replies.has(replier.messageID)) {
      const { commandName, ...repObj } = replies.get(replier.messageID);
      const { onReply = () => {} } = global.Akhiro.modules[commandName] || {};
      await onReply({ ...entryObj, Reply: repObj });
      // onReply? Lol goatbot will sue us
      // you need to use global.Akhiro.replies.set(key, value);
      /*

const info = await box.reply("Test");
  global.Akhiro.replies.set(info.messageID, {
    commandName: "test",
    author: event.senderID
  })

  then sa onReply:
  const { author } = Reply;
  if (event.senderID !== author) return;

  damn a perfect goatbot reply system copy 😮
      */
    }
  } catch (err) {
    console.log(err);
  }
};
