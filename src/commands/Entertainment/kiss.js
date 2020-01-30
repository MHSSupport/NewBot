const { RichEmbed } = require("discord.js");

module.exports = {
    name: "kiss",
    aliases: [],
    category: "3.1. 🎲 | Entertainment",
    description: "Kiss someone uwu",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(true, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);

        const gifs = ["https://media.giphy.com/media/l2Je2M4Nfrit0L7sQ/giphy.gif", "https://media.giphy.com/media/LrGTrFHEXDMyd4V2Nt/giphy.gif", "https://media.giphy.com/media/Nydo55HzhyGqI/giphy.gif", "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif", "https://media.giphy.com/media/12VXIxKaIEarL2/giphy.gif", "https://media.giphy.com/media/Ka2NAhphLdqXC/giphy.gif", "https://media.giphy.com/media/OSq9souL3j5zW/giphy.gif"];
        const gif = Math.floor(Math.random() * gifs.length);
        const embed = new RichEmbed()
            .setColor(target.highestRole.color ? target.highestRole.color : "RANDOM")
            .setAuthor(`${msg.member.displayName}  ${target.displayName === msg.member.displayName ? "themself" : target.displayName}`)
            .setImage(gifs[gif])
            .setTimestamp();
        msg.channel.send(embed);
    }
};