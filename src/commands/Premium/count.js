const { RichEmbed } = require("discord.js");

module.exports = {
    name: "count",
    aliases: ["c"],
    category: "8.1. 👑 | Premium",
    description: "Get the message count of a member",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: true,
    run: async (client, msg, args) => {
        const target = client.getMember(true, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg, "count");

        const msgCount = await client.Models.msgCounts.findOne({
            guildID: msg.guild.id,
            userID: target.user.id
        });
        if(msgCount === null) return msg.channel.send(`${client.Emojis.x} That member has no logged messages! If they do not have the message count enabled role their messages will not be counted!`);

        const embed = new RichEmbed()
            .setAuthor(target.displayName, target.user.avatarURL)
            .setColor("BLUE")
            .setDescription(`**Count:** ${msgCount.count ? msgCount.count : 0}`)
            .setTimestamp();
        msg.channel.send(embed);
    }
};