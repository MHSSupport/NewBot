const { RichEmbed } = require("discord.js");
const cooldown = new Set();

module.exports = {
    name: "botsuggest",
    aliases: ["bs", "bots", "bsuggest"],
    category: "1.1. 🎖️ | Core",
    description: "Suggest something to be added to the bot from any server the bot is in. This is premium only. If you do not have premium and want to suggest something you will need to join the support server",
    usage: "[suggestion]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: true,
    run: async (client, msg, args) => {
        const suggestion = args.join(" ");
        if(!suggestion) return client.Errors.noArgs(msg, "botsuggest");
        const timeout = 43200000;
        const embed = new RichEmbed()
            .setAuthor(`${msg.author.tag} | ${msg.author.id}`, msg.author.avatarURL)
            .setColor("BLUE")
            .setDescription(suggetsion)
            .setFooter(`A suggestion from ${msg.guild.name}`, msg.guild.iconURL)
            .setTimestamp()
        client.users.get(client.creator.id).send(embed);
        msg.channel.send(`${client.Emojis.check} Thank you **${msg.author.username}**#${msg.author.disriminator} for suggestions improvement to the bot! You can suggest again in **12 hours**!`);
        cooldown.add(msg.author.id);
        setTimeout(function() {
            cooldown.delete(msg.author.id);
        }, timeout);
    }
};