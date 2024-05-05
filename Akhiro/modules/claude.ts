import axios from "axios";

export const metadata = {
  name: "claude",
  author: "AkhiroDEV",
  hasPrefix: false,
  description: "Talk to Claude",
  usage: "{p}claude [query]"
},
  export async function onRun({ box, args }) {
    const query = args.join(" ");
    if (!query) {
      box.react("ℹ️");
      return box.send(`ℹ️ | Please provide a message`);
    }
    try {
      box.send(`Please wait..`);
      const response = await axios.get(`https://hashier-api-claude.vercel.app/api/claude?ask=${encodeURIComponent(query)}`);
      const answer = response.data.response;
      box.edit(`${answer}`);
    } catch (error) {
      console.log(error);
      box.react("🔴");
      box.send(`ERROR: ${error.message}`);
  }
}
