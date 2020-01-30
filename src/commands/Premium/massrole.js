module.exports = {
    name: "massrole",
    aliases: ["mrole", "mr"],
    category: "8.1. 👑 | Premium",
    description: "Add or remove a role from a large group of a members with a certain other role",
    usage: "[add | remove] [required role] [role to change]",
    permissions: "MANAGE_ROLES",
    clientPerms: "MANAGE_ROLES",
    premiumOnly: true,
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let targetRole = msg.mentions.roles.first() || msg.guild.roles.get(args[1]) || msg.guild.roles.find(r => r.name === args[1]);
        if(!targetRole) return client.Errors.invalidTarget(msg);
        let memberRole = client.getRoleTarget(msg, args[2]);
        if(!memberRole) return client.Errors.invalidTarget(msg);
        let message = await msg.channel.send(`${client.Emojis.generating} Changing roles for ${memberRole.members.size} members. This may take some time...`);
        let option = args[0];
        if(option.toLowerCase() === "add") {
            try {
                await msg.guild.members.forEach(m => {
                    if(m.roles.has(memberRole.id)) {
                        m.addRole(targetRole.id);
                    };
                });
            } catch(err) {
                client.log(err);
                return client.Errors.unknownErr(msg);
            };
        } else if(option.toLowerCase() === "remove") {
            try {
                await msg.guild.members.forEach(m => {
                    if(m.roles.has(memberRole.id)) {
                        m.removeRole(targetRole.id);
                    };
                });
            } catch(err) {
                client.log(err);
                return client.Errors.unknownErr(msg);
            };
        };
        message.edit(`${client.Emojis.check} Done! I have changed the ${targetRole.name} role for ${memberRole.members.size} members with the ${memberRole.name} role!`)
    }
};