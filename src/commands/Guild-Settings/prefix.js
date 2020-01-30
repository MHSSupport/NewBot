module.exports = {
    name: "prefix",
    aliases: ["setprefix"],
    category: "4.1. ⚙️ | Guild-Settings",
    description: "Set a new prefix for your guild",
    usage: "[prefix]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    guildOnly: true,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let newPrefix = args[0];
        if(!newPrefix) return client.Errors.noArgs(msg);
        if(newPrefix === "?") {
            await client.Models.Prefix.findOneAndDelete({
                guildID: msg.guild.id
            });
        } else {
            let prefixDB = await client.Models.Prefix.findOne({
                guildID: msg.guild.id
            });
            if(prefixDB === null) prefixDB = new client.Models.Prefix({
                    guildID: msg.guild.id
            });
            prefixDB.prefix = newPrefix;
            await prefixDB.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
        }
        msg.channel.send(`${client.Emojis.check} Set \`${newPrefix}\` as the prefix for this guild!`);
    }
};