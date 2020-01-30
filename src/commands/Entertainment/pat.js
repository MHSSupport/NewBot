const { RichEmbed } = require("discord.js");

module.exports = {
    name: "pat",
    aliases: [],
    category: "3.1. 🎲 | Entertainment",
    description: "pat someone.. or yourself",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(true, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);
        
        const gifs = ["https://media.giphy.com/media/ye7OTQgwmVuVy/giphy.gif", "https://media.giphy.com/media/ZIdKVTwUVIErC/giphy.gif", "https://media.giphy.com/media/4HP0ddZnNVvKU/giphy.gif", "https://media.giphy.com/media/L2z7dnOduqEow/giphy.gif", "https://media.giphy.com/media/3oFzmm13V0h44D61bi/giphy.gif", "https://media.giphy.com/media/82YkzGpzlJglTVqbDq/giphy.gif", "https://media.giphy.com/media/6Uhw9V8w8TEBy/giphy.gif", "https://media.giphy.com/media/xUA7bahIfcCqC7S4qA/giphy.gif"];
        const gif = Math.floor(Math.random() * gifs.length);
        const embed = new RichEmbed()
            .setColor(target.highestRole.color ? target.highestRole.color : "RANDOM")
            .setAuthor(`${msg.member.displayName} gave ${target.displayName === msg.member.displayName ? "themself" : target.displayName} a pat!`)
            .setImage(gifs[gif])
            .setTimestamp();
        msg.channel.send(embed);
    }
};