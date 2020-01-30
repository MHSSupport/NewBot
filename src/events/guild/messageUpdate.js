const cooldown = new Set();

module.exports = {
    name: "messageUpdate",
    run: async (client, oldMsg, newMsg) => {
        if(!newMsg.guild || newMsg.author.bot || newMsg.content.toLowerCase() === oldMsg.content.toLowerCase()) return;
        let confPrefix = await client.Models.Prefix.findOne({
            guildID: newMsg.guild.id
        });
        let prefix = confPrefix ? confPrefix.prefix : client.prefix;
        if(newMsg.content.startsWith(prefix)) {
            const msg = newMsg;
            const args = msg.content.slice(prefix.length).trim().split(' ');
            const cmd = args.shift().toLowerCase();
            try {
                const command = client.commands.has(cmd) ? client.commands.get(cmd) : client.commands.get(client.aliases.get(cmd));
                if(command) {
                    if(cooldown.has(msg.guild.id)) return;
                    if(command.premiumOnly === true && await client.Models.Premium.findOne({ guildID: msg.guild.id }) === null) return client.Errors.premiumOnly(msg);
                    if(command.guildOnly && !msg.guild) return msg.channel.send(`${client.Emojis.x} That command may only be run in a guild!`);
                    if(command.permissions && !msg.member.hasPermission(command.permissions)) return client.Errors.noPerms(msg, command.permissions);
                    if(command.clientPerms && !msg.guild.me.hasPermission(command.clientPerms)) return client.Errors.noClientPerms(msg, command.clientPerms);
                    if(command.creatorOnly && msg.author.id !== client.creator.id) return msg.react("664138952730607640");
                    
                    command.run(client, msg, args);

                    cooldown.add(msg.guild.id);
                    setTimeout(function() {
                        cooldown.delete(msg.guild.id);
                    }, 3000);
                };
            } catch (err) {
                client.log(err);
                client.Errors.unknownErr(msg, err);
            };
        };
    }
};