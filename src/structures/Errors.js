const emojis = require("./Emojis");
const client = require("../index");
const { RichEmbed } = require("discord.js");
let message;

const noPerms = function(msg, perms) {
    message = `${emojis.x} You are lacking the \`${perms}\` permission(s) to use that command!`;
    return msg.channel.send(message);
};

const invalidTarget = function(msg) {
    message = `${emojis.x} I could not get a target. Please provide either a valid user/role ID; the username/name of a user/role; the tag of a user; mention a user/role`;
    return msg.channel.send(message);
};

const unknownErr = function(msg, err) {
    message = `${emojis.x} There was an unexpected error. Please report this if it continues.`;
    try {
        const bugs = client.channels.get(client.bugReportsChannelID);
        const embed = new RichEmbed()
            .setAuthor("An unknown error occured!")
            .setColor("RED")
    } catch(err) {

    };
    return msg.channel.send(message);
};

const noArgs = function(msg, cmd) {
    message = `${emojis.x} You need to supply arguments for that command. If you are unsure on what to supply do \`help ${cmd}\``;
    return msg.channel.send(message);
};

const channelMention = function(msg, cmd) {
    message = `${emojis.x} You need to mention a channel. If you are unsure do \`help ${cmd}\``;
    return msg.channel.send(message);
};

const saveFail = function(msg) {
    message = `${emojis.x} There was an error saving your data. Please report this if it continues`;
    return msg.channel.send(message);
};

const cooldown = function(msg) {
    message = `${emojis.x} The cooldown for that command has not expired.`;
    return msg.channel.send(message);
};

const invalidChan = function(msg) {
    message = `${emojis.x} I could not find that channel.`;
    return msg.channel.send(message);
};

const noClientPerms = function(msg, perms) {
    message = `${emojis.x} I do not have the \`${perms}\` permission(s) to execute that command. Please make sure I have the right permissions and that the target member's role is below my role.`;
    return msg.channel.send(message);
};

const invalidArgs = async function(msg, cmd) {
    message = `${emojis.x} These arguments provided for that command are not valid. If you are unsure please run \`help ${cmd}\` for more info`;
    return msg.channel.send(message);
};

const premiumOnly = function(msg) {
    message = `${emojis.x} That command is premium only! Run \`premium\` for info about premium!`;
};

module.exports = {
    noPerms: noPerms,
    invalidTarget: invalidTarget,
    unknownErr: unknownErr,
    noArgs: noArgs,
    channelMention: channelMention,
    saveFail: saveFail,
    cooldown: cooldown,
    invalidChan: invalidChan,
    noClientPerms: noClientPerms,
    invalidArgs: invalidArgs,
    premiumOnly: premiumOnly,
};