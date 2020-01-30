module.exports = {
    name: "pause",
    aliases: ["unpause", "resume"],
    category: "7.1. 🔊 | Music",
    description: "Pause or unpause the music!",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const { voiceChannel } = msg.member;
        const player = client.music.players.get(msg.guild.id);
        if(!player) return msg.channel.send(`${client.Emojis.x} There is nothing playing!`);
        if(voiceChannel.id !== player.voiceChannel.id || !voiceChannel) return msg.channel.send(`${client.Emojis.x} You are not in the same voice channel as me!`);

        player.pause(player.playing)
        return msg.channel.send(`${client.Emojis.check} The queue is now **${player.playing ? "resumed" : "paused"}**!`);
    }
};