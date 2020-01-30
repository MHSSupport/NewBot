module.exports = {
    name: "deposit",
    aliases: ["dep"],
    category: "2.1. 💰 | Economy",
    description: "Deposit some money into your bank. No one can easily see the amount of coins in your bank",
    usage: "[amount | all]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let bal = await client.Models.Money.findOne({
            userID: msg.author.id
        });
        if(bal === null) bal = new client.Models.Money({
            userID: msg.author.id,
            coins: 0,
            bank: 0,
            securityLevel: 0
        });
        let amount = args[0];
        if(bal.coins < 1) return msg.channel.send(`${client.Emojis.x} You have no money to deposit!`);
        if(amount.toLowerCase() !== "all" && isNaN(amount)) return client.Errors.noArgs(msg);
        if(amount.toLowerCase() === "all") amount = bal.coins;
        
        bal.coins = bal.coins - Number(amount);
        bal.bank = bal.bank + Number(amount);

        await bal.save().catch(err => {
            client.log(err);
            client.Errors.saveFail(msg);
            return;
        });

        msg.channel.send(`${client.Emojis.check} Deposited ${client.Emojis.retroCoin}${amount}!`);
    }
};