const { Utils } = require("erela.js");
const { RichEmbed,Collection } = require("discord.js");

module.exports = {
    name: "shuffle",
    aliases: [],
    category: "7.1. 🔊 | Music",
    description: "Shuffle the queue",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const player = client.music.players.get(msg.guild.id);
        player.queue.shuffle();
        msg.channel.send(`${client.Emojis.check} Shuffled the queue!`);
    }
}