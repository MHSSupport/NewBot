const { RichEmbed } = require("discord.js");

module.exports = {
    name: "backpack",
    aliases: ["inventory", "bp"],
    category: "9.1. 🏹 | Roleplay",
    description: "See your inventory. You cannot peek at other peoples inventory",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    run: async (client, msg, args) => {
        const inv = await client.Models.Profile.findOne({
            userID: msg.author.id
        });
        if(inv === null || inv.inventory === null) return msg.channel.send(new RichEmbed()
                .setDescription(`${client.Emojis.x} You have nothing in your inventory!`)
                .setColor("RED"));
        const embed = new RichEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setColor(msg.member.highestRole.color ? msg.member.highestRole.color : "BLUE")
            .setDescription(inv.inventory.map(i => `**${i.name}** | Worth: ${i.price}`))
            .setTimestamp();
        
        msg.channel.send(embed);
    }
};