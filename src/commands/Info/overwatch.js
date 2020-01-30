const overwatch = require("overwatch-api");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "overwatch",
    aliases: ["ovw", "overw", "owatch", "ow"],
    category: "5.1. 📝 | Info",
    description: "Get stats on an Overwatch user",
    usage: "[user] [platform]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(!args[0]) return client.Errors.noArsg(msg, "overwatch");
        if(!args[1] || (args[1] && !["pc", "xbl", "psn"].includes(args[1]))) return message.channel.send("Please supply a platform to check. `pc`, `xbox` or `psn`");
        if(args[0].includes("#")) args[0] = args[0].replace(/#/g, "-");
        overwatch.getProfile(args[1], "global", args[0], (err, json) => {
            if (err) return message.channel.send("Unable to find a user with that username.");
            const { games, level, portrait, username, playtime: { competitive, quickplay }, private } = json;
            const { sportsmanship, shotcaller, teammate } = json.endorsement;
            const { won, draw, played, lost, win_rate } = json.games.competitive;

            if(private) return msg.channel.send(`${client.Emojis.x} This users stats are private and cant be seen by anyone.`);
                    
            const embed = new RichEmbed()
                .setColor(cyan)
                .setAuthor(`Blizzard (Overwatch) | ${username}`, portrait)
                .setThumbnail(portrait)
                .addField("General:", stripIndents`
                    **Level:** ${level || 0}
                    **Sportsmanship:** ${sportsmanship.rate || 0} / 100
                    **Shotcaller:** ${shotcaller.rate || 0} / 100
                    **Teammate:** ${teammate.rate  || 0} / 100
                    `)
                .addField("Competitive:", stripIndents`
                    **Played:** ${played || 0}
                    **Won:** ${won || 0}
                    **Draw:** ${draw || 0}
                    **Lost:** ${lost || 0}
                    **Win Rate:** ${win_rate || 0}
                    **Playtime:** ${competitive || 0}
                    `, true)
                .addField("QuickPlay:", stripIndents`
                    **Played:** ${games.quickplay.played || "N/A"}
                    **Won:** ${games.quickplay.won || 0}
                    **Playtime:** ${quickplay || 0}
                    `, true)
                .setFooter(`Requested ${msg.author.tag}`);

            msg.channel.send(embed);
                    
        })
    }
};