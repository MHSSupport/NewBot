module.exports = {
    name: "embedcolour",
    aliases: ["setembedcolor", "embedcolor", "embedcolour"],
    category: "8.1. 👑 | Premium",
    description: "Set the colour to use for embeds for suggestions, bumps, etc.",
    usage: "[hex colour]",
    permissions: "MANAGE_GUILD",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: true,
    run: async (client, msg, args) => {
        const hex = args[0];
        if(!hex) return client.Errors.noArgs(msg, "setembedcolour");
        const db = await client.Models.Premium.findOne({
            guildID: msg.guild.id
        });
        db.embedColour = hex;
        db.save().catch(err => {
            client.log(err);
            return client.Errors.saveFail(msg);
        });
        msg.channel.send(`${client.Emojis.check} Set the colour for embeds to **${hex}**. This must be a hex value!`);
    }
};