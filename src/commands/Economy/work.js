const timeout = 1800000;
const cooldown = new Set();

module.exports = {
    name: "work",
    aliases: ["job"],
    category: "2.1. 💰 | Economy",
    description: "Do a minigame for an amount of money. Amount is increased if you win",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    guildOnly: false,
    creatorOnly: false,
    run: async (client, msg, args) => {
        if(cooldown.has(msg.author.id)) {
            client.Errors.cooldown(msg);
            return;
        } else {
            let bal = await client.Models.Money.findOne({
                userID: msg.author.id
            });
            if(bal === null){
                bal = new client.Models.Money({
                    userID: msg.author.id,
                    securityLevel: 0
                });
            };
            const filter = m => m.author.id === msg.author.id;
            let amount = (Math.floor(Math.random() * 100) + 16);
            let gameChance = Math.round(Math.random() * 10);
            let option;
            if(gameChance > 5) option = "missingWord";
            else option = "scrambledWord";
            if(option === "scrambledWord") {
                function shuffelWord (word){
                    let shuffledWord = "";
                    word = word.split("");
                    while (word.length > 0) {
                        shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
                    }
                    return shuffledWord;
                };
                let words = ["yes", "shrek", "computer", "table", "discord", "javascript", "dictionary", "cellphone", "telephone", "wire", "speaker", "music", "mongoose", "duck", "goose", "debug", "download", "emoji", "rabbit", "earphones", "airpods", "firepod", "reddit", "penis"];

                const ranIndex = Math.floor(Math.random() * words.length);
                const correctWord = words[ranIndex];
                const shuffledWord = shuffelWord(words[ranIndex])

                msg.channel.send(`**Unscramble the word!** - \`${shuffledWord}\`\n*you have 20 seconds...*`);
                const collector = msg.channel.createMessageCollector(filter, { max: 4, time: 20000 });
                collector.on("collect", async (m) => {
                    if(m.content !== correctWord) return msg.channel.send(`**Incorrect! Try again** - \`${shuffledWord}\``)
                    else if(m.content === correctWord){
                        bal.coins = bal.coins + amount;
                        bal.save().catch(err => {
                            client.log(err);
                            client.Errors.saveFail(msg);
                            return;
                        });
                        msg.channel.send(`${client.Emojis.check} You guessed it! Your reward is ${client.Emojis.retroCoin}${amount}`);
                        collector.stop();
                    };
                });

                collector.on("end", async (collected) => {
                    msg.channel.send(`The mini-game has ended! The correct word is \`${correctWord}\``);
                });
             } else if(option === "missingWord") {
                let sentence = [{
                        full: "Hello! How are you `t _ _ _ _?`",
                        word: "today"
                    },{
                        full: "I love eating `c _ _ _`.",
                        word: "cake"
                    },{
                        full: "Happy cake `_ _ _`!",
                        word: "day"
                    },{
                        full: "I own loads of `fi _ _ _ _ _ s.`",
                        word: "firearms"
                    },{
                        full: "`Ja _ _ _ _ _ _ _ t` is the best langauge.",
                        word: "javascript"
                    },{
                        full: "Eating is my favorite `h _ _ _ _`.",
                        word: "hobby"
                    },{
                        full: "Do you know the difference between earpones and `hea _ _ _ _ _ _ s`?",
                        word: "headphones"
                    },{
                        full: "Raiding is against Discord Terms of `_ _ _ _ _ _ _`.",
                        word: "service"
                    },{
                        full: "Don't be `d _ _ _` please. Thank you.",
                        word: "dumb"
                    },{
                        full: "I am very `c _ _ _`",
                        word: "cool"
                }];
                
                let sent = sentence[Math.floor(Math.random() * sentence.length)]
                msg.channel.send(`**Find the missing word**\n${sent.full}\n*you have 20 seconds...*`);

                let collector = msg.channel.createMessageCollector(filter, { max: 4, time: 20000 });
                collector.on("collect", async (m) => {
                    if(m.content.toLowerCase() !== sent.word) {
                        msg.channel.send(`**Incorrect. try again**\n${sent.full}\n*you have 20 seconds...*`)
                    } else if(m.content.toLowerCase() === sent.word) {
                        bal.coins = bal.coins + amount;
                        msg.channel.send(`${client.Emojis.check} You got it right! Your reward is ${client.Emojis.retroCoin}${amount}!`);
                        collector.stop();
                    };

                });
                collector.on("end", async (collected) => {
                    msg.channel.send(`${client.Emojis.etada} The mini-game has ended! The missing word was ${sent.word}!`);
                });


            };

            await bal.save().catch(err => {
                client.log(err);
                client.Errors.saveFail(msg);
                return;
            });
            
            cooldown.add(msg.author.id);
            setTimeout(function() {
                cooldown.delete(msg.author.id);
            }, timeout);
        };
    }
};