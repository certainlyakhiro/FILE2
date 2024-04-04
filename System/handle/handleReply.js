//liliyan
module.exports = async function ({ ...entryObj }) {
  const { replies } = global.Akhiro;
  const { api, event, box, aliases } = entryObj;
  const args = event.body?.split("");
  //check box.reply and box.send on listen.js, it's reworked
  try {
    const { messageReply: replier = {} } = event;
    if (replies.has(replier.messageID)) {
      const { commandName, ...repObj } = replies.get(replier.messageID);
      const { onReply = () => {} } = aliases(commandName) || {};
      await onReply({ ...entryObj, Reply: repObj, args });
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
      /*
      N T K H A N G is watching 
      */
    } //shish galing mo
  } catch (error) {
    entryObj.box.reply(`❌ | ${error.message}
${error.stack}
${error.name}
${error.code}
${error.path}`);
    console.log(error);
  }
};
