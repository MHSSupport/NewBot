const { RichEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "1.1. 🎖️ | Core",
    description: "Displays the latency for the bot",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let m = await msg.channel.send("Pong!");
        let embed = new RichEmbed()
            .setColor(msg.guild.me.highestRole.color || "BLUE")
            .addField("Latency", `${m.createdTimestamp - msg.createdTimestamp}ms`, true)
            .addField("API Latency", `${Math.round(client.ping)}ms`, true)
            .setThumbnail(client.user.avatarURL);
        m.edit(embed);
    }
};