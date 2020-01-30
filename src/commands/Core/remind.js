const ms = require("ms");

module.exports = {
    name: "remind",
    aliases: [],
    category: "1.1. 🎖️ | Core",
    description: "Set something for me to remind you about after a certain amount of time",
    usage: "[timeout] [reminder]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const time = args[0];
        if(!time || !ms(time)) return client.Errors.invalidArgs(msg, "remind");
        const reminder = args.slice(1).join(" ");
        if(!reminder) return client.Errors.invalidArgs(msg, "remind");
        msg.channel.send(`${client.Emojis.check} Set a reminder for: ${reminder}. I will remind you in **${time}**!`);
        setTimeout(function() {
            msg.author.send(`Heya! Just came to remind you about: **${reminder}**!`);
        }, ms(time));
    }
};