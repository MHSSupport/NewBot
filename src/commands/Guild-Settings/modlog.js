module.exports = {
    name: "modlog",
    aliases: ["moderationlogs", "modlogs"],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Set the channel to log moderation",
    usage: "[channel | disable]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(args[0].toLowerCase() === "disable") {
            await client.Models.Logs.findOneAndDelete({
                guidl: msg.guild.id
            });
            msg.channel.send(`${client.Emojis.check} Disabled moderation logging!`);
        } else {
            let chan = msg.mentions.channels.first() || msg.guild.channels.get(args[0]);
            if(!chan) return client.Errors.invalidChan(msg);
            let db = await client.Models.Logs.findOne({
                guildID: msg.guild.id
            });
            if(db === null) db = new client.Models.Logs({
                guildID: msg.guild.id
            });
            db.modLogID = chan.id;
            await db.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
            msg.channel.send(`${client.Emojis.check} Set ${chan} to log moderation actions`);
        }
    }
};