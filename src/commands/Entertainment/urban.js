const urban = require("urban");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "urban",
    aliases: ["ud", "urbandictionary", "urd"],
    category: "3.1. 🎲 | Entertainment",
    description: "Search for a word in the urban dictionary or get a random one",
    usage: "[search | random] <query>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(!msg.channel.nsfw) return msg.channel.send(`${client.Emojis.x} Due to the results some queries might return, you need to run this command in a \`NSFW\` locked channel.`);
        if(!args[0] || !["search", "random"].includes(args[0])) return client.Errors.invalidArgs(msg, "urban");
        let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
        let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
            try {
                search.first(res => {
                    if(!res) return msg.channel.send(`${client.Emojis.x} No results found for this topic, sorry!`);
                    let { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;

                    let embed = new RichEmbed()
                        .setColor(msg.member.highestRole.color ? msg.member.highestRole.color : msg.guild.me.highestRole.color ? msg.guild.me.highestRole.color : "BLUE")
                        .setAuthor(`Urban Dictionary | ${word}`, image)
                        .setThumbnail(image)
                        .setDescription(`**Defintion:** ${definition || "No definition"}\n**Example:** \`\`\`yaml\n${example || "No Example"}\`\`\`\n**Upvote:** ${thumbs_up || 0}\n**Downvote:** ${thumbs_down || 0}\n**Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
                        .setFooter(`Written by ${author || "unknown"}`)
                        .setTimestamp();

                        msg.channel.send(embed)
                });
            } catch(err) {
                client.log(err)
                return client.Errors.unknownErr(msg);
            };

    }
};