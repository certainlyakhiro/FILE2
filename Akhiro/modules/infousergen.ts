const generateRandomInfo = () => {
  const name = generateRandomNames();
  const status = randomStatus();
  return {
    name: name,
    status: status,
  };
};

const randomStatus = () => {
  const statuses = ["single", "taken", "complicated", "married"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  return `${status}`;
};

const generateRandomNames = () => {
  const firstNames = [
    "Akhiro", "Radson", "James", "Kevin", "Henry", "Claire", 
    "Sophia", "Liam", "Emma", "Noah", "Olivia", "William",
    "Ava", "Elijah", "Isabella", "Lucas", "Mia", "Mason",
    "Amelia", "Logan", "Charlotte", "Ethan", "Harper", "Alexander"
  ];

  const lastNames = [
    "Felicity", "Hudson", "Flores", "Arkerman", "Oxford", "Austria",
    "Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia",
    "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez",
    "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore"
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
};

export const metadata = {
  name: "infogen",
  author: "AkhiroDEV",
  hasPrefix: "false",
  description: "Generates random info.",
  usage: "{p}infogen",
};

export async function onRun({ box, api, userInfos, fonts }) {
  const { name } = await userInfos.get(event.senderID);
  const e = await box.reply(fonts.sans(`Generating fake user information for ${name}, Please wait..`));

  const info = generateRandomInfo();
  const userInfo = `
${fonts.bold("Random User Info")}
${fonts.bold("Name: ")} ${fonts.sans(`${info.name}`)}
${fonts.bold("Status: ")} ${fonts.sans(`${info.status}`)}`;

  box.edit(`${userInfo}`, e.messageID);
}