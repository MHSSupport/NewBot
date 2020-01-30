const { RichEmbed } = require("discord.js");

module.exports = {
    name: "leaderboard",
    aliases: ["lb", "ranks"],
    category: "3.1. 🎲 | Entertainment",
    description: "Get the top ten members with the most levels in the server",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let counts = await client.Models.Xp.find({
            guildID: msg.guild.id
        });
        if(counts === null) return msg.channel.send(`${client.Emojis.x} There are no logged counts in the database`);
        let sorted = await counts.sort();
        sorted.reverse();
        let embed = new RichEmbed()
            .setColor(msg.guild.me.highestRole.color ? msg.guild.me.highestRole.color : "BLUE")
            .setFooter(`Requested by ${msg.author.tag}`);
        let content = "";
        for(let i = 0; i < 10 && i < sorted.length; i++) {
            content += `**${i + 1}** - ${client.users.get(sorted[i].userID).tag}: ${sorted[i].level}\n`;
        };
        embed.setDescription(content !== "" ? content : "There is no one in the leaderboard!");
        msg.channel.send(embed);
    }
};