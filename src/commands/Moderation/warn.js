const { RichEmbed } = require("discord.js");

module.exports = {
    name: "warn",
    aliases: ["w"],
    category: "6.1. ⚒️ | Moderation",
    description: "Warn a rule breaker",
    usage: "[member] <reason>",
    permissions: "MANAGE_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(false, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason specified";

        try {
            target.send(`You have been warned in ${msg.guuld.name} by **${msg.author.username}**#${msg.author.discriminator} for ${reason}`);
        } catch(err) {
            client.log(err);
            msg.channel.send(`${client.Emojis.x} Failed to direct message **${target.user.username}**#${target.user.discriminator}`);
        };

        const embed = new RichEmbed()
            .setAuthor(`${msg.author.tag}: Warn`, msg.author.avatarURL)
            .setColor(client.colours.YELLOW)
            .setDescription(`**Action:** Warn\n**Actioned by:** ${msg.author} (${msg.author.tag})\n**Target:** ${target} (${target.user.tag})\n**Server:** ${msg.guild.name}\n**Reason:** ${reason}`)
            .setTimestamp();

        const logs = await client.Models.Logs.findOne({
            guildID: msg.guild.id
        });
        if(logs !== null && logs.modLogID !== null) {
            try {
                msg.guild.channels.get(logs.modLogID).send(embed);
            } catch(err) {
                client.log(err);
            };
        };

        msg.channel.send(`${client.Emojis.check} Warned **${target.user.username}**#${target.user.discriminator} for ${reason}`);
    }
};