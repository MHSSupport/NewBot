module.exports = {
    name: "setbanner",
    aliases: ["sb"],
    category: "8.1. 👑 | Premium",
    description: "Set the banner to bump your server with. *Premium only",
    usage: "[url]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: true,
    run: async (client, msg, args) => {
        const url = args[0];
        if(!url) return client.Errors.noArgs(msg, "setbanner");
        let settings = await client.Models.Bumps.findOne({
            guildID: msg.guild.id
        });
        if(settings === null) settings = new client.Models.Bumps({
            guildID: msg.guild.id
        });
        settings.bannerURL = url;
        settings.save().catch(err => {
            client.log(err);
            return client.Errors.saveFail(msg);
        });
        msg.channel.send(`${client.Emojis.check} I have set the banner for this server!`);
    }
};