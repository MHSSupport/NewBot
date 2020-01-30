const { RichEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "new",
    aliases: [],
    category: "9.3. 📩 | Tickets",
    description: "Open a ticket",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "MANAGE_CHANNELS",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const userMail = await client.Models.UserMail.findOne({
            guildID: msg.guild.id,
            userID: msg.author.id,
            openThread: true,
        });
        let openChan;
        if(userMail !== null && userMail.threadID !== null) openChan = msg.guild.channels.get(userMail.threadID);
        if(openChan) return msg.channel.send(`${client.Emojis.x} You already have an open ticket! (${openChan})`);
        const sett = await client.Models.Tickets.findOne({
            guildID: msg.guild.id,
            enabled: true
        });
        if(sett === null) return msg.channel.send(`${client.Emojis.x} Tickets are not enabled on this server!`);
        try {
            const chan = await msg.guild.createChannel(msg.author.username, {
                type: "text",
                permissionOverwrites: [{
                    id: sett.supportRoleID,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                    deny: ["CREATE_INSTANT_INVITE"]
                },{
                    id: msg.author.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                    deny: ["CREATE_INSTANT_INVITE"]
                },{
                    id: msg.guild.id,
                    allow: [],
                    deny: ["VIEW_CHANNEL"]
                },{
                    id: client.user.id,
                    allow: ["MANAGE_CHANNELS", "MANAGE_MESSAGES", "READ_MESSAGES"],
                    deny: []
                }]
            });
            if(sett.newThreadCategoryID !== null) chan.setParent(sett.newThreadCategoryID);
            const embed = new RichEmbed()
                .setColor("GREEN")
                .setAuthor("New Ticket Opened", msg.guild.iconURL)
                .addField("User", `${msg.member} | **${msg.member.user.tag}** | ${msg.member.user.id}`)
                .addField("Nickname", `**${msg.member.nickname !== null ? msg.member.nickname : "None"}**`, true)
                .addField("Status", `**${(msg.member.user.presence.status ? msg.member.user.presence.status : "Offline").replace("dnd", "Do Not Disturb").replace("idle", "Idle").replace("online", "Online")}**`, true)
                .addField("Joined at", `**${moment(msg.member.joinedAt).format('MMMM Do YYYY')}** (${moment(msg.member.joinedAt).from(Date.now())})`)
                .addField("Created at", `**${moment(msg.member.user.createdTimestamp).format('MMMM Do YYYY')}** (${moment(msg.member.user.createdTimestamp).from(Date.now())})`, true)
                .addField("Highest role", `${msg.member.highestRole ? msg.member.highestRole : "None"}`)
                .setTimestamp();
            userMail.threadID = chan.id;
            userMail.openThread = true;
            userMail.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            if(sett.logChannelID !== null) {
                const logChan = msg.guild.channels.get(sett.logChannelID);
                if(logChan) {
                    try {
                        logChan.send(sett.supportRoleID ? `${msg.guild.roles.get(sett.supportRoleID)}` : "@here", embed);
                    } catch(err) {
                        chan.send(sett.supportRoleID ? `${msg.guild.roles.get(sett.supportRoleID)}>` : "@here",embed);
                    };
                } else {
                    chan.send(embed)
                };
            } else chan.send(sett.supportRoleID ? `<${msg.guild.roles.get(sett.supportRoleID)}` : "@here",embed);
            msg.channel.send(`${client.Emojis.check} Created your ticket ${chan}!`);
        } catch(err) {
            client.log(err);
            return msg.channel.send(`${client.Emojis.x} There was an error creating your ticket. Please contact the server owner!`);
        };
        
    }
};