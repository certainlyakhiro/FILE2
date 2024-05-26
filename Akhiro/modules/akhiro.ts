import axios from 'axios'; 

export const metadata = { 
  name: "akhiro",
  author: "AkhiroDEV",
  description: "An Owned Made AI From The Own API Of AkhiroBOT",
  usage: "akhiro [ question ]"
},

export async function onRun({ box, event, userInfos, args, fonts }) { 
  const { name } = userInfos.get(event.senderID); 
  const query = args.join(""); 

  if (!query){ 
    box.react(`ℹ️`); 
    return box.send(fonts.sans(`Hello there user ${name}, Please make a question.`)); 
  } 

  try { 
    box.react("⏳"); 
    const e = box.send(fonts.sans(`Processing your question ${fonts.bold(`${name}`)}, Please wait...`)); 
    const response = await axios.get(`https://akhiro-rest-api.onrender.com/api/akhiro?q=${query}`); 
    const answer = response.data.response;
    box.edit(fonts.sans(`This is just a test run, if there's an error. Please contact the admin immediately.`), e.messageID); 
    setTimeout(() => {
      box.edit(answer, e.messageID); 
    }, 3000); 
  } catch (error) { 
    console.log(error); 
    box.react(`🔴`); 
    box.send(fonts.sans(`Command Failed To Respond\n\n${fonts.bold(`SYSTEM FAILURE: `)} ${error.message}`)); 
  } 
}