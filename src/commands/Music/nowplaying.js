const { Utils } = require("erela.js");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "currenttrack", "current"],
    category: "7.1. 🔊 | Music",
    description: "Check what the current song is",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const player = client.music.players.get(msg.guild.id);
        if (!player || !player.queue[0]) return msg.channel.send(`${client.Emojis.x} No songs currently playing within this server!`);
        const { title, author, duration, thumbnail } = player.queue[0];

        const embed = new RichEmbed()
            .setColor("BLUE")
            .setThumbnail(thumbnail)
            .setDescription(`${player.playing ? "▶️" : "⏸️"} **${title}** (\`${Utils.formatTime(duration, true)}\`) by ${author}`);
        return msg.channel.send(embed);
    }
};