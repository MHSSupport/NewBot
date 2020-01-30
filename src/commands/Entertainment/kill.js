const { RichEmbed } = require("discord.js");

module.exports = {
    name: "kill",
    aliases: [],
    category: "3.1. 🎲 | Entertainment",
    description: "Pretend to kill someone",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(true, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);

        const gifs = ["https://media.giphy.com/media/CLkW1CgQA5xwA/giphy.gif", "https://media.giphy.com/media/QHYHhShm1sjVS/giphy.gif", "https://media.giphy.com/media/8xCJCMBNuHznW/giphy.gif", "https://media.giphy.com/media/lnakxcfG2MFy/giphy.gif", "https://media.giphy.com/media/7OkKFU3EGQJaw/giphy.gif", "https://media.giphy.com/media/1ludrxHRnUmT6/giphy.gif", "https://media.giphy.com/media/CiZB6WIjaoXYc/giphy.gif"];
        const gif = Math.floor(Math.random() * gifs.length);
        const embed = new RichEmbed()
            .setColor(target.highestRole.color ? target.highestRole.color : "RANDOM")
            .setAuthor(`${msg.member.displayName} killed ${target.displayName === msg.member.displayName ? "themself" : target.displayName}!`)
            .setImage(gifs[gif])
            .setTimestamp();
        msg.channel.send(embed);
    }
};