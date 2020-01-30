const { RichEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "giveaway",
    aliases: ["g"],
    category: "1.1. 🎖️ | Core",
    description: "Start a giveaway in a channel",
    usage: "[channel] [duration] [amount of winners] [prize]",
    permissions: "MANAGE_ROLES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let channel = client.getChannelTarget(msg, args[0]);
        if(!channel) return client.Errors.invalidArgs(msg, "giveaway");
        let time = args[1];
        if(!time) return client.Errors.invalidArgs(msg, "giveaway");
        let winnerCount = args[2];
        if(!winnerCount || isNaN(winnerCount)) return client.Errors.invalidArgs(msg, "giveaway");
        let prize = args.slice(3).join(" ");
        if(!prize) return client.Errors.invalidArgs(msg, "giveaway");
        
        client.GiveawayManager.start(channel, {
            time: ms(time),
            prize: prize,
            winnerCount: winnerCount,
            messages: {
                giveaway: "🎉 **GIVEAWAY** 🎉",
                giveawayEnded: "🎉 **GIVEAWAY ENDED** 🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to enter!",
                winMessage: "Congratulations, {winners}! You won **{prize}**!",
            }
        })
        msg.channel.send(`${client.Emojis.check} Giveaway started in ${channel} for ${prize} with ${winnerCount} winner(s) and a duration of ${time}!`);
    }
};