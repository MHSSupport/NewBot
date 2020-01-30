const cooldown = new Set();
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "message",
    run: async (client, msg) => {
        if(msg.author.bot) return;
        if(msg.channel.type == "dm") {
            
        };

        if(!msg.guild) return;

        const confPrefix = await client.Models.Prefix.findOne({
            guildID: msg.guild.id
        });
        const prefix = confPrefix ? confPrefix.prefix : client.prefix;

        if(msg.content.startsWith(prefix) && msg.guild) {
            const args = msg.content.slice(prefix.length).trim().split(" ");
            const cmd = args.shift().toLowerCase();
            try {
                const command = client.commands.has(cmd) ? client.commands.get(cmd) : client.commands.get(client.aliases.get(cmd));
                if(command) {
                    if(cooldown.has(msg.guild.id)) return;
                    if(command.premiumOnly === true && await client.Models.Premium.findOne({ guildID: msg.guild.id }) === null) return client.Errors.premiumOnly(msg);
                    if(command.permissions && !msg.member.hasPermission(command.permissions) && msg.author.id !== client.creator.id) return client.Errors.noPerms(msg, command.permissions);
                    if(command.clientPerms && !msg.guild.me.hasPermission(command.clientPerms)) return client.Errors.noClientPerms(msg, command.clientPerms);
                    if(command.creatorOnly && msg.author.id !== client.creator.id) return msg.react("664138952730607640");

                    command.run(client, msg, args);
                    
                    setTimeout(function() {
                        cooldown.delete(msg.guild.id);
                    }, 3000);
                };
            } catch (err) {
                client.log(err);
                client.Errors.unknownErr(msg);
            };
        } else {
            const agreeSettings = await client.Models.Agree.findOne({
                guildID: msg.guild.id
            });
            if(agreeSettings !== null && agreeSettings.channelID === msg.channel.id && agreeSettings.roleID !== null) {
                if(msg.content.toLowerCase() !== "agree") return msg.delete();
                try {
                    await msg.member.addRole(agreeSettings.roleID);
                    const m = await msg.channel.send(`${client.Emojis.check} You have been verified **${msg.author.username}**${msg.author.discriminator}!`)
                    msg.delete();
                    setTimeout(function() {
                        m.delete();
                    }, 5000);
                } catch(err) {
                    client.log(err);
                    return msg.channel.send(`${client.Emojis.x} I failed to verify you! Please contact the support team for this server! IF you believe this is a problem with the bot please report it to the developers!`);
                };
            };

            if (msg.content.includes(msg.mentions.users.first())) {
                if(msg.mentions.users.first().id === client.user.id) {
                    const embed = new RichEmbed()
                        .setAuthor(msg.guild.me.displayName, client.user.avatarURL)
                        .setColor("#36393F")
                        .setDescription(`Hey there! I am **${client.user.username}**, here to help. I was brought to life by **${client.creator.tag}**! Check out my repository [here](https://github.com/MatievisTheKat/NewBot). For support please [join here](https://discord.gg/3JMEGcQ). Lastly, to get started just type \`${prefix}help\` and everything will come up!`)
                        .setTimestamp();
                    const m = await msg.channel.send(embed);
                    setTimeout(function() {
                        m.delete();
                    }, 20000)
                };
                let mentioned = client.afk.get(msg.mentions.users.first().id);
                if(mentioned) msg.channel.send(`**${mentioned.usertag}** is currently afk. Reason: ${mentioned.reason}`);
            };

            const settings = await client.Models.Logs.findOne({
                guildID: msg.guild.id
            });
            if(settings !== null && settings.antiInviteChannelIDs !== null) {
                const invRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/m;
                if(settings.antiInviteChannelIDs.includes(msg.channel.id) && invRegex.test(msg.content.toLowerCase())) {
                    msg.delete("Contained an invite in anti-invite channels");
                    msg.channel.send(`${client.Emojis.x} You may not send invites in this channel **${msg.author.username}**#${msg.author.discriminator}!`).then(m => m.delete(10000));
                };
            };

            if(settings !== null && settings.antiSwear === true) {
                const swearWords = ["fuck", "shit", "crap", "damn", "fuk", "fuc", "f*ck", "fucking", "fuckin", "fuking", "fucing", "fukin", "fucin", "fkn", "shite", "sh*t", "5hit"];
                if(swearWords.some(word => msg.content.toLowerCase().includes(word))) {
                    msg.delete();
                    msg.channel.send(`${client.Emojis.x} You may not send that word here **${msg.author.username}**#${msg.author.discriminator}!`).then(m => m.delete(10000));
                };
            };

            let afkcheck = client.afk.get(msg.author.id);
            if(afkcheck) return [client.afk.delete(msg.author.id), msg.channel.send(`Welcome back ${msg.author}! I have removed your afk!`).then(m => m.delete(20000))];
            
            let xpToAdd = Math.ceil(Math.random() * 10);
            let xp = await client.Models.Xp.findOne({
                userID: msg.author.id,
                guildID: msg.guild.id
            });
            if(xp === null){
                const newXp = new client.Models.Xp({
                    userID: msg.author.id,
                    guildID: msg.guild.id,
                    level: 0,
                    xp: xpToAdd
                });
                await newXp.save().catch(err => {
                    client.log(err);
                });
            } else{
                xp.xp = xp.xp + xpToAdd;
                let nextLevel = xp.level < 1 ? 300 : xp.level * 300;
                if(xp.xp > nextLevel) {
                    xp.level = xp.level + 1;
                    let lvlUpChannel = await client.Models.LevelUpChannel.findOne({
                        guildID: msg.guild.id
                    });
                    if(lvlUpChannel !== null && lvlUpChannel.channel === "dm") return msg.author.send(`${client.Emojis.etada} Well done ${msg.author}! You have leveled up to ${xp.level}`);
                    else {
                        try {
                            msg.guild.channels.get(lvlUpChannel.channel).send(`${client.Emojis.etada} Well done ${msg.author}! You have leveled up to ${xp.level}`);
                        } catch(err) {
                            let m = await msg.channel.send(`${client.Emojis.etada} Well done ${msg.author}! You have leveled up to ${xp.level}`);
                            setTimeout(function() {
                                m.delete();
                            }, 8000);
                        };
                    };
                };
                await xp.save().catch(err => client.log(err));
            };
        };
    }
};