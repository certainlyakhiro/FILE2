import axios from "axios";

export const metadata = {
  name: "chat",
  author: "AkhiroDEV",
  hasPrefix: false,
  description: "Chat with AKHIRO",
  usage: "chat [ message ]"
};
export async function onRun({ box, args }) {
  const message = args.join(" ");
  if (!message) {
    await box.send("Please provide a message.");
    return;
  }
  try {
    const response = await axios.get(`https://akhirosimv2.onrender.com/api/sim?content=${encodeURIComponent(message)}`);
    const reply = response.data.message;
    await box.send(reply)
  } catch (error) {
    await box.send(`An error occurred: ${error.message}`)
  }
}