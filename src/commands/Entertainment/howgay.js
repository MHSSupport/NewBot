module.exports = {
    name: "howgay",
    aliases: ["gayness", "gayrate"],
    category: "3.1. 🎲 | Entertainment",
    description: "Get the percentage of gay in a user",
    usage: "<member>",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        let target = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.guild.members.find(m => m.user.tag === args.join(" ")) || msg.guild.members.find(m => m.user.username === args.join(" ")) || msg.member;
        if(!target) return client.Errors.invalidTarget(msg);
        let percent = Math.round(Math.random() * 100);
        msg.channel.send(`:rainbow_flag: ${target.user.username} is ${percent}% gay!`);
    }
};