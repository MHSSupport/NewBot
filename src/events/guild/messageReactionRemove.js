const { RichEmbed } = require("discord.js");

module.exports = {
    name: "messageReactionRemove",
    run: async (client, reaction, user) => {
        const message = reaction.message;
        if(message.author.id === user.id) return;
        if(reaction.emoji.name !== '⭐') return;

        const extension = function(reaction, attachment) {
            const imageLink = attachment.split('.');
            const typeOfImage = imageLink[imageLink.length - 1];
            const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
            if(!image) return '';
            return attachment;
          };

          const settings = await client.Models.Logs.findOne({
            guildID: msg.guild.id
        });
        if(settings === null || settings.starboardChannelID === null) return;
        const starChannel = msg.guild.channels.get(settings.starboardChannelID);
        if(!starChannel) return;

        const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
        const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id));
        if(stars) {
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
            const foundStar = stars.embeds[0];
            const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
            const embed = new RichEmbed()
                .setColor(foundStar.color)
                .setDescription(foundStar.description)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setTimestamp()
                .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
                .setImage(image);
            const starMsg = await starChannel.fetchMessage(stars.id);
            await starMsg.edit({ embed });
            if(parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
        }
    }
};