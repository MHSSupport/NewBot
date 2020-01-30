const { RichEmbed } = require("discord.js");

module.exports = {
    name: "eat",
    aliases: ["nom"],
    category: "3.1. 🎲 | Entertainment",
    description: "Eat someone >:)",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(true, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);

        const gifs = ["https://media.giphy.com/media/ZFuPxYpT4qYOWnDAno/giphy.gif", "https://media.giphy.com/media/9r4UmBv4QuF8qbkib6/giphy.gif", "https://media.giphy.com/media/3o6Ztq7p5irM9yPFmw/giphy.gif", "https://media.giphy.com/media/12n1l8UF3Ib4je/giphy.gif", "https://media.giphy.com/media/DbcEQQeM792uc/giphy.gif", "https://media.giphy.com/media/l1BgT4CgMqsoyYkyQ/giphy.gif", "https://media.giphy.com/media/l41lRTRi4lYbaTTcQ/giphy.gif"];
        const gif = Math.floor(Math.random() * gifs.length);
        const embed = new RichEmbed()
            .setColor(target.highestRole.color ? target.highestRole.color : "RANDOM")
            .setAuthor(`${msg.member.displayName} ate ${target.displayName === msg.member.displayName ? "themself" : target.displayName}!`)
            .setImage(gifs[gif])
            .setTimestamp();
        msg.channel.send(embed);
    }
};