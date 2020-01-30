const { RichEmbed } = require("discord.js");

module.exports = {
    name: "cry",
    aliases: ["cri"],
    category: "3.1. 🎲 | Entertainment",
    description: "Cry. Just cuz",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(true, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);

        const gifs = ["https://gph.is/1SCKBl5", "https://gph.is/g/Z5nbvnw", "https://gph.is/1OLudxc", "https://gph.is/1L4UI0B", "https://gph.is/2FZvH6X", "https://gph.is/2fhIua6"];
        const gif = Math.floor(Math.random() * gifs.length);
        const embed = new RichEmbed()
            .setColor(target.highestRole.color ? target.highestRole.color : "RANDOM")
            .setAuthor(`${msg.member.displayName} cried with ${target.displayName === msg.member.displayName ? "themself!" : target.displayName} :(`)
            .setImage(gifs[gif])
            .setTimestamp();
        msg.channel.send(embed);
    }
};