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
        const { title, author, duration, thumbnail, requester } = player.queue[0];
          
        function getnowplaying(){
            let amount = `00:${Utils.formatTime(player.position, true)}`
            const part = Math.floor((player.position / duration) * 10);
            const giveEmbed = new RichEmbed()
                .setColor("AQUA")
                .setDescription(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`)

            msg.channel.send({embed: giveEmbed}).then(m => {
                const counter = setInterval(() => {
                    if(player.playing !== true){
                        clearInterval(counter);
                    };

                    if(player.position < 60000) {
                        if(player.position > 5000){
                            if(player.playing === true){
                                let { title, author, duration, thumbnail, requester } = player.queue[0];
                                let amount = `00:${Utils.formatTime(player.position, true)}`;
                                const part = Math.floor((player.position / duration) * 10);
                                giveEmbed.setDescription(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`);
                            };
                        };
                    } else {
                        if(player.playing === true){
                            let { title, author, duration, thumbnail, requester } = player.queue[0];
                            const amount = `${Utils.formatTime(player.position, true)}`;
                            const part = Math.floor((player.position / duration) * 10);
                            try{
                                giveEmbed.setDescription(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(9 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`);
                            } catch(err) {
                                client.log(err);
                            };
                        };
                    };
                    m.edit(giveEmbed);
                }, 10000);
            });
        };
        getnowplaying();
    }
};