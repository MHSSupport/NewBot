const hastebin = require("hastebin.js");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "servers",
    aliases: ["guidlds"],
    category: "9.2. ㊙️ | Secret",
    description: "[REDACTED]",
    usage: "[REDACTED]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: true,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        msg.delete();
        const bin = new hastebin();
        const servers = client.guilds.map(g => `${g.name} - ${g.members.filter(m => !m.user.bot).size}`).join("\n");
        const paste = await bin.post(servers);
        const embed = new RichEmbed()
            .setTitle("Here is a list of all servers I can access!")
            .setColor("BLUE")
            .setURL(paste);
        msg.author.send(embed);
    }
};