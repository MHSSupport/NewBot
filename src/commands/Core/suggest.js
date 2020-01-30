const { RichEmbed, WebhookClient } = require("discord.js");

module.exports = {
    name: "suggest",
    aliases: ["sugg"],
    category: "1.1. 🎖️ | Core",
    description: "Suggest something in the current server",
    usage: "[suggestion]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const suggestion = args.join(" ");
        if(!suggestion) return client.Errors.noArgs(msg, "suggest");
        const settings = await client.Models.Suggestions.findOne({
            guildID: msg.guild.id
        });
        if(settings === null || settings.channelID === null) return msg.channel.send(`${client.Emojis.x} Suggestions have not been set up on this server`);
        const premium = await client.Models.Premium.findOne({
            guildID: msg.guild.id
        });
        try {
            const chan = msg.guild.channels.get(settings.channelID);
            const embed = new RichEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL)
                .setDescription(suggestion)
                .setColor(premium !== null && premium.embedColour !== null ? premium.embedColour : "BLUE")
                .setTimestamp();
            const m = await chan.send(embed);
            await m.react("664139017146728469");
            await m.react("655331837014704139");
            await m.react("664138952730607640");
            msg.channel.send(`${client.Emojis.check} Your sugegstion has been sent to ${chan} to be voted on!`);
        } catch(err) {
            client.log(err);
            msg.channel.send(`${client.EMojis.x} Failed to send your suggestion`);
        };
    }
};