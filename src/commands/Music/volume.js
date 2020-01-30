module.exports = {
    name: "volume",
    aliases: ["vol"],
    category: "7.1. 🔊 | Music",
    description: "Change the volume or check the current volume",
    usage: "<input>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const player = client.music.players.get(msg.guild.id);
        if(!player) return msg.channel.send(`${client.Emojis.x} There is nothing playing!`);
        const { voiceChannel } = msg.member;
        if(voiceChannel.id !== player.voiceChannel.id || !voiceChannel) return msg.channel.send(`${client.Emojis.x} You are not in the same voice channel as me!`);
        if(!args[0]) return msg.channel.send(`Current volume: **${player.volume}**`);
        if(Number(args[0]) <= 0) return msg.channel.send(`${client.Emojis.x} You connat set the volume to 0! Try using the \`leave\` command to make me stop!`);
        if(Number(args[0]) > 100) return msg.channel.send(`${client.Emojis.x} You may not set the volume to more than 100!`);

        player.setVolume(Number(args[0]));
        return msg.channel.send(`${client.Emojis.check} Changed the volume to **${args[0]}**!`);
    }
};