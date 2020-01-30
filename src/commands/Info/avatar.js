const { RichEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["av"],
    category: "5.1. 📝 | Info",
    description: "Get the avatar image and URL for a user",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let target = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.guild.members.find(m => m.user.tag === args.join(" ")) || msg.guild.members.find(m => m.user.username === args.join(" ")) || msg.member;
        if(!target) return client.Errors.invalidTarget(msg);
        const embed = new RichEmbed()
            .setColor(target.highestRole.color || "BLUE")
            .setTitle(`${target.user.tag}'s avatar`)
            .setURL(target.user.avatarURL)
            .setImage(target.user.avatarURL)
            .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
            .setTimestamp();
        msg.channel.send(embed);
    }
};