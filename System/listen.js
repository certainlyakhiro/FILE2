module.exports = function({ api, event }) {
  const { logger } = require('./logger');
  const handleModule = require('./handle/handleModule');

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

  switch (event.type) {
    case "message":
      handleModule({ api, event, box });
      break;
  }
};