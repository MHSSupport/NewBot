const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "markdown",
    aliases: ["md", "formatting", "format"],
    category: "5.1. 📝 | Info",
    description: "See all availible formatting for Discord!",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: false,
    run: async (client, { channel }, args) => {
        const embed = new RichEmbed()
            .setDescription("Check some articles on Discord markdown/formatting: [Reddit post of all availible formatting](https://www.reddit.com/r/discordapp/comments/8lev3t/discord_colored_text_with_code_markup_guide/) and the [Official Disocrd guide](https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-?flash_digest=c2b17499a72e6316be64ed93b3101fda08fbb566)")
            .addField("Replace \"NoKeyWordsHere\" with your text", "Default: #839496\n\\`\\`\\`NoKeyWordsHere\n\\`\\`\\`\n\nQuote: #586e75\n\\`\\`\\`brainfuck\nNoKeyWordsHere\n\\`\\`\\`\n\nSolarized Green: #859900\n\\`\\`\\`css\nNoKeyWordsHere\n\\`\\`\\`\n\nSolarized Cyan: #2aa198\n\\`\\`\\`yaml\nNoKeyWordsHere\n\\`\\`\\`\n\nSolarized Blue: #268bd2\n\\`\\`\\`md\nNoKeyWordsHere\n\\`\\`\\`\n\nSolarized Yellow: #b58900\n\\`\\`\\`fix\nNoKeyWordsHere\n\\`\\`\\`\n\nSolarized Orange: #cb4b16\n\\`\\`\\`glsl\nNoKeyWordsHere\n\\`\\`\\`\n\nSolarized Red: #dc322f\n\\`\\`\\`diff\n-NoKeyWordsHere\n\\`\\`\\`")
            .addField("Replace \"Text\" with your text", "Italics:\n`*text*` => *text*\n\nBold:\n`**text**` => **text**\n\nUnderline:\n`__text__` => __text__\n\nStrikethrough:\n`~~text~~` => ~~text~~\n\nSpoiler:\n`\|\|text\|\|` => ||text||\n\nCode line:\n\\`text\\` => `text`\n\nCode block:\n\\`\\`\\`text\\`\\`\\` => ```text```")
            .setFooter("All these can be mixed together in different combinations!!")
            .setTimestamp();
        channel.send(embed);
    }
};