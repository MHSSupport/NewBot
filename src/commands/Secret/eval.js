const { RichEmbed } = require("discord.js");
const beautify = require("beautify");
const { inspect } = require("util");
const hastebin = require("hastebin.js");
const bin = new hastebin();


module.exports = {
    name: "eval",
    aliases: ["e"],
    category: "9.2. ㊙️ | Secret",
    description: "[REDACTED]",
    usage: "[REDACTED]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    premiumOnly: false,
    guildOnly: false,
    creatorOnly: true,
    run: async (client, msg, args) => {
        const { channel, guild } = msg;

        let evalutation = args.join(' ');
        const format = x => `\`\`\`js\n${x}\`\`\``;
        const input = evalutation.length > 1000 ? await bin.post(evalutation) : format(evalutation);

        const embed = new RichEmbed()
            .setTitle('Evaluation')
            .addField('Input:', input);

        try {
            const start = process.hrtime();
            if (evalutation.includes('await'))
            evalutation = `(async () => { ${evalutation} })()`;
            const _ = eval(evalutation);
            const diff = process.hrtime(start);
            const type = client.capitalise(typeof _);
            const time = diff[0] > 0 ? `${diff[0]}s` : `${diff[1] / 1000000}ms`;
            let output = beautify(inspect(_, { depth: 0 }), {
                format: 'js'
            });

            output = output.length > 1000 ? await bin.post(output) : format(output);

            embed
                .setColor("GREEN")
                .addField('Output:', output)
                .addField('Information:', `**Type:** ${type}\n**Time:** ${time}`);
        } catch (err) {
            client.log(err);
            embed
                .setColor("RED")
                .addField("[ERROR]", err.message)
                .setFooter(`Whoopsies`)
                .setTimestamp();
        };
        channel.send(embed);
    }
};