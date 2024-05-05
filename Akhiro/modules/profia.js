let url = "https://gpt4withcustommodel.onrender.com/";
const { get } = require('axios'), fs = require('fs');
let f = __dirname+'/cache/emi.png';

module.exports = {
  metadata: {
   name: "prodia",
   hasPrefix: false,
   author: "deku | AkhiroDEV",
	description: "Generate image in emi",
  	usages: "[prompt]",
  },
  onRun: async function({api, event, args}){
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    
    if (!args[0]) return r('Missing prompt!');
    
    const a = args.join(" ")
    if (!a) return r('Missing prompt!');
    try {
    const d = (await get(url+'prodia?prompt='+a, {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(f, Buffer.from(d, "utf8"));
    return r({attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message)
    }
  }
}