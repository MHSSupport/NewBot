const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "cat",
    aliases: ["kittie"],
    category: "3.1. 🎲 | Entertainment",
    description: "Get a cute picture of a cat because why the hell not",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let m = await msg.channel.send(`${client.Emojis.loading} Generating..`);
        fetch("https://aws.random.cat/meow").then(res => res.json()).then(body => {
            if(!body) return client.Errors.unknownErr(msg);
            let embed = new RichEmbed()
                .setColor("RANDOM")
                .setImage(body.file)
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
                .setTimestamp();
            m.edit(embed);
        });
    }
};