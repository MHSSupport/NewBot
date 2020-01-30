const weather = require('weather-js');
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "weather",
    aliases: ["w"],
    category: "1.1. 🎖️ | Core",
    description: "Get the weather for a specific region",
    usage: "[region]",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(args.length < 1) return client.Errors.noArgs(msg, "weather");
        weather.find({
            search: args.join(" "),
            degreeType: 'Celsius'
        }, function (err, result) {
            if (err) return [
                client.log(err),
                client.Errors.unknownErr(msg)
            ];
            
            if (result === undefined || result.length === 0) return msg.channel.send(`${client.cusomtEmojis.x} Please enter a valid location`);
            
            var {
                current,
                location
            } = result[0];
            msg.channel.send(new RichEmbed().setAuthor(`Weather for ${current.observationpoint}`)
            .setDescription(`**${current.skytext}**`)
            .setColor(0x00AE86).addField('Timezone', `UTC ${location.timezone}`, true)
            .addField('Degree Type', location.degreetype, true).addField('Temperature', `${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds', current.winddisplay, true).addField('Humidity', `${current.humidity}%`, true).setThumbnail(current.imageUrl));
        });
    }
};