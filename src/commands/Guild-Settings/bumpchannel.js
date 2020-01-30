module.exports = {
    name: "bumpchannel",
    aliases: ["bumpchan", "bc", "bchan", "bumpch", "bch"],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Set the bump-channel for your server. Gives a reduced cooldown!",
    usage: "[channel]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const chan = client.getChannelTarget(msg, args.join(" ")) || msg.channel;
        if(!chan) return msg.channel.send(`${client.Emojis.x} I could not find that channel!`);
        let settings = await client.Models.Bumps.findOne({
            guildID: msg.guild.id
        });
        if(settings === null) settings = new client.Models.Bumps({
            guildID: msg.guild.id
        });
        settings.bumpChannelID = chan.id;
        settings.save().catch(err => {
            client.log(err);
            return client.Errors.saveFail(msg);
        });
        msg.channel.send(`${client.Emojis.check} Set ${chan} to receive bumps from other servers! Your bumping cooldown has been reduced by 1 hour!`);
    }
};