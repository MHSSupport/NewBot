module.exports = {
    name: "buy",
    aliases: [],
    category: "9.1. 🏹 | Roleplay",
    description: "Buy an item from the shop",
    usage: "[item]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: false,
    run: async (client, msg, args) => {
        if(args[0] && !["pickaxe", "spade", "apple", "horse", "ring"].includes(args[0].toLowerCase())) return msg.channel.send(`${client.Emojis.x} You need to supply a valid item to buy!`);
        const item = args[0].toLowerCase();
        const bal = await client.Models.Money.findOne({
            userID: msg.author.id
        });
        if(bal === null || bal.coins === null || !bal.coins) return msg.channel.send(`${client.Emojis.x} You don't have any money!`);
        let inv = await client.Models.Profile.findOne({
            userID: msg.author.id
        });
        if(inv !== null && inv.inventory !== null && inv.inventory.length > 10) return msg.channel.send(`${client.Emojis.x} Your backpack is full! You can't carry any more items until you get rid of some!`);
        for(i of client.store.shop) {
            if(i.name.toLowerCase() === item) {
                if(i.price > bal.coins) return msg.channel.send(`${client.Emojis.x} You do not have enough money in your wallet to purchase that!`);
                bal.coins = bal.coins - i.price;
                if(inv === null || inv.inventory === null) {
                    inv = new client.Models.Profile({
                        userID: msg.author.id,
                        inventory: [{
                            name: i.name,
                            price: i.price / 2,
                        }]
                    });
                } else {
                    inv.inventory.push({
                        name: i.name,
                        price: i.price / 2,
                    });
                };
                await bal.save().catch(err => {
                    client.log(err);
                    return client.Errors.saveFail(msg);
                });
                await inv.save().catch(err => {
                    client.log(err);
                    return client.Errors.saveFail(msg);
                });
                msg.channel.send(`${client.Emojis.etada} You have bought ${i.name} for ${client.Emojis.retroCoin}${i.price}!`);
            };
        };
    }
};