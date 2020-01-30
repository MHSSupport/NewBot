module.exports = {
    name: "unmute",
    aliases: ["um"],
    category: "6.1. ⚒️ | Moderation",
    description: "Unmute a member. Remember you will still need to move the muted role above other roles for the permissions to work",
    usage: "[member] [reason]",
    permissions: "MANAGE_ROLES",
    clientPerms: "MANAGE_ROLES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(false, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason specified";
        const mutedRole = msg.guild.roles.find(r => r.name === "Muted");
        if(!mutedRole) return msg.channel.send(`${client.Emojis.x} There is no muted role`);
        if(!target.roles.has(mutedRole.id)) return msg.channel.send(`${client.Emojis.x} That member is not muted`);

        try {
            await target.removeRole(mutedRole.id);
        } catch(err) {
            client.log(err);
            msg.channel.send(`${client.Emojis.x} Failed to remove the muted role from **${target.user.username}**#${target.user.disriminator}. Please make sure I have the correct permissions`);
        };
        try {
            target.send(`You have been unmuted in ${msg.guild.name} by **${msg.author.username}**#${msg.author.disriminator} for ${reason}`);
        } catch(err) {
            client.log(err);
        };
        msg.channel.send(`${client.Emojis.check} Unmuted **${target.user.username}**#${target.user.disriminator}`);
    }
};