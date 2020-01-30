const { RichEmbed } = require("discord.js");

module.exports = {
    name: "slap",
    aliases: [],
    category: "3.1. 🎲 | Entertainment",
    description: "Slap someone",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(true, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);

        const gifs = ["https://media.giphy.com/media/55TZk1pnXsBQA/giphy.gif","https://media.giphy.com/media/3XlEk2RxPS1m8/giphy.gif", "https://media.giphy.com/media/j3iGKfXRKlLqw/giphy.gif", "https://media.giphy.com/media/gSIz6gGLhguOY/giphy.gif", "https://media.giphy.com/media/zvDT09xBhcuMo/giphy.gif", "https://media.giphy.com/media/uqSU9IEYEKAbS/giphy.gif", "https://media.giphy.com/media/reXcrlJ3OhvDq/giphy.gif", "https://media.giphy.com/media/u8maN0dMhVWPS/giphy.gif", "https://media.giphy.com/media/uG3lKkAuh53wc/giphy.gif", "https://media.giphy.com/media/11sV0mwXMM5sJi/giphy.gif", "https://media.giphy.com/media/vxvNnIYFcYqEE/giphy.gif", "https://media.giphy.com/media/Y6c59hTH3TJoA/giphy.gif"];
        const gif = Math.floor(Math.random() * gifs.length);
        const embed = new RichEmbed()
            .setColor(target.highestRole.color ? target.highestRole.color : "RANDOM")
            .setAuthor(`${msg.member.displayName} slapped ${target.displayName === msg.member.displayName ? "themself" : target.displayName}!`)
            .setImage(gifs[gif])
            .setTimestamp();
        msg.channel.send(embed);
    }
};