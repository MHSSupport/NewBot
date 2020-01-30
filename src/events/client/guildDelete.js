module.exports = {
    name: "guildDelete",
    run: async (client, guild) => {
        try {
            client.Models.Premium.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.Bumps.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.Agree.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.Suggestions.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.Logs.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.CaseNo.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.Goodbye.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.LevelUpChannel.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.Welcome.findOneAndDelete({
                guildID: guild.id
            });
            client.Models.Prefix.findOneAndDelete({
                guildID: guild.id
            });
        } catch(err) {
            client.log(err);
        };
    }
};