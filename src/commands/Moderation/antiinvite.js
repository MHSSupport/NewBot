module.exports = {
    name: "antiinvite",
    aliases: ["antiinv", "noinvite", "noinv"],
    category: "6.1. ⚒️ | Moderation",
    description: "Add or remove a channel from the anti-invite list. Mesasges in those channels with an invite in it will be deleted!",
    usage: "[add | remove] [channel]",
    permissions: "MANAGE_GUILD",
    clientPerms: "MANAGE_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const option = args[0];
        if(!option) return client.Errors.noArgs(msg, "antiinvite");
        const chan = client.getChannelTarget(msg, args.slice(1).join(" "));
        if(!chan) return msg.channel.send(`${client.Emojis.x} I cannot find that channel!`);

        let settings = await client.Models.Logs.findOne({
            guildID: msg.guild.id
        });
        if(option.toLowerCase() === "add") {
            if(settings === null) settings = new client.Models.Logs({
                guildID: msg.guild.id
            });
            if(settings.antiInviteChannelIDs.includes(chan.id)) return msg.channel.send(`${client.Emojis.x} That channel is already anti-invites!`);
            settings.antiInviteChannelIDs.push(chan.id);
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Set ${chan} as an anti-invite channel!`);
        } else if(option.toLowerCase() === "remove") {
            if(settings === null || settings.antiInviteChannelIDs === null) return msg.channel.send(`${client.Emojis.x} There are no anti-invite channels!`);
            if(!settings.antiInviteChannelIDs.includes(chan.id)) return msg.channel.send(`${client.Emojis.x} That channel is not anti-invite!`);
            const channels = settings.antiInviteChannelIDs;
            for(let i = 0; i < channels.length; i++) {
                if(channels[i] === chan.id) {
                    settings.antiInviteChannelIDs.splice(i, 1);
                };
            };
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Removed ${chan} from the anti-invite channels!`);
        } else client.Errors.invalidArgs(msg, "antiinvite");
    }
};