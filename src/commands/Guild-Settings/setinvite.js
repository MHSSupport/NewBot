module.exports = {
    name: "setinvite",
    aliases: ["setinv"],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Set the channel to create an invite for bumping your server with",
    usage: "<channel>",
    permissions: "MANAGE_GUILD",
    clientPerms: "CREATE_INSTANT_INVITE",
    creatorOnly: false,
    guildOnly: true,
    run: async (client, msg, args) => {
        const chan = client.getChannelTarget(msg, args.join(" ").toLowerCase()) || msg.channel;
        const inv = await chan.createInvite({
            temporary: false,
            maxAge: 0,
            maxUses: 0,
            unique: false
        }, "Bump settings");
        let settings = await client.Models.Bumps.findOne({
            guildID: msg.guild.id
        });
        if(settings === null) settings = new client.Models.Bumps({
            guildID: msg.guild.id
        });
        settings.inviteURL = inv.url;
        settings.save().catch(err => {
            client.log(err);
            return client.Errors.saveFail(msg);
        });
        msg.channel.send(`${client.Emojis.check} Set the invite for this guild to ${chan}!`);
    }
};