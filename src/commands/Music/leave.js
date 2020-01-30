module.exports = {
    name: "leave",
    aliases: ["stop"],
    category: "7.1. 🔊 | Music",
    description: "Stop the music playing",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const { voiceChannel } = msg.member;
        const player = client.music.players.get(msg.guild.id);
        if(!player) return msg.channel.send(`${client.Emojis.x} No songs currently playing in this server!`);
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.channel.send(`${client.Emojis.x} You need to be in the same voice channel as me to use the leave command!`);

        client.music.players.destroy(msg.guild.id);
        return msg.channel.send(`${client.Emojis.check} Successfully stopped the music!`);
    }
};