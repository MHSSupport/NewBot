const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "meme",
    aliases: ["mem"],
    category: "3.1. 🎲 | Entertainment",
    description: "Get a dank meme",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let m = await msg.channel.send(`${client.Emojis.loading} Generating..`);
        fetch("https://apis.duncte123.me/meme").then(res => res.json()).then(body => {
            if(!body || !body.data.image) return client.Errors.unknownErr(msg);
            let embed = new RichEmbed()
                .setColor("RANDOM")
                if(body.data.title) embed.setTitle(body.data.title).setURL(body.data.url)
                .setImage(body.data.image)
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
                .setTimestamp();
            m.edit(embed);
        });
    }
};