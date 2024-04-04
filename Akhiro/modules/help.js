function aliases(command) {
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
}

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

    if (!Array.isArray(args) || args.length === 0) {
      let helpMessage = `
♡   ∩_∩
 （„• ֊ •„)♡
╭─∪∪───────────⟡
 |   𝗔𝗞𝗛𝗜𝗥𝗢 𝗖𝗠𝗗𝗦
├──────────────⟡
`;
      for (const command of commands) {
        if (!command || !command.metadata) continue;
        const { name, description, hasPrefix = true } = command.metadata;
        helpMessage += `│ • ${name}: ${description}\n`;
      }
      helpMessage += `├──────────────⟡
│ [ 👑 | 𝗔𝗸𝗵𝗶𝗿𝗼 𝗩2 ]
╰──────────────⟡`;
      box.reply(helpMessage);
    } else {
      const commandName = args[0].toLowerCase();
      const targetCommand = aliases(commandName);
      if (targetCommand) {
        const { name, description, usage, hasPrefix } = targetCommand.metadata;
        const formattedUsage = usage
          ? usage.replace("[command]", `${botPrefix}${name}`)
          : "";
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
        box.reply(`Command "${commandName}" not found.`);
      }
    }
  },
};
