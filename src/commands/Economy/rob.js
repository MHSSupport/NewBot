module.exports = {
    name: "rob",
    aliases: ["steal"],
    category: "2.1. 💰 | Economy",
    description: "Try to steal some coins out of someone's wallet",
    usage: "[member]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let target = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.guild.members.find(m => m.user.tag === args.join(" ")) || msg.guild.members.find(m => m.user.username === args.join(" ")) || msg.member;
        if(!target) return client.Errors.invalidTarget(msg);
        let targetBal = await client.Models.Money.findOne({
            userID: target.user.id
        });
        if(targetBal === null) return msg.channel.send(`${client.Emojis.x} Abort abort!! The target has no money for us to steal!`);
        let authorBal = await client.Models.Money.findOne({
            userID: msg.author.id
        });
        if(authorBal === null || authorBal.coins < 200) return msg.channel.send(`${client.Emojis.x} You do not have enough money to rob anyone yet!`);
        let amount = Math.round(Math.random() * authorBal.coins) + 20;
        let chance = Math.round(Math.random() * 100) * authorBal.multiplier;
        if(targetBal.padlock !== null) {
            authorBal.coins = authorBal.coins - amount;
            await authorBal.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
            targetBal.coins = targetBal + amount;
            await targetBal.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
            msg.channel.send(`${client.Emojis.x} There was a massive padlock on the targets wallet! You were caught and fined ${client.retroCoin}${amount}!`);
        } else if(chance < 70) {
            authorBal.coins = authorBal.coins - amount;
            await authorBal.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
            targetBal.coins = targetBal + amount;
            await targetBal.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
            msg.channel.send(`${client.Emojis.x} You were caught and fined ${client.retroCoin}${amount}!`);
        } else {
            authorBal.coins = authorBal.coins + amount;
            await authorBal.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
            targetBal.coins = targetBal - amount;
            await targetBal.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
            msg.channel.send(`${client.Emojis.etada} Sneaky sneaky. You stole a total of ${client.retroCoin}${amount}!`);
        };
    }
};