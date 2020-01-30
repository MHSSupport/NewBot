module.exports = {
    name: "tickets",
    aliases: [],
    category: "9.3. 📩 | Tickets",
    description: "Enable and disable tickets",
    usage: "[enable | disable]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const option = args[0];
        if(!option) return client.Errors.noArgs(msg, "tickets");
        let settings = await client.Models.Tickets.findOne({
            guildID: msg.guild.id
        });
        if(option.toLowerCase() === "enable") {
            if(settings !== null && settings.enabled === true) return msg.channel.send(`${client.Emojis.x} Tickets are already enabled!`);
            if(settings !== null && settings.supportRoleID === null) return msg.channel.send(`${client.Emojis.x} You need to set a support role first! (\`supportrole <role>\`)`);
            if(settings === null) settings = new client.Models.Tickets({
                guildID: msg.guild.id
            });
            settings.enabled - true;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Enabled tickets for this server!`);
        } else if(option.toLowerCase() === "disable") {
            if(settings === null) return msg.channel.send(`${client.Emojis.x} Tickets are already disabled on this server!`);
            settings.enabled = false;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} disabled tickets for this server!`);
        } else return client.Errors.invalidArgs(msg, "tickets");
    }
};