const fortnite = require("simple-fortnite-api"), fnClient = new fortnite("46021373-290a-4341-a61a-6fb1737c2c39");
const { stripIndents } = require("common-tags");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "fortnite",
    aliases: ["fn"],
    category: "5.1. 📝 | Info",
    description: "Get stats on a fortnite user",
    usage: "[game type] [user]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(args.length < 1) return client.Errors.noArgs(msg, "fortnite");
        let gametype;
        if(!["lifetime", "solo", "duo", "squad"].includes(args[0].toLowerCase())) gametype = "lifetime";
        else gametype = args[0].toLowerCase();
        try {
            let data = await fnClient.find(args.slice(1).join(" "));
            if(data && data.code === 404) return msg.channel.send(`${client.Emojis.x} Unable to find a user with that username`);
            const { image, url, username } = data;
            const { scorePerMin, winPercent, kills, score, wins, kd, matches } = data[gametype];

            const embed = new RichEmbed()
                .setColor("BLUE")
                .setAuthor(`Epic Games (Fortnite) | ${username}`, image)
                .setThumbnail(image)
                .setDescription(stripIndents`**Gamemode:** ${gametype.slice(0, 1).toUpperCase() + gametype.slice(1)}
                    **Kills:** ${kills || 0}
                    **Score:** ${score || 0}
                    **Score Per Min:** ${scorePerMin || 0}
                    **Wins:** ${wins || 0}
                    **Win Ratio:** ${winPercent || "0%"}
                    **Kill/Death Ratio:** ${kd || 0}
                    **Matches Played:** ${matches || 0}
                    **Link:** [Link to profile](${url.replace(" ", "%20")})`)
                .setFooter(`Requested by ${msg.author.tag}`);
            msg.channel.send(embed);
        } catch(err) {
            client.log(err);
            return client.Errors.unknownErr(msg, err);
        };
    }
};