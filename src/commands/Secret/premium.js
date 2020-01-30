const { RichEmbed } = require("discord.js");

module.exports = {
    name: "pre",
    aliases: [],
    category: "9.2. ㊙️ | Secret",
    description: "[REDACTED]",
    usage: "[REDACTED]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: true,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const option = args[0];
        const guildID = args[1];
        if(!option || !guildID) return client.Errors.noArgs(msg, "premium");
        const guild = client.guilds.get(guildID);
        if(!guild) return msg.channel.send(`${client.Emojis.x} I cannot find that guild!`);

        if(option.toLowerCase() === "add") {
            if(await client.Models.Premium.findOne({ guildID: guildID }) !== null) return msg.channel.send(`${client.Emojis.x} That guild already has premium!`);
            const premium = new client.Models.Premium({
                guildID: guild.id
            });
            premium.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Successfully added premium to **${guild.name}** (\`${guild.id}\`)`);
            try {
                const embed = new RichEmbed()
                    .setColor("BLUE")
                    .setDescription(`${client.Emojis.etada} Congrats!! Your server (**${guild.name}**) just got premium! Be sure to [join the support server](${client.supportInvite}) for even more perks or just to see what your perks are! Thank you for supporting NewBot ${client.Emojis.cuteHeart}`)
                    .setFooter(`This was an automatic message sent by ${client.user.tag} and was triggered by ${client.creator.tag} runnning the premium command`)
                client.users.get(guild.ownerID).send(embed);
            } catch(err) {
                client.log(err);
            };
        } else if(option.toLowerCase() === "remove" || option.toLowerCase() === "rem") {
            if(await client.Models.Premium.findOne({ guildID: guildID }) === null) return msg.channel.send(`${client.Emojis.x} That guild does not have premium!`);
            try {
                await client.Models.Premium.findOneAndDelete({
                    guildID: guild.id
                });
            } catch(err) {
                client.log(err);
                return msg.channel.send(`${client.Emojis.x} Failed to delete premium document!`);
            };
            msg.channel.send(`${client.Emojis.check} Successfully removed premium from **${guild.name}** (\`${guild.id}\`)`);
        } else return client.Errors.invalidArgs(msg, "premium");
    }
};