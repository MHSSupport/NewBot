const fetch = require("node-fetch")
const qs = require("querystring")
const versions = ["stable", "master", "rpc", "commando", "akairo", "akairo-master", "11.5-dev"];

module.exports = {
    name: "disocrdjsdocs",
    aliases: ["djs", "djsdocs", "djsd"],
    category: "5.1. 📝 | Info",
    description: "Search the Discord.js documentation",
    usage: "[query] <branch>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    run: async (client, msg, args) => {
        if(args.length < 1) return client.Errors.noArgs(msg, "discordjsdocs");
        const { channel, author } = msg;
        let source = versions.includes(args.slice(-1)[0]) ? args.pop() : "stable";
        if (source === "11.5-dev") {
            source = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${source}.json`;
        };
        const queryString = qs.stringify({ src: source, q: args.join(" ")});
        const embed = await (await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryString}`)).json();

        if (!embed) return channel.send(`${client.Emojis.x} Failed to locate that information in the documentation.`);

        channel.send({ embed }).then(async m => {
            await m.react("🗑️");
            const filter = (reaction, user) => reaction.emoji.name === "🗑️" && user.id === author.id;
            const collector = m.createReactionCollector(filter, { max: 1, time: 5000 });
            collector.on('collect', data => {
                m.delete();
            });
            collector.on('end', data => {
                if (!data.size) m.clearReactions();
            });
        }).catch(err => client.log(err));
    }
};