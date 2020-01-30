const { RichEmbed } = require("discord.js");

module.exports = {
    name: "rich",
    aliases: ["richest"],
    category: "2.1. 💰 | Economy",
    description: "Get a list of the users with the most cash",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let counts = await client.Models.Money.find();
        if(counts === null) return msg.channel.send(`${client.Emojis.x} There are no logged counts in the database`);
        let sorted = await counts.sort(counts.coins);
        sorted.reverse();
        let embed = new RichEmbed()
            .setColor(msg.guild.me.highestRole.color ? msg.guild.me.highestRole.color : "BLUE")
            .setFooter(`Requested by ${msg.author.tag}`);
        let content = "";
        for(let i = 0; i < 10 && i < sorted.length; i++) {
            content += `**${i + 1}** - ${client.users.get(sorted[i].userID).tag}: ${sorted[i].coins}\n`;
        };
        embed.setDescription(content);
        msg.channel.send(embed);
    }
};