let cooldown = new Set();
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "bump",
    aliases: ["bmul", "bumo", "buml", "bum", "bup"],
    category: "1.1. 🎖️ | Core",
    description: "Bump your server to other servers!",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    cooldown: 30,
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        if(cooldown.has(msg.guild.id)) return client.Errors.cooldown(msg);
        const settings = await client.Models.Bumps.findOne({
            guildID: msg.guild.id
        });
        if(settings === null || settings.inviteURL === null || settings.description === null) return msg.channel.send(`${client.Emojis.x} This server hasn't been setup for bumping! The minimun requirements are a description + invite set!`);
        const premium = await client.Models.Premium.findOne({
            guildID: msg.guild.id
        });
        let timeout = 7200000;
        if(settings.bumpChannelID !== null) {
            chan = msg.guild.channels.get(settings.bumpChannelID);
            if(chan) {
                timeout = 3600000;
            };
        };
        if(premium !== null) {
            timeout = 1800000;
        };
        const startEmbed = new RichEmbed()
            .setDescription(`${client.Emojis.generating} Bumping now...`)
            .setColor(client.Colours.YELLOW);
        const m = await msg.channel.send(startEmbed);
        const embed = new RichEmbed()
            .setAuthor("Server Bumped!")
            .setColor(premium !== null && premium.embedColour !== null ? premium.embedColour : "RANDOM")
            .setThumbnail(msg.guild.iconURL)
            .addField("Name", msg.guild.name, true)
            .addField("Members", msg.guild.members.size, true)
            .addField("Description", settings.description)
            .setFooter(`Bumped by ${msg.author.tag}`, msg.author.avatarURL)
            .setTimestamp();
        await client.guilds.map(async guild => {
            const settings = await client.Models.Bumps.findOne({
                guildID: guild.id
            });
            if(settings !== null && settings.bumpChannelID !== null) {
                const chan = guild.channels.get(settings.bumpChannelID);
                if(chan) {
                    try {
                        chan.send(embed);
                    } catch(err) {
                        client.log(err);
                    };
                };
            };
        });
        const endEmbed = new RichEmbed()
            .setColor("GREEN")
            .setDescription(stripIndents`┏  ━  ━  ━  ━  ━  ┓
                ∴**Oasis Advertising**∴
                ┗  ━  ━  ━  ━  ━  ┛
                Looking for somewhere to advertise easily at no cost?
                Oasis is just right for you! We’re a large advertising community welcoming all that join.
                
                __**[Joining is just as easy as one click! Join now!](https://discord.gg/TVU9WwN)**__`)
        m.edit(`${client.Emojis.check} Bumped to all available servers! servers!`, endEmbed);
        cooldown.add(msg.guild.id);
        setTimeout(function() {
            cooldown.delete(msg.guild.id);
        }, timeout);
    }
};