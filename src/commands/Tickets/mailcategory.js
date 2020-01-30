module.exports = {
    name: "mailcategory",
    aliases: ["modmailcategory", "mmc", "mmcategory"],
    category: "9.3. 📩 | ModMail",
    description: "Set the category for new threads to appear in",
    usage: "<category>",
    permissions: "MANAGE_GUILD",
    clientPerms: "MANAGE_CHANNELS",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        if(!args[0]) {
            let settings = await client.Models.Tickets.findOne({
                guildID: msg.guild.id,
            });
            if(settings === null || settings.newThreadCategoryID === null) return msg.channel.send(`${client.Emojis.x} This server has no category set for new threads!`);
            msg.channel.send(`<#${settings.newThreadCategoryID}> is the current category for new threads!`);
        } else if(args[0]) {
            const category = client.getCategoryTarget(msg, args.join(" "));
            if(!category) return msg.channel.send(`${client.Emojis.x} I could not find that category!`);
            
            let settings = await client.Models.Tickets.findOne({
                guildID: msg.guild.id,
            });
            if(settings === null) settings = new client.Models.Tickets({
                guildID: msg.guild.id
            });
            settings.newThreadCategoryID = category.id;
            settings.save().catch(err => {
                client.log(err);
                return client.Errors.saveFail(msg);
            });
            msg.channel.send(`${client.Emojis.check} Set ${category} as the category for new modmail threads to appear in!`)

        };
    }
};