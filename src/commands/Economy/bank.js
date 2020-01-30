const { RichEmbed } = require("discord.js");

module.exports = {
    name: "bank",
    aliases: [],
    category: "2.1. 💰 | Economy",
    description: "Get the amount of money in your bank or of another user. Be warned! There is a 20% chance of being caught and fined for peeking into other peoples banks!",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let target = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.guild.members.find(m => m.user.tag === args.join(" ")) || msg.guild.members.find(m => m.user.username === args.join(" ")) || msg.member;
        if(!target) return client.Errors.invalidTarget(msg);
        let bal = await client.Models.Money.findOne({
            userID: target.user.id
        });
        let authorBal = await client.Models.Money.findOne({
            userID: msg.author.id
        });
        if(bal === null) bal = new client.Models.Money({
            userID: target.user.id,
            coins: 0,
            bank: 0,
            securityLevel: 0
        });
        if(authorBal === null) authorBal = new client.Models.Money({
            userID: msg.author.id,
            coins: 0,
            bank: 0,
            securityLevel: 0
        });
        let chance = Math.round(Math.random() * 100);
        if(chance > 80 && target.user.id !== msg.author.id) {
            let fine = chance + 10;
            bal.coins = bal.coins + fine;
            authorBal.coins = authorBal.coins - fine;
            target.send(`${client.Emojis.err} Someone tried to peek in your bank! They paid you ${client.Emojis.retroCoin}${fine}!`);
            msg.channel.send(`${client.Emojis.x} You were caught and fined ${client.Emojis.retroCoin}${fine}!`);
        } else {
            let embed = new RichEmbed()
                .setColor(target.highestRole.color || "BLUE")
                .setAuthor(target.user.tag)
                .setThumbnail(target.user.avatarURL)
                .addField("[WALLET]", bal.coins, true)
                .addField("[BANK]", bal.bank, true)
                //.addField("[SECURITY]", authorBal.securityLevel)
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL)
                .setTimestamp();
            msg.channel.send(embed);
        };
    }
};