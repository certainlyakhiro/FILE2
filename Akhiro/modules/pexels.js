const axios = require('axios');

module.exports = {
    metadata: {
        name: "pexels",
        hasPrefix: false,
        author: "+Hassan | AkhiroDEV",
        description: "Search for images on Pexels",
        usage: "pexels [prompt]"
    },

    onRun: async function ({ args, box: message, getLang }) {
        try {
            const query = args.join(' ');
            const numResults = parseInt(args[0]) || 8; // Default to 8 if no number is provided
            const apiKey = 'NoL8ytYlwsYIqmkLBboshW909HzoBoBnGZJbpmwAcahp5PF9TAnr9p7Z';
            const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${numResults}`;

            const headers = {
                'Authorization': apiKey
            };

            message.reply('⏳Please wait...');

            const { data } = await axios.get(url, { headers });

            const results = data.photos.map(photo => photo.src.original);

            // Assuming global.utils.getStreamFromURL works correctly
            const attachments = await Promise.all(results.map(url => global.utils.getStreamFromURL(url)));

            return message.reply({ body: `✅𝘛𝘏𝘌𝘙𝘌 𝘐𝘚 𝘛𝘏𝘌 𝘗𝘌𝘟𝘌𝘓𝘚 𝘙𝘌𝘚𝘜𝘓𝘛𝘚 𝘍𝘖𝘙 𝘗𝘙𝘖𝘝𝘐𝘋𝘌𝘋 𝑷𝑹𝑶𝑴𝑷𝑻"${query}" 𝑭𝒓𝒐𝒎 𝑷𝒆𝒙𝒆𝒍𝒔:`, attachment: attachments });
        } catch (error) {
            console.error(error);
            return message.reply("Sorry, I couldn't find any results.");
        }
    }
};