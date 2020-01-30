module.exports = {
    name: "status",
    aliases: [],
    category: "1.1. 🎖️ | Core",
    description: "Get the status of the current guild",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const status = await client.Models.Premium.findOne({
            guildID: msg.guild.id
        });
        msg.channel.send(`${client.Emojis.gem} ${msg.guild.name}'s premium status is \`${status ? "TRUE" : "FALSE"}\``);
    }
};