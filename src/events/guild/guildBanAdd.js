module.exports = {
    name: "guildBanAdd",
    run: async (client, guild, user) => {
        let banCount = await client.Models.Bans.findOne({
            botID: client.user.id
        });
        if(banCount === null) banCount = new client.Models.Bans({
            botID: client.user.id
        });
        banCount.count++;
        await banCount.save().catch(err => client.log(err));
    }
};