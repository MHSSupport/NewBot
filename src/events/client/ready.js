const { ErelaClient, Utils } = require("erela.js");

module.exports = {
    name: "ready",
    run: async (client) => {
        client.music = new ErelaClient(client, client.nodes)
            .on("nodeError", console.error)
            .on("nodeConnect", () => client.log("Successfully created a new Node"))
            .on("queueEnd", player => {
                player.textChannel.send(`${client.Emojis.check} The queue has ended!`);
                return client.music.players.destroy(player.guild.id);
            })
            .on("trackStart", ({ textChannel }, { title, duration }) => textChannel.send(`${client.Emojis.check} Started playing **${title}**! This song will play for \`${Utils.formatTime(duration, true)}\``));
        client.levels = new Map()
            .set("none", 0.0)
            .set("low", 0.10)
            .set("medium", 0.15)
            .set("high", 0.25);

        client.commands.forEach(cmd => {
            client.commandCooldowns.set(cmd.name, new Map());
        });
        client.user.setPresence({ game: { name: 'In developement...' }, status: 'idle' });
        client.log(`${client.user.tag} is online with ${client.guilds.size} guilds logged!`);
    }
};