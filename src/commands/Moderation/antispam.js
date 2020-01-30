module.exports = {
    name: "antispam",
    aliases: ["asp"],
    category: "6.1. ⚒️ | Moderation",
    description: "Enable or disable anti-spam!",
    usage: "[enable | disable]",
    permissions: "MANAGE_GUILD",
    clientPerms: "MANAGE_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const option = args[0];
        if(!option) return client.Errors.noArgs(msg, "antispam");
        let sett = await client.Models.Logs.findOne({
            guildID: msg.guild.id,
        });
        if(option.toLowerCase() === "enable") {
            if(sett === null) sett = new client.Models.Logs({
                guildID: msg.guild.id,
            });
            if(sett.antiSpam === true) return msg.channel.send(`${client.Emojis.x} Anti-spam is already enabled!`);
            sett.antiSpam = true;
            msg.channel.send(`${client.Emojis.check} Enabled anti-spam!`);
        } else if(option.toLowerCase() === "disable") {
            if(sett === null || sett.antiSpam === false) return msg.channel.send(`${client.Emojis.x} Anti-spam is already disabled!`);
            sett.antiSpam = false;
            msg.channel.send(`${client.Emojis.check} Disabled anti-spam!`);
        } else return client.Errors.invalidArgs(msg, "antispam");
        sett.save().catch(err => {
            client.log(err);
            return client.Errors.saveFail(msg);
        });
    }
};