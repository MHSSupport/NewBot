const { RichEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    aliases: ["whois", "ui", "useri", "uinfo"],
    category: "5.1. 📝 | Info",
    description: "Displays information on a user",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let target = args[0] ? client.getMember(false, args.join(" "), msg) : msg.member;
        const premium = await client.Models.Premium.findOne({
            guildID: msg.guild.id
        });
        if(target) {
            const embed = new RichEmbed()
                .setAuthor(target.user.tag)
                .setThumbnail(target.user.avatarURL)
                .setColor(target.highestRole.color || "BLUE")
                .addField("User", `${target} | **${target.user.tag}** | ${target.user.id}`)
                .addField("Nickname", `**${target.nickname !== null ? target.nickname : "None"}**`)
                .addField("Status", `**${(target.user.presence.status ? target.user.presence.status : "Offline").replace("dnd", "Do Not Disturb").replace("idle", "Idle").replace("online", "Online")}**`, true)
                .addField("Game", `**${target.user.presence.game ? target.user.presence.game.name : "None"}**`, true)
                .addField("Joined at", `**${moment(target.joinedAt).format('MMMM Do YYYY')}** (${moment(target.joinedAt).from(Date.now())})`)
                .addField("Created at", `**${moment(target.user.createdTimestamp).format('MMMM Do YYYY')}** (${moment(target.user.createdTimestamp).from(Date.now())})`)
                .addField("Highest role", `${target.highestRole ? target.highestRole : "None"}`)
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
                .setTimestamp();
            if(premium !== null) {
                let status = target.user.presence.clientStatus;
                if(status.desktop === "dnd") status = `**Desktop:** ${client.Emojis.dnd}`;
                else if(status.desktop === "idle") status = `**Desktop:** ${client.Emojis.idle}`;
                else if(status.desktop === "online") status = `**Desktop:** ${client.Emojis.online}`;
                else if(status.web === "dnd") status = `**Web:** ${client.Emojis.dnd}`;
                else if(status.web === "idle") status = `**Web:** ${client.Emojis.idle}`;
                else if(status.web === "online") status = `**Web:** ${client.Emojis.online}`;
                else if(status.mobile === "dnd") status = `**Mobile:** ${client.Emojis.dnd}`;
                else if(status.mobile === "idle") status = `**Mobile:** ${client.Emojis.idle}`;
                else if(status.mobile === "online") status = `**Mobile:** ${client.Emojis.online}`;
                else status = `**Offline:** ${client.Emojis.offline}`;
                embed
                    .addField("Platform", status, true)
                    .addField("Roles", `**${target.roles.size}**`, true);
            }
            msg.channel.send(embed);
        } else {
            target = args[0] ? client.getUser(args.join(" ")) : msg.author;
            if(!target) return client.Errors.invalidTarget(msg);
            try {
                let embed = new RichEmbed()
                    .setAuthor(target.tag)
                    .setThumbnail(target.avatarURL)
                    .setColor("BLUE")
                    .addField("User", `${target} | **${target.tag}** | ${target.id}`)
                    .addField("Status", `**${(target.presence.status ? target.presence.status : "Offline").replace("dnd", "Do Not Disturb").replace("idle", "Idle").replace("online", "Online")}**`, true)
                    .addField("Game", `**${target.presence.game ? target.presence.game.name : "None"}**`, true)
                    .addField("Account created at", `**${moment(target.createdTimestamp).format('MMMM Do YYYY')}** (${moment(target.createdTimestamp).from(Date.now())})`)
                    .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
                    .setTimestamp();
                if(premium !== null) {
                    let status = target.presence.clientStatus;
                    if(status.desktop === "dnd") status = `**Desktop:** ${client.Emojis.dnd}`;
                    else if(status.desktop === "idle") status = `**Desktop:** ${client.Emojis.idle}`;
                    else if(status.desktop === "online") status = `**Desktop:** ${client.Emojis.online}`;
                    else if(status.web === "dnd") status = `**Web:** ${client.Emojis.dnd}`;
                    else if(status.web === "idle") status = `**Web:** ${client.Emojis.idle}`;
                    else if(status.web === "online") status = `**Web:** ${client.Emojis.online}`;
                    else if(status.mobile === "dnd") status = `**Mobile:** ${client.Emojis.dnd}`;
                    else if(status.mobile === "idle") status = `**Mobile:** ${client.Emojis.idle}`;
                    else if(status.mobile === "online") status = `**Mobile:** ${client.Emojis.online}`;
                    else status = `**Offline:** ${client.Emojis.offline}`;
                    embed
                        .addField("Platform", status, true);
                }
                msg.channel.send(embed);
            } catch(err) {
                client.log(err);
                return client.Errors.invalidTarget(msg);
            };
        };
    }
};