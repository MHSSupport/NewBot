module.exports = {
    name: "role",
    aliases: ["r", "addrole", "removerole"],
    category: "1.1. 🎖️ | Core",
    description: "Toggle a role for a member",
    usage: "[member] [role]",
    permissions: "MANAGE_ROLES",
    clientPerms: "MANAGE_ROLES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(false, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);
        const role = msg.mentions.roles.first() || msg.guild.roles.get(args[2]) || msg.guild.roles.find(r => r.name.includes(args.slice(1).join(" ")));
        if(!role) return client.Errors.invalidTarget(msg);
        try {
            if(target.roles.has(role.id)) {
                target.removeRole(role.id);
                msg.channel.send(`${client.Emojis.check} Removed \`${role.name}\` from **${target.user.username}**#${target.user.discriminator}`);
            } else {
                target.addRole(role.id);
                msg.channel.send(`${client.Emojis.check} Added \`${role.name}\` to **${target.user.username}**#${target.user.discriminator}`);
            };
        } catch(err) {
            client.log(err);
            msg.channel.send(`${client.Emojis.x} I failed to change roles for **${target.user.username}**#${target.user.discriminator}. Please make sure I have the correct permissions and that their roles are below mine`);
        };
        
    }
};