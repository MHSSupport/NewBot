const { RichEmbed } = require("discord.js");

module.exports = {
    name: "roleinfo",
    aliases: ["rolei", "ri"],
    category: "5.1. 📝 | Info",
    description: "Get the information on a role",
    usage: "[role]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let target = msg.mentions.roles.first() || msg.guild.roles.get(args[0]) || msg.guild.roles.find(r => r.name === args.join(" "));
        if(!target) return client.Errors.invalidTarget(msg);
        let embed = new RichEmbed()
            .setAuthor(target.name)
            .setDescription(`**Name:** ${target.name}\n**ID:** ${target.id}\n**Members:** ${target.members.size}\n**Hoisted:** ${target.hoist}\n**Position:** ${target.position}\n**Mentionable:** ${target.mentionable}`)
            .setColor(target.color)
            .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
            .setTimestamp();
        msg.channel.send(embed);
    }
};