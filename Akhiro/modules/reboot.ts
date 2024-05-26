export const metadata = {
  name: "reboot",
  author: "AkhiroDEV",
  hasPrefix: false,
  botAdmin: true,
  description: "Reboot's the AkhiroV2 project botfile.",
  usage: "{p}reboot"
};

export async function onRun({ fonts, userInfos, box, event }) {
  try {
    const { name } = (await userInfos.get(event.senderID)) || { name: "Unknown" };
    const message = await box.send(fonts.sans(`Hello there master ${name}, Are you sure you wanted to restart the ${fonts.sans("AkhiroV2?")}\n\nPlease react to this message to proceed.`));
    await box.waitForReaction(message, "[ PROCEEDING ] Started restarting Project, AkhiroV2..");
    await box.edit(fonts.sans("[ OK ] • Starting To Restart AkhiroV2"), message.messageID);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await box.edit(fonts.sans(`Please contact the bot developers if you encounter some error(s) to the system.`), message.messageID);
    process.exit(0);
  } catch (error) {
    console.log(error);
    await box.send(fonts.sans(`Error Rebooting System.\n\nERROR: ${error.message}`));
  }
}