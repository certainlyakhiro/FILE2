const fs = require('fs-extra');
const path = require('path');

module.exports = {
  metadata: {
    name: "ban",
    description: "Ban a user from the bot.",
    usage: "ban",
    author: "Rui",
    botAdmin: true,
    hasPrefix: false,
  },

  async onRun({
    event, box, userInfos, fonts
  }) {
    if (!event.messageReply) {
      return box.reply(fonts.sans('❌ | Reply to the user who you want to ban!'));
    } else {
      const bannedUserId = event.messageReply.senderID;
      const banListPath = path.join(__dirname, 'cache', 'system', 'utils', 'banList.json');

      try {
        const banList = await fs.readJSON(banListPath);

        if (banList.bannedUsers.includes(bannedUserId)) {
          return box.reply(fonts.sans('❌ | User is already banned!'));
        }

        banList.bannedUsers.push(bannedUserId);

        await fs.writeJSON(banListPath, banList);

        const info = await userInfos.get(bannedUserId);
        return box.reply(fonts.sans(`🟢 | AkhiroBOT user ${info.name} was successfully banned from the system, This user won't be able to use the bot anymore.`));
      } catch (error) {
        console.error(error);
        return box.reply(fonts.sans('❌ | Error banning user. ' + error));
      }
    }
  }
};