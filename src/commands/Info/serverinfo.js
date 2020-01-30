const { RichEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "serverinfo",
    aliases: ["server", "si", "serveri", "sinfo"],
    category: "5.1. 📝 | Info",
    description: "Displays information on a the current server",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    premiumOnly: false,
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(!msg.guild.available) return msg.channel.send(`${client.Emojis.x} This server is not available to fetch data from right now. Please try again later`);
        const premium = await client.Models.Premium.findOne({
            guildID: msg.guild.id
        });
        let verifLevel = msg.guild.verificationLevel;
        if(verifLevel == 0) verifLevel = "None";
        if(verifLevel === 1) verifLevel = "Low";
        if(verifLevel === 2) verifLevel = "Medium";
        if(verifLevel === 3) verifLevel = "High";
        if(verifLevel === 4) verifLevel = "Super High";

        const embed = new RichEmbed()
            .setThumbnail(msg.guild.iconURL)
            .setColor("BLUE")
            .addField("Name", `**${msg.guild.name}** | ${msg.guild.id}`)
            .addField("Owner", `${client.users.get(msg.guild.ownerID)} | ${msg.guild.ownerID}`)
            .addField("Member count", `**${msg.guild.members.filter(m => !m.user.bot).size}** humans | **${msg.guild.members.filter(m => m.user.bot).size}** bots (Aprox. **${Math.round(msg.guild.members.filter(m => m.user.bot).size / msg.guild.members.filter(m => !m.user.bot).size)}** bots per member)`)
            .addField("Created at", `**${moment(msg.guild.createdTimestamp).format('MMMM Do YYYY')}** (${moment(msg.guild.createdTimestamp).from(Date.now())})`)
            .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
            .setTimestamp();
            if(premium !== null) {
                embed
                    .addField("Members", `${client.Emojis.dnd} **${msg.guild.members.filter(m => m.user.presence.status === "dnd").size}** | ${client.Emojis.idle} **${msg.guild.members.filter(m => m.user.presence.status === "idle").size}** | ${client.Emojis.online} **${msg.guild.members.filter(m => m.user.presence.status === "online").size}** | ${client.Emojis.offline} **${msg.guild.members.filter(m => m.user.presence.status === "offline").size}** | **${await msg.guild.fetchBans().then(bans => bans.size)}** banned`)
                    .addField("Channels", `**${msg.guild.channels.size}** total channels | **${msg.guild.channels.filter(ch => ch.type === "text").size}** text | **${msg.guild.channels.filter(ch => ch.type === "voice").size}** voice | **${msg.guild.channels.filter(ch => ch.type === "category").size}** categories`)
                    .addField("Roles", `**${msg.guild.roles.size}** (Aprox. **${Math.round(msg.guild.roles.size / msg.guild.members.size)}** roles per member)`)
                    .addField("Region", client.capitalise(msg.guild.region), true)
            };
            embed.addField("Verification level", verifLevel, true);
        msg.channel.send(embed);
    }
};