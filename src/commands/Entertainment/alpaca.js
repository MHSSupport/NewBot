const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "alpaca",
    aliases: [],
    category: "3.1. 🎲 | Entertainment",
    description: "Why not ya know? Alpacas are too cute",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let m = await msg.channel.send(`${client.Emojis.loading} Generating..`);
        fetch("https://apis.duncte123.me/alpaca").then(res => res.json()).then(body => {
            if(!body) return client.Errors.unknownErr(msg, err);
            let embed = new RichEmbed()
                .setColor("RANDOM")
                .setImage(body.data.file)
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
                .setTimestamp();
            m.edit(embed);
        });
    }
};