module.exports = {
    name: "starbaord",
    aliases: ["stb", "starb", "sboard"],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Enable or disable a channel to be used as the starboard",
    usage: "[enable | disable] [channel]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        if(args[0].toLowerCase() === "enable") {
            const chan = client.getChannelTarget(msg, args.slice(1).join(" "));
            if(!chan) return client.Errors.invalidTarget(msg);
            let settings = await client.Models.Logs.findOne({
                guildID: msg.guild.id
            });
            if(settings === null) settings = new client.Models.Logs({
                guildID: msg.guild.id
            });
            settings.starboardChannelID = chan.id;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Set ${chan} as the starboard for this server!`);
        } else if(args[0].toLowerCase() === "disable") {
            let settings = await client.Models.Logs.findOne({
                guildID: msg.guild.id
            });
            if(settings === null) return msg.channel.send(`${client.Emojis.x} Starboard is already disabled here!`);
            settings.starboardChannelID = null;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Disabled starboard!`);
        } else return client.Errors.invalidArgs(msg, "starboard");
    }
};