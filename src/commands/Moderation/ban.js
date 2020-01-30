module.exports = {
    name: "ban",
    aliases: ["b"],
    category: "6.1. ⚒️ | Moderation",
    description: "Ban a member",
    usage: "[member] [reason]",
    permissions: "BAN_MEMBERS",
    clientPerms: "BAN_MEMBERS",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(false, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason specified";
        if(!target.bannable) return msg.channel.send(`${client.Emojis.x} I cannot ban that member`);
        
        try {
            await target.ban(`${msg.author.tag}: ${reason}`);
        } catch(err) {
            client.log(err);
            msg.channel.send(`${client.Emopjis.x} Failed to ban **${target.user.username}**#${target.user.discriminator}`);
        };
        msg.channel.send(`${client.Emojis.check} Banned **${target.user.username}**#${target.user.discriminator} for ${reason}`);
    }
};