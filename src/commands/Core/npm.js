const fetch = require('node-fetch');
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "npm",
    aliases: [],
    category: "1.1. 🎖️ | Core",
    description: "Search for an npm package and get info on it",
    usage: "[query]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let NPMImage = 'https://cdn.discordapp.com/attachments/661364189834772560/662779927971495983/npm.png';
        let query = args.join(" ").toLowerCase();
        await fetch(`https://registry.npmjs.com/${query.replace(/\s+/g, '-').toLowerCase()}`)
            .then(res => res.json()).then(body => {
                if(body.name === undefined) return msg.channel.send(`${client.Emojis.x} Invalid package name`);
                const embed = new RichEmbed()
                    .setAuthor(`NPMJS | ${query.replace(/\s+/g, '-').toLowerCase()}`, NPMImage)
                    .setThumbnail(NPMImage)
                    .setColor("BLUE")
                    .addField('Package Name', `\`${body.name}\``, true)
                    .addField('Package Link', `[click me](${`https://www.npmjs.com/package/${query.replace(/\s+/g, '-').toLowerCase()}`})`, true)
                    .addField('Package Version', `\`${body['dist-tags'].latest}\``, true)
                    .addField('Package Keywords', `${body.keywords ? body.keywords.map(x => `\`${x}\``).join(', ') : 'None'}`)
                    .addField('Package Description', body.description)
                    .setFooter(`Requested by ${msg.author.tag}`);
                msg.channel.send(embed);
            });
    }
};