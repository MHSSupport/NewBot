module.exports = {
    name: "setdescription",
    aliases: ["setdesc"],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Set the description to bump your server with",
    usage: "[description]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    run: async (client, msg, args) => {
        const desc = args.join(" ");
        if(!desc) return client.Errors.noArgs(msg, "setdescription");
        let settings = await client.Models.Bumps.findOne({
            guildID: msg.guild.id
        });
        if(settings === null) settings = new client.Models.Bumps({
            guildID: msg.guild.id
        });
        settings.description = desc;
        settings.save().catch(err => {
            client.log(err);
            return client.Errors.saveFail(msg);
        });
        msg.channel.send(`${client.Emojis.check} Set the description for this guild!`);
    }
};