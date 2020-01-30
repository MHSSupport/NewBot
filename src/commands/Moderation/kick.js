module.exports = {
    name: "kick",
    aliases: ["k"],
    category: "6.1. ⚒️ | Moderation",
    description: "Kick a member from the server",
    usage: "[member] <reaosn>",
    permissions: "KICK_MEMBERS",
    clientPerms: "KICK_MEMBERS",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(false, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason specified";

        let embed = new RichEmbed()
            .setAuthor(`${msg.author.tag}: Kick`, msg.author.avatarURL)
            .setColor(client.colours.YELLOW)
            .setDescription(`**Action:** Kick\n**Actioned by:** ${msg.author} (${msg.author.tag})\n**Target:** ${target} (${target.user.tag})\n**Server:** ${msg.guild.name}\n**Reason:** ${reason}`)
            .setTimestamp();
        
        try {
            target.send(embed);
        } catch(err) {
            client.log(err);
        };
        
        try {
            await target.kick(`${msg.author.tag}: ${reason}`)
        } catch(err) {
            client.log(err);
            msg.channel.send(`${client.Emojis.x} Failed to kick **${target.user.username}**#${target.user.discriminator}. Please make sure I am higher than them and that I have the correct permissions`)
        };

        let logs = await client.Models.Logs.findOne({
            guildID: msg.guild.id
        });
        if(logs.modLogID !== null) {
            try {
                msg.guild.channels.get(logs.modLogID).send(embed);
            } catch(err) {
                client.log(err);
            };
        };
        msg.channel.send(`${client.Emojis.check} Kicked **${target.user.username}**#${target.user.discriminator} for ${reason}`);
    }
};