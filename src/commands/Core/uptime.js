const { RichEmbed } = require("discord.js");

module.exports = {
    name: "uptime",
    aliases: ["alivetime"],
    category: "1.1. 🎖️ | Core",
    description: "Get the uptime of the bot",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        
        const secs = Math.round((client.uptime / 1000) % 60).toString();
        if(secs === "00") secs = "0";
        const mins = Math.round((client.uptime / (1000 * 60)) % 60).toString();
        if(mins === "00") mins = "0";
        const hours = Math.round((client.uptime / (1000 * 60 * 60)) % 60).toString();
        if(hours === "00") hours = "0";
        const days = Math.round((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString();

        let embed = new RichEmbed()
            .setColor("BLUE")
            .addField("[DAYS]", days, true)
            .addField("[HOURS]", hours, true)
            .setFooter(`And ${mins} minutes with ${secs} seconds :-)`);
        msg.channel.send(embed);
    }
};