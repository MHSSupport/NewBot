const { WebhookClient } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["talk"],
    category: "1.1. 🎖️ | Core",
    description: "Make me say something!",
    usage: "[message]",
    permissions: "MANAGE_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const message = args.join(" ");
        if(!message) return client.Errors.noArgs(msg, "say");
        msg.delete();
        msg.channel.createWebhook(msg.author.username, msg.author.avatarURL).then(async (wh) => {
            const webhook = new WebhookClient(wh.id, wh.token);
            await webhook.send(message);
            webhook.delete();
        });
    }
};