module.exports = {
    name: "levelUpChannel",
    aliases: ["lvlchannel", "levelupannouncements", "lvlup", "announcechannel", "lvlupchannel"],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Set the channel to send level up notifications. Do `-dm` to set it to direct messages",
    usage: "[-channel | -dm] <channel>",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let option = args[0];
        if(option.toLowerCase() !== "-channel" || option.toLowerCase() === "-dm");
        let db = await client.Models.LevelUpChannel.findOne({
            guildID: msg.guild.id
        });
        if(db === null) db = new client.Models.LevelUpChannel({
            guildID: msg.guild.id
        });
        let channel;
        if(option.toLowerCase() === "-channel") channel = msg.mentions.channels.first().id || msg.guild.channels.get(args[1]).id;
        else if(option.toLowerCase() === "-dm") channel = "dm";
        db.channel = channel;
        await db.save().catch(err => {
            client.log(err);
            client.Errors.saveFail(msg);
            return;
        });
        msg.channel.send(`${client.Emojis.check} I have set the channel for level up messages!`);
    }
};