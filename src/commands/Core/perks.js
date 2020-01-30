const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "perks",
    aliases: ["premium"],
    category: "1.1. 🎖️ | Core",
    description: "Check the perks for becoming a premium subscriber!",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    premiumOnly: false,
    run: async (client, { channel }, args) => {
        const embed = new RichEmbed()
            .setAuthor(`${client.user.username} Premium Perks`)
            .setColor("#E6EE9C")
            .setThumbnail(client.premiumImage)
            .setDescription(stripIndents`
                ${client.Emojis.check}**Reduced bump timeout**
                ${client.Emojis.check}**Be able to suggest additions to the bot with more chance of them being added!**
                ${client.Emojis.check}**Extended information when using userinfo**
                ${client.Emojis.check}**Be able to track the amount of messages per member of your server**
                ${client.Emojis.check}**More information for the serverinfo command!**
            `)
            .setTimestamp();
        channel.send(embed);
    }
};