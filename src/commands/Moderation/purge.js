module.exports = {
    name: "purge",
    aliases: [],
    category: "6.1. ⚒️ | Moderation",
    description: "Delete an amount of messages from the current channel",
    usage: "[amount]",
    permissions: "MANAGE_MESSAGES",
    clientPerms: "MANAGE_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        let amount = parseInt(args[0], 10);
        if(!amount) return client.Errors.noArgs(msg, "purge");
        if(amount > 100) amount = 100;
        if(amount < 2) amount = 2;
        const fetched = await msg.channel.fetchMessages({ limit: amount });
        msg.channel.bulkDelete(fetched).catch(err => {
            client.log(err);
            return msg.channel.send(`${client.Emojis.x} You can only delete messages that are less than 14 days old!`);
        });
    }
};