const { Utils } = require("erela.js");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "play",
    aliases: ["p"],
    category: "7.1. 🔊 | Music",
    description: "Play a song!",
    usage: "[query | url]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SPEAK",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const { voiceChannel } = msg.member;
        if (!voiceChannel) return msg.channel.send(`${client.Emojis.x} You need to be in a voice channel to play music!`);

        const permissions = voiceChannel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return msg.channel.send(`${client.Emojis.x} I cannot connect to your voice channel, make sure I have permission to!`);
        if (!permissions.has("SPEAK")) return msg.channel.send(`${client.Emojis.x} I cannot connect to your voice channel, make sure I have permission to!`);

        if (!args[0]) return msg.channel.send(`${client.Emojis.x} Please provide a song name or link to search!`);

        const player = client.music.players.spawn({
            guild: msg.guild,
            textChannel: msg.channel,
            voiceChannel
        });

        client.music.search(args.join(" "), msg.author).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    // msg.channel.send(`${client.Emojis.generating} Enqueuing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``).then(m => m.delete(3000));
                    if (!player.playing) player.play()
                    break;
                
                case "SEARCH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5);
                    const embed = new RichEmbed()
                        .setAuthor("Song Selection.", msg.author.displayAvatarURL)
                        .setColor("BLUE")
                        .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                        .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");
                    await msg.channel.send(embed);

                    const collector = msg.channel.createMessageCollector(m => {
                        return m.author.id === msg.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                    }, { time: 30000, max: 1});

                    collector.on("collect", m => {
                        if (/cancel/i.test(m.content)) return collector.stop(`${client.Emojis.x} Cancelled`)

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)
                        // msg.channel.send(`${client.Emojis.generating} Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``).then(m => m.delete(3000));
                        if(!player.playing) player.play();
                    });

                    collector.on("end", (_, reason) => {
                        if(["time", "cancelled"].includes(reason)) return msg.channel.send(`${client.Emojis.generating} Cancelled selection`)
                    });
                    break;

                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true);
                    // msg.channel.send(`${client.Emojis.generating} Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``).then(m => m.delete(3000));
                    if(!player.playing) player.play()
                    break;
            }
        }).catch(err => {
            client.log(err);
            return client.Errors.unknownErr(msg, err);
        });
    }
};