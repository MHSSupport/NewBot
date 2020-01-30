module.exports = {
    name: "logchannel",
    aliases: ["lc", "logchan"],
    category: "9.3. 📩 | Tickets",
    description: "Set the logging channel for ticket threads",
    usage: "<channel>",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        if(!args[0]) {
            const settings = await client.Models.Tickets.findOne({
                guildID: msg.guild.id
            });
            const chan = msg.guild.channels.get(settings.logChannelID);
            if(settings === null || settings.supportRoleID === null ||!role) return msg.channel.send(`${client.Emojis.x} This server doesnt have a ticket log set!`);
            msg.channel.send(`**${chan}** is the current ticket logging channel on this server!`);
        } else if(args[0]) {
            const chan = client.getChannelTarget(msg, args.join(" "));
            if(!chan) return client.Errors.invalidTarget(msg);
            let settings = await client.Models.Tickets.findOne({
                guildID: msg.guild.id
            });
            if(settings === null) settings = new client.Models.Tickets({
                guildID: msg.guild.id
            });
            settings.logChannelID = chan.id;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Set ${chan} as the ticket logging channel for this server!`);
        };
    }
};