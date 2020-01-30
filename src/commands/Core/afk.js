module.exports = {
    name: "afk",
    aliases: ["afl", "awayfromkeyboard"],
    category: "1.1. 🎖️ | Core",
    description: "Set your afk status",
    usage: "<reason>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let reason = args.join(" ") ? args.join(" ") : "AFK";
        let afklist = client.afk.get(msg.author.id);

        if (!afklist) {
            let construct = {
                id: msg.author.id,
                usertag: msg.author.tag,
                reason: reason
            };

            client.afk.set(msg.author.id, construct);
            return msg.channel.send(`${client.Emojis.check} I have set your afk: ${reason}`);
        } else {
            client.afk.delete(message.author.id);
            return msg.channel.send(`${client.Emojis.x} I removed your afk!`);
        };
      }
};