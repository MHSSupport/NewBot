module.exports = {
    name: "coinflip",
    aliases: ["cf", "flip", "cf"],
    category: "3.1. 🎲 | Entertainment",
    description: "Flip a coin.. Not much to it..",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        const flip = 0.1;
        const result = (Math.random() * flip);
        let m = await msg.channel.send(`${client.Emojis.generating} Flipping..`)
        const reply = (result < 0.05 ? "Heads" : "Tails");
        m.edit(`:game_die: ${reply}!`);
    }
};