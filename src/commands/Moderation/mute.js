module.exports = {
    name: "mute",
    aliases: ["m"],
    category: "6.1. ⚒️ | Moderation",
    description: "Mute a member.They will be muted until unmuted. Remember you will still need to move the muted role above other roles for the permissions to work",
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
        let mutedRole = msg.guild.roles.find(r => r.name === "Muted");
        if(!mutedRole) {
            mutedRole = await msg.guild.createRole({
                name: "Muted",
                color: "#00ff00",
            });
            msg.guild.channels.map(c => {
                c.overwritePermissions({
                    mutedRole: {
                        deny: ["SEND_MESSAGES"]
                    }
                });
            });
        };
        try {
            await target.addRole(mutedRole.id);
        } catch(err) {
            client.log(err);
            msg.channel.send(`${client.Emojis.x} Failed to add the muted role to **${target.user.username}**#${target.user.disriminator}. Please make sure I have the correct permissions`);
        };
        try {
            target.send(`You have been muted in ${msg.guild.name} by **${msg.author.username}**#${msg.author.disriminator} for ${reason}`);
        } catch(err) {
            client.log(err);
        };
        msg.channel.send(`${client.Emojis.check} Muted **${target.user.username}**#${target.user.disriminator}`);
    }
};