const aliases = (command) => {
  if (!global.Akhiro || !global.Akhiro.modules) return null;

  for (const [moduleNames, module] of Object.entries(global.Akhiro.modules)) {
    const aliases = moduleNames.split(",");
    if (
      aliases.some(
        (alias) => alias.trim().toLowerCase() === command?.toLowerCase(),
      )
    ) {
      return module;
    }
  }
  return null;
};

module.exports = {
  metadata: {
    name: "help",
    description: "Show available commands and their descriptions",
    usage: "[command]",
    author: "Rui",
    role: 0,
    hasPrefix: false,
  },
  async onRun({ box, fonts, args }) {
    const commands = Object.values(global.Akhiro?.modules || {});
    const botPrefix = global.Akhiro?.botPrefix || "";

    const sendPage = (page) => {
      const pageSize = 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = Math.min(page * pageSize, commands.length);
      const totalPages = Math.ceil(commands.length / pageSize);

      let helpMessage = `
♡   ∩_∩
（„• ֊ •„)♡
╭─∪∪───────────⟡
 |   𝗔𝗞𝗛𝗜𝗥𝗢 𝗖𝗠𝗗𝗦
├──────────────⟡
`;

      for (let i = startIndex; i < endIndex; i++) {
        const command = commands[i];
        if (!command || !command.metadata) continue;
        const { name, description, hasPrefix = true } = command.metadata;
        helpMessage += `│ • ${name}: ${description}\n`;
      }

      helpMessage += `├──────────────⟡
│ Page: ${page} of ${totalPages}
│ [ 👑 | 𝗔𝗸𝗵𝗶𝗿𝗼 𝗩2 ]
╰──────────────⟡`;

      box.reply(helpMessage);
    };

    if (!Array.isArray(args) || args.length === 0) {
      sendPage(1);
    } else {
      const arg = args[0].toLowerCase();
      const pageNumber = parseInt(arg);
      if (!isNaN(pageNumber) && pageNumber > 0) {
        sendPage(pageNumber);
      } else {
        const targetCommand = aliases(arg);
        if (targetCommand) {
          const { name, description, usage, hasPrefix } = targetCommand.metadata;
          const formattedUsage = usage ? usage.replace("[command]", `${botPrefix}${name}`) : "";
          const prefixText = hasPrefix ? "True" : "False";
          let helpMessage = `
♡   ∩_∩
（„• ֊ •„)♡
╭─∪∪───────────⟡
│ 𝗡𝗮𝗺𝗲: ${name}
├──────────────⟡
│ ${description}
│ 𝗨𝘀𝗮𝗴𝗲: ${formattedUsage}
│ 𝗣𝗿𝗲𝗳𝗶𝘅: ${prefixText}
│ 𝗔𝘂𝘁𝗵𝗼𝗿: @𝗔𝗸𝗵𝗶𝗿𝗼𝗧𝗘𝗔𝗠
├──────────────⟡
│ [ 👑 | 𝗔𝗞𝗛𝗜𝗥𝗢 𝗩2]
╰──────────────⟡`;
          box.reply(helpMessage);
        } else {
          box.reply(`Command "${arg}" not found.`);
        }
      }
    }
  },
};
