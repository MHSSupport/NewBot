const { RichEmbed } = require("discord.js");

module.exports = {
    name: "hug",
    aliases: ["huggie"],
    category: "3.1. 🎲 | Entertainment",
    description: "Give someone a hug!",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const target = client.getMember(true, args.join(" "), msg);
        if(!target) return client.Errors.invalidTarget(msg);

        const gifs = ["https://media.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif", "https://media.giphy.com/media/EvYHHSntaIl5m/giphy.gif", "https://media.giphy.com/media/3M4NpbLCTxBqU/giphy.gif", "https://media.giphy.com/media/yidUzriaAGJbsxt58k/giphy.gif", "https://media.giphy.com/media/4No2q4ROPXO7T6NWhS/giphy.gif", "https://media.giphy.com/media/diAhf8bYer76E/giphy.gif"];
        const gif = Math.floor(Math.random() * gifs.length);
        const embed = new RichEmbed()
            .setColor(target.highestRole.color ? target.highestRole.color : "RANDOM")
            .setAuthor(`${msg.member.displayName} gave ${target.displayName === msg.member.displayName ? "themself" : target.displayName} a nice warm hug!`)
            .setImage(gifs[gif])
            .setTimestamp();
        msg.channel.send(embed);
    }
};