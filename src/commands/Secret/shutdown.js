const { RichEmbed } = require("discord.js");

module.exports = {
    name: "shutdown",
    aliases: [],
    category: "9.2. ㊙️ | Secret",
    description: "[REDACTED]",
    usage: "[REDACTED]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: true,
    run: async (client, msg, args, config, errors, customEmojis) => {
        try {
            await msg.channel.send(`Goodbye world.`);
            process.exit();
        } catch(err) {
            client.log(err);
            let embed = new RichEmbed()
                .setColor("RED")
                .addField("[ERROR]", err.message)
                .setFooter(`Whoopsies`)
                .setTimestamp();
            msg.channel.send(embed);
        };
    }
};