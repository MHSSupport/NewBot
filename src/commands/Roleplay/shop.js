const { RichEmbed } = require("discord.js");

module.exports = {
    name: "shop",
    aliases: ["store"],
    category: "9.1. 🏹 | Roleplay",
    description: "Shows all availible items to buy with a description and price",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: false,
    run: async (client, msg, args) => {
        const embed = new RichEmbed()
            .setColor("BLUE")
            client.store.shop.map(item => embed.addField(`**${item.name}:**`, `${item.desc} | **${client.Emojis.retroCoin}${item.price}**`));
        msg.channel.send(embed);
    }
};