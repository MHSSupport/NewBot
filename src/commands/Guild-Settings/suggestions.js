module.exports = {
    name: "suggestions",
    aliases: ["suggestchannel", "suggestchan", "suggchan", "sugch", "sc", "schannel", "schan"],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Set the channel to receive suggestions in",
    usage: "[enable | disable] [channel] <role>",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const option = args[0];
        if(option.toLowerCase() === "enable") {
            const chan = client.getChannelTarget(msg, args[1]);
            if(!chan) return client.Errors.invalidTarget(msg);
            const role = client.getRoleTarget(msg, args.slice(2).join(" "));
            let settings = await client.Models.Suggestions.findOne({
                guildID: msg.guild.id
            });
            if(settings === null) settings = new client.Models.Suggestions({
                guildID: msg.guild.id
            });
            settings.channelID = chan.id;
            if(role) settings.roleID = role.id;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Successfully set the suggestions settings: allowed role: **${role ? role.name : "everyone"}** | channel: ${chan}`);
        } else if(option.toLowerCase() === "disable") {
            if(await client.Models.Suggestions.findOne({ guildID: msg.guild.id }) === null) return msg.channel.send(`${client.Emojis.x} Suggestions are already disabled on this server!`);
            try {
                await client.models.Suggestions.findOneAndDelete({
                    guildID: msg.guild.id
                });
            } catch(err) {
                client.log(err);
                return client.Errors.unknownErr(msg, err);
            };
            msg.channel.send(`${client.Emojis.x} Successfulyl disabled sugegstions!`);
        } else return client.Errors.invalidArgs(msg, "suggestions");
    }
};