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
📚 ❲ 𝗔𝗞𝗛𝗜𝗥𝗢 ❳ 𝗖𝗠𝗗𝘀 𝖫𝗂𝗌𝗍
𝖳𝗈𝗍𝖺𝗅 𝖢𝗈𝗆𝗆𝖺𝗇𝖽𝗌: ${command.length}`;

      for (let i = startIndex; i < endIndex; i++) {
        const command = commands[i];
        if (!command || !command.metadata) continue;
        const { name, description, hasPrefix = true } = command.metadata;
        helpMessage += `${name}\n`;
      }

      helpMessage += `
❲ 𝗣𝗮𝗴𝗲 ❳ ${page} | ${totalPages}
𝗜𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀: 𝖳𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝗈𝗍𝗁𝖾𝗋 𝗉𝖺𝗀𝖾, 𝗎𝗌𝖾 𝗛𝗲𝗹𝗽 [ 𝗉𝖺𝗀𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 ] 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝗇𝖾𝗑𝗍 𝗉𝖺𝗀𝖾, 𝗈𝗋 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝖾𝖾 𝗍𝗁𝖾 𝗂𝗇𝖿𝗈 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗎𝗌𝖾 𝗛𝗲𝗹𝗽 [ 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗇𝖺𝗆𝖾 ] 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗇𝖿𝗈.`;

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
          const { name, description, usage, hasPrefix, author } = targetCommand.metadata;
          const formattedUsage = usage ? usage.replace("[command]", `${botPrefix}${name}`) : "";
          const prefixText = hasPrefix ? "True" : "False";
          let helpMessage = `
📚 ❲ 𝗔𝗞𝗛𝗜𝗥𝗢 ❳ 𝗖𝗠𝗗𝘀 𝖫𝗂𝗌𝗍

𝗡𝗮𝗺𝗲: ${name}
𝗣𝗿𝗲𝗳𝗶𝘅: ${prefixText}
𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${description}
𝗨𝘀𝗮𝗴𝗲: ${formattedUsage}

𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗱 𝗯𝘆: ${author}`;
          box.reply(helpMessage);
        } else {
          box.reply(`Command "${arg}" not found.`);
        }
      }
    }
  },
};
