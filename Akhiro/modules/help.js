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
━━━━━━━━━━━━━━━━━━━
 ====ᑕOᗰᗰᗩᑎᗪՏ ᒪIՏTՏ====
━━━━━━━━━━━━━━━━━━━`;

      for (let i = startIndex; i < endIndex; i++) {
        const command = commands[i];
        if (!command || !command.metadata) continue;
        const { name, description, hasPrefix = true } = command.metadata;
        helpMessage += `${name}\n`;
      }

      helpMessage += `━━━━━━━━━━━━━━━━━━━
              ❲ 𝗣𝗮𝗴𝗲 ${page} 𝗼𝗳  ${totalPages} ❳
━━━━━━━━━━━━━━━━━━━
𝗡𝗔𝗠𝗘: ${global.Akhiro.config.botName}
𝗣𝗥𝗙𝗫: ${global.Akhiro.config.botPrefix}
━━━━━━━━━━━━━━━━━━━
              ❲ 👾𝗔𝗸𝗵𝗶𝗿𝗼𝗩2 ❳
━━━━━━━━━━━━━━━━━━━`;

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
━━━━━━━━━━━━━━━━━━━
 ====ᑕOᗰᗰᗩᑎᗪՏ ᒪIՏTՏ====
━━━━━━━━━━━━━━━━━━━
 𝗡𝗮𝗺𝗲: ${name}
 𝗣𝗿𝗲𝗳𝗶𝘅: ${prefixText}
 
 ${description}
 
 𝗨𝘀𝗮𝗴𝗲: ${formattedUsage}
 𝗔𝘂𝘁𝗵𝗼𝗿: @𝗔𝗸𝗵𝗶𝗿𝗼𝗧𝗘𝗔𝗠
━━━━━━━━━━━━━━━━━━━
              ❲ 👾𝗔𝗸𝗵𝗶𝗿𝗼𝗩2 ❳
━━━━━━━━━━━━━━━━━━━`;
          box.reply(helpMessage);
        } else {
          box.reply(`Command "${arg}" not found.`);
        }
      }
    }
  },
};
