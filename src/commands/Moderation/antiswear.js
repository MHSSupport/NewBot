module.exports = {
    name: "antiswear",
    aliases: ["as", "antis", "aswear"],
    category: "6.1. ⚒️ | Moderation",
    description: "Turn anti-swear on or off",
    usage: "[enable | disable]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const option = args[0];
        if(!option) return client.Errors.noArgs(msg, "antiswear");
        let settings = await client.Models.Logs.findOne({
            guildID: msg.guild.id
        });
        if(option.toLowerCase() === "enable") {
            if(settings !== null && settings.antiSwear !== null && settings.antiSwear === true) return msg.channel.send(`${client.Emojis.x} Anti-swear is already enabled!`);
            if(settings === null) settings = new client.Models.Logs({
                guildID: msg.guild.id
            });
            settings.antiSwear = true;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Enabled anti-swear!`);
        } else if(option.toLowerCase() === "disable") {
            if(settings === null || settings.antiSwear === false || settings.antiSwear === null) return msg.channel.send(`${client.Emojis.x} Anti-swear is already disabled!`);
            settings.antiSwear = false;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Disabled anti-swear!`);
        } else return client.Errors.invalidArgs(msg, "anitswear");
    }
};