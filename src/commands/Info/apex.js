const API = require("apextab-api"), ApexTab  = API.Apextab_API;

module.exports = {
    name: "apex",
    aliases: ["apec"],
    category: "5.1. 📝 | Info",
    description: "Get info on a psecific apex user",
    usage: "[user] [platform]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(!args[0]) return client.Errors.noArgs(msg, "apex");
        if(!args[1]) return client.Errors.invalidArgs(msg, "apex");

        const platformCheck = { pc: API.Platform.PC, xbox: API.Platform.XBOX_ONE, ps4: API.Platform.PS4 };
        const platform = platformCheck[args[1].toLowerCase()];

        try {
            const results = await ApexTab.searchPlayer(args[0], platform ? platform : API.Platform.PC)
                for (let playerResult of results.results) {
                    const player = await ApexTab.getPlayerById(playerResult.aid)
                    const { name, skillratio, visits, avatar, legend, level, kills, headshots, matches, globalrank, utime } = player;

                    const embed = new RichEmbed()
                        .setColor(msg.member.highestRole.color ? msg.member.highestRole.color : msg.guild.me.highestRole.color ? msg.guild.me.highestRole.color : "BLUE")
                        .setAuthor(`Origin (Apex Legends) | ${name}`, avatar)
                        .setThumbnail(avatar)
                        .setDescription(`**Active Legend:** ${legend || "Not Found."}\n**Global Rank:** ${globalrank || "Not Ranked."}\n**level:** ${level || 0}\n**Skill Ratio:** ${skillratio || "0%"}\n**Matches:** ${matches || 0}\n**Kills:** ${kills || 0}\n**Headshots:** ${headshots || 0}\n**Visits:** ${visits || 0}\n**PlayTime:** ${Math.ceil(utime / (1000 * 60 * 60 * 24)) || 0} days`)
                        .setTimestamp()
                    msg.channel.send(embed)
                };
        } catch(err) {
            return msg.channel.send(`${client.Emojis.x} I couldn't find a user`)
        };
    }
};