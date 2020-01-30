module.exports = {
    name: "agree",
    aliases: [],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Change settings for the `agree` system",
    usage: "[enable | disable] [role] [channel]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const option = args[0];
        if(option.toLowerCase() === "enable") {
            const role = client.getRoleTarget(msg, args[1]);
            if(!role) return msg.channel.send(`${client.Emojis.x} Failed to find the role to enable \`agree\` for!`);
            const chan = client.getChannelTarget(msg, args.slice(2).join(" "));
            if(!chan) return msg.channel.send(`${client.Emojis.x} Failed to find the channel to enable \`agree\` for!`);

            let settings = await client.Models.Agree.findOne({
                guildID: msg.guild.id
            });
            if(settings === null) settings = new client.Models.Agree({
                guildID: msg.guild.id
            });
            settings.channelID = chan.id;
            settings.roleID = role.id;
            await settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Successfully enabled \`agree\` with the role to give as **${role.name}** and the set channel as ${chan}`);
        } else if(option.toLowerCase() === "disable") {
            if(await client.Models.findOne({ guildID: msg.guild.id }) === null) return msg.channel.send(`${client.Emojis.x} The \`agree\` system is not enabled here!`);
            try {
                await client.Models.findOneAndDelete({
                    guildID: msg.guild.id
                });
            } catch(err) {
                client.log(err);
                return client.Errors.unknownErr(msg, err);
            };
            msg.channel.send(`${client.Emojis.check} Disabled the entire \`agree\` system!`);
        } else return client.Errors.invalidArgs(msg, "agree");
    }
};