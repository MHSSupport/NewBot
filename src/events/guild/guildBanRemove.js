module.exports = {
    name: "guildBanRemove",
    run: async (client, guild, user) => {
        let banCount = await client.Models.Bans.findOne({
            botID: client.user.id
        });
        banCount.count = banCount.count - 1;
        await banCount.save().catch(err => client.log(err));
    }
};