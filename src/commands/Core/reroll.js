module.exports = {
    name: "reroll",
    aliases: ["rr"],
    category: "1.1. 🎖️ | Core",
    description: "Reroll a giveaway using the message ID",
    usage: "[message ID]",
    permissions: "MANAGE_ROLES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const messageID = args[0];
        if(!args[0]) return client.Errors.noArgs(msg, "reroll");
        client.GiveawayManager.reroll(messageID).then(() => {
            message.channel.send(`${client.Emojis.check} Success! Giveaway rerolled!`);
        }).catch((err) => {
            client.log(err);
            message.channel.send(`${client.Emojis.x} No giveaway found for ${messageID}, please check and try again`);
        });
    }
};