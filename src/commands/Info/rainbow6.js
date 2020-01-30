const { stripIndents } = require("common-tags");
const { RichEmbed } = require("discord.js");
const R6API = require("r6api.js");
const { getId, getLevel, getRank, getStats } = new R6API(process.env.UBISOFT_EMAIL, process.env.UBISOFT_PASSWORD);

module.exports = {
    name: "rainbow6",
    aliases: ["r6"],
    category: "5.1. 📝 | Info",
    description: "",
    usage: "[user] <platform> <region>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const platforms = { pc: "UPLAY", xbox: "XBL", ps4: "PSN" };
        const regions = { eu: "emea", na: "ncsa", as: "apac" };

        let player, platform, region;
        
        if (args.length < 1) return client.Errors.noArgs(msg, "rainbow6");
        else player = args[0];

        args[1] && [ "pc", "xbox", "ps4" ].includes(args[1].toLowerCase()) ? platform = platforms[args[1].toLowerCase()] : platform = platforms["pc"];
        args[2] && [ "eu", "na", "as" ].includes(args[2].toLowerCase()) ? region = regions[args[2].toLowerCase()] : region = regions["eu"];
        if(platform === "XBL") player = player.replace("_", " ");

        player = await getId(platform, player);
        if(!player.length) return msg.channel.send(`${client.Emojis.x} I could not find any results for that user!`);
        player = player[0];

        const playerRank = await getRank(platform, player.id);
		const playerStats = await getStats(platform, player.id);
        const playerGame = await getLevel(platform, player.id);
        if (!playerRank.length || !playerStats.length || !playerGame.length) return msg.channel.send(`${client.Emojis.x} I was unable to fetch some of the data. Try again!`);

        const { current, max, lastMatch } = playerRank[0].seasons[Object.keys(playerRank[0].seasons)[0]].regions[region];
		const { pvp, pve } = playerStats[0];
        const { level, xp } = playerGame[0];
        platform = Object.keys(platforms).find(key => platforms[key] === platform).toUpperCase();
        region = Object.keys(regions).find(key => regions[key] === region).toUpperCase();
        
        const embed = new RichEmbed()
            .setColor("BLUE")
            .setAuthor(player.username, bot.user.displayAvatarURL)
            .setDescription(`Stats for the **${region}** region on ${platform}.`)
            .setThumbnail(current.image)
            .addField("General:", stripIndents`
                **Level:** ${level} (${xp} xp)
                **Rank:** ${current.name} (Max: ${max.name})
                **MMR:** ${current.mmr}`)
            .addField("Statistics:", stripIndents`
                **Wins:** ${pvp.general.wins} 
                **Losses:** ${pvp.general.losses}
                **Win/Loss Ratio:** ${(pvp.general.wins /  pvp.general.matches * 100).toFixed(2)}%
                **Kills:** ${pvp.general.kills}
                **Deaths:** ${pvp.general.deaths}
                **Kills/Deaths Ratio:** ${(pvp.general.kills / pvp.general.deaths).toFixed(2)}
                **Playtime:** ${Math.round(pvp.general.playtime / 3600)} hours`)
            .addField("Terroist Hunt:", stripIndents`
                **Wins:** ${pve.general.wins} 
                **Losses:** ${pve.general.losses}
                **Win/Loss Ratio:** ${(pve.general.wins / pve.general.matches * 100).toFixed(2)}%
                **Kills:** ${pve.general.kills} 
                **Deaths:** ${pve.general.deaths}
                **Kills/Deaths Ratio:** ${(pve.general.kills / pve.general.deaths).toFixed(2)}
                **Playtime:** ${Math.round(pve.general.playtime / 3600)} hours`)
            .setFooter(`Requested by ${msg.author.tag}`);
        msg.channel.send(embed).catch(err => {
            client.log(err);
            return client.Errors.unknownErr(msg, err);
        });
    }
};