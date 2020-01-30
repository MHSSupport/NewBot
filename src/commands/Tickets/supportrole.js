module.exports = {
    name: "supportrole",
    aliases: ["sr"],
    category: "9.3. 📩 | Tickets",
    description: "Set the role that can view and reply to ticket threads",
    usage: "<role>",
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
            const role = msg.guild.roles.get(settings.supportRoleID);
            if(settings === null || settings.supportRoleID === null ||!role) return msg.channel.send(`${client.Emojis.x} This server doesnt have a support role set!`);
            msg.channel.send(`**${role.name}** is the current support role on this server!`);
        } else if(args[0]) {
            const role = client.getRoleTarget(msg, args.join(" "));
            if(!role) return client.Errors.invalidTarget(msg);
            let settings = await client.Models.Tickets.findOne({
                guildID: msg.guild.id
            });
            if(settings === null) settings = new client.Models.Tickets({
                guildID: msg.guild.id
            });
            settings.supportRoleID = role.id;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Set **${role.name}** as the support role for this server!`);
        };
    }
};