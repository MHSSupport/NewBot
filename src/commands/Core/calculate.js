const math = require("mathjs");
const { RichEmbed } = require("discord.js")

module.exports = {
    name: "calculate",
    aliases: ["calc", "math", "maths"],
    category: "1.1. 🎖️ | Core",
    description: "Calculate an equation",
    usage: "[equation]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    premiumOnly: false,
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(args.length < 1) return client.Errors.noArgs(msg, "calculate");
        let resp;
        try {
            resp = math.evaluate(args.join(" "));
        } catch (err) {
            client.log(err);
            return client.Errors.invalidArgs(msg, "calculate");
        };
        let embed = new RichEmbed()
            .setColor(msg.member.highestRole.color ? msg.member.highestRole.color : msg.guild.me.highestRole.color ? msg.guild.me.highestRole.color : "BLUE")
            .addField('Input', `\`\`\`yaml\n${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`yaml\n${resp}\`\`\``);
        msg.channel.send(embed);
    }
};