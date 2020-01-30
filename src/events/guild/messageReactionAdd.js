module.exports = {
    name: "messageReactionAdd",
    run: async (client, reaction, user) => {
        const msg = reaction.message;
        if (reaction.emoji.name !== '⭐') return;
        if (msg.author.id === user.id) return;
        if (msg.author.bot) return;
        
        const settings = await client.Models.Logs.findOne({
            guildID: msg.guild.id
        });
        if(settings === null || settings.starboardChannel === null) return;
        const starChannel = msg.guild.channels.get(settings.starboardChannel);
        if(!starChannel) return;
        
        const extension = function(reaction, attachment) {
            const imageLink = attachment.split('.');
            const typeOfImage = imageLink[imageLink.length - 1];
            const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
            if(!image) return '';
            return attachment;
        };

        // Here we fetch 100 messages from the starboard channel.
        const fetch = await starChannel.fetchMessages({ limit: 100 }); 
        // We check the messages within the fetch object to see if the message that was reacted to is already a message in the starboard,
        const stars = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(msg.id));

        // Now we setup an if statement for if the message is found within the starboard.
        if(stars) {
            // Regex to check how many stars the embed has.
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
            // A variable that allows us to use the color of the pre-existing embed.
            const foundStar = stars.embeds[0];
            // We use the this.extension function to see if there is anything attached to the message.
            const image = msg.attachments.size > 0 ? await extension(reaction, msg.attachments.array()[0].url) : ''; 
            const embed = new RichEmbed()
                .setColor(foundStar.color)
                .setDescription(foundStar.description)
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                .setTimestamp()
                .setFooter(`⭐ ${parseInt(star[1])+1} | ${msg.id}`)
                .setImage(image);
            // We fetch the ID of the message already on the starboard.
            const starMsg = await starChannel.fetchMessage(stars.id);
            // And now we edit the message with the new embed!
            await starMsg.edit({ embed });
        }
        // Now we use an if statement for if a message isn't found in the starboard for the message.
        if (!stars) {
            // We use the this.extension function to see if there is anything attached to the message.
            const image = msg.attachments.size > 0 ? await extension(reaction, msg.attachments.array()[0].url) : ''; 
            // If the message is empty, we don't allow the user to star the message.
            if (image === '' && msg.cleanContent.length < 1) return;
            const embed = new RichEmbed()
                // We set the color to a nice yellow here.
                .setColor(15844367)
                // Here we use cleanContent, which replaces all mentions in the message with their
                // equivalent text. For example, an @everyone ping will just display as @everyone, without tagging you!
                // At the date of this edit (09/06/18) embeds do not mention yet.
                // But nothing is stopping Discord from enabling mentions from embeds in a future update.
                .setDescription(msg.cleanContent) 
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                .setTimestamp(new Date())
                .setFooter(`⭐ 1 | ${msg.id}`)
                .setImage(image);
            await starChannel.send({ embed });
        }
    }
};