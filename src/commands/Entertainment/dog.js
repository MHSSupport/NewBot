const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "dog",
    aliases: ["doggo", "puppy"],
    category: "3.1. 🎲 | Entertainment",
    description: "Because dog people would be upset if we only had a cat command",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let m = await msg.channel.send(`${client.Emojis.loading} Generating..`);
        fetch("https://dog.ceo/api/breeds/image/random").then(res => res.json()).then(body => {
            if(!body) return client.Errors.unknownErr(msg, err);
            let embed = new RichEmbed()
                .setColor("RANDOM")
                .setImage(body.message)
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
                .setTimestamp();
            m.edit(embed);
        });
    }
};