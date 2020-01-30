const { RichEmbed }  = require("discord.js");

module.exports = {
    name: "profile",
    aliases: ["bal", "balance", "rank", "xp", "level", "lvl"],
    category: "1.1. 🎖️ | Core",
    description: "See the profile of another member or your own (level, xp, coins)",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let target = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.guild.members.find(m => m.user.tag === args.join(" ")) || msg.guild.members.find(m => m.user.username === args.join(" ")) || msg.member;
        if(!target) return client.Errors.invalidTarget(msg);

        let XP = await client.Models.Xp.findOne({
            userID: target.user.id,
            guildID: msg.guild.id
        });
        let Bal = await client.Models.Money.findOne({
            userID: target.user.id
        });

        let embed = new RichEmbed()
            .setAuthor(target.user.tag)
            .setColor(target.highestRole.color || "BLUE")
            .setThumbnail(target.user.avatarURL)
            .addField("[XP]", XP.xp ? XP.xp : 0, true)
            .addField("[LEVEL]", XP.level ? XP.level : 0, true)
            .addField("[WALLET]", Bal.coins ? Bal.coins : 0, true)
            .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
            .setTimestamp();
        msg.channel.send(embed);
    }
};