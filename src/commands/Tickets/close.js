const ms = require("ms");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "close",
    aliases: [],
    category: "9.3. 📩 | Tickets",
    description: "Close an open ticket",
    usage: "<timeout>",
    permissions: "MANAGE_CHANNELS",
    clientPerms: "MANAGE_CHANNELS",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const userMail = await client.Models.UserMail.findOne({
            guildID: msg.guild.id,
            threadID: msg.channel.id,
            openThread: true,
        });
        if(userMail === null) return msg.channel.send(`${client.Emojis.x} This is not a ticket!`);
        const user = msg.guild.members.get(userMail.userID);
        if(!user) return msg.channel.send(`${client.Emojis.x} I cannot find the owner of this ticket! They probably left the server!`);
        const time = args[0] ? args[0] : "10s";
        msg.channel.send(`${client.Emojis.check} I will close this ticket in **${time}**`);
        setTimeout(async function() {
            const embed = new RichEmbed()
                .setColor("RED")
                .setAuthor("Ticket Closed", msg.guild.iconURL)
                .addField("User", `${user} | **${user.user.tag}** | ${user.user.id}`)
                .addField("Closed by", `${msg.author} | **${msg.author.tag}** | ${msg.author.id}`)
                .setTimestamp();
            const sett = await client.Models.Tickets.findOne({
                guildID: msg.guild.id
            });
            if(sett.logChannelID !== null) {
                const logChan = msg.guild.channels.get(sett.logChannelID);
                if(logChan) {
                    try {
                        logChan.send(sett.supportRoleID ? `<@&${msg.guild.roels.get(sett.supportRoleID)}>` : "@here", embed);
                    } catch(err) {};
                };
            }
            user.send(`Your ticket in **${msg.guild.name}** was closed by **${msg.author.username}**#${msg.author.discriminator}.`);
            client.Models.UserMail.findOneAndDelete({
                guildID: msg.guild.id,
                userID: user.id,
                threadID: msg.channel.id,
                openThread: true,
            });
            msg.channel.delete(`Ticket closed by ${msg.author.tag}`);
        }, ms(time));
    }
};