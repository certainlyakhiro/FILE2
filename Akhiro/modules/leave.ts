export const metadata = {
  name: "out",
  author: "AkhiroDEV",
  botadmin: false,
  hasPrefix: true,
  description: "Removes himself from the group",
  usage: "out"
};

export async function onRun({ box, event, fonts, api, userInfos }) {
  const { name } = await userInfos.get(event.senderID);

  try {
    await box.waitForReact(
      fonts.sans(`Hello there master ${name}, do you want to proceed with this command?\n\nReact to this message to continue`, 
      fonts.sans("[ OK ] • Good bye.."))
    );

    await api.removeUserFromTheGroup(event.threadId, event.senderID);
  } catch (error) {
    console.error("An error occurred while processing the command:", error);
  }
}