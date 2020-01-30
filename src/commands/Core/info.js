const { RichEmbed } = require("discord.js");

module.exports = {
    name: "info",
    aliases: ["botinfo", "stats"],
    category: "1.1. 🎖️ | Core",
    description: "View information on the bot",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    run: async (client, msg, args) => {
        const m = await msg.channel.send(`${client.Emojis.loading} Retrieving data...`)
        const secs = Math.round((client.uptime / 1000) % 60).toString();
        if(secs === "00") secs = "0";
        const mins = Math.round((client.uptime / (1000 * 60)) % 60).toString();
        if(mins === "00") mins = "0";
        const hours = Math.round((client.uptime / (1000 * 60 * 60)) % 60).toString();
        if(hours === "00") hours = "0";
        const days = Math.round((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString();

        const bans = await client.Models.Bans.findOne({
            botID: client.user.id
        });
        const embed = new RichEmbed()
            .setAuthor(client.user.username)
            .setThumbnail(client.user.avatarURL)
            .setColor(msg.guild.me.highestRole.color ? msg.guild.me.highestRole.color : "BLUE")
            .addField("Uptime", `**${days}** days, **${hours}** hours, **${mins}** minutes, **${secs}** seconds`, true)
            .addField("Total bans", `**${bans ? bans.count : 0}** bans (Aprox. **${Math.round((bans ? bans.count : 0) / client.guilds.size)}** bans per guild)`, true)
            .addField("Ping", `Latency: **${m.createdTimestamp - msg.createdTimestamp}**ms | API Latency: **${Math.round(client.ping)}**ms`, true)
            .addField("Total channels", `**${client.channels.size}** channels (Aprox. **${client.channels.size / client.guilds.size}** channels per guild)`, true)
            .addField("Total guilds", `**${client.guilds.size}** guilds (Aprox. **${Math.round(client.commands.size / client.guilds.size)}** commands per guild)`, true)
            .addField("Total users", `**${client.users.size}** users (Aprox. **${Math.round(client.users.size / client.guilds.size)}** users per guild and **${Math.round(client.users.size / client.channels.size)}** users per channel)`, true)
            .addField("Total commands", `**${client.commands.size}** commands (Aprox. **${Math.round(client.aliases.size / client.commands.size)}** aliases per command)`, true)
            .addField("Support", `Get support **[in the support server](${client.supportInvite})** or **[on the website](${client.websiteLink})**`, true)
            .addField("Total emojis", `**${client.emojis.size}** (Aprox. **${Math.round(client.emojis.size / client.guilds.size)}** emojis per guild)`, true)
            .setFooter(`Created by ${client.creator.tag}`, client.users.get(client.creator.id).avatarURL)
            .setTimestamp();
        m.edit(embed);
    }
};