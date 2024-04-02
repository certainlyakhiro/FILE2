// rui waz here -_-
// i liek modular code

module.exports = function ({ api, event }) {
  const { logger } = require("./logger");
  const handleModule = require("./handle/handleModule");
  const handleEvent = require("./handle/handleEvent");

  const box = {
    react: (emoji) => {
      api.setMessageReaction(emoji, event.messageID, () => {}, true);
    },
    reply: (msg) => {
      api.sendMessage(msg, event.threadID, event.messageID);
    },
    add: (uid) => {
      api.addUserToGroup(uid, event.threadID);
    },
    kick: (uid) => {
      api.removeUserFromGroup(uid, event.threadID);
    },
    send: (msg) => {
      api.sendMessage(msg, event.threadID);
    },
  };
  const entryObj = {
    api,
    event,
    box,
  };

  switch (event.type) {
    case "message":
      handleModule({ ...entryObj });
      break;
    case "event":
      handleEvent({ ...entryObj });
      break;
  }
};
