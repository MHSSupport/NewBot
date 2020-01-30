const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema({
    userID: String,
    coins: Number,
    bank: Number,
    securityLevel: Number,
});

const prefixSchema = new mongoose.Schema({
    guildID: String,
    prefix: String,
});

const xpSchema = new mongoose.Schema({
    userID: String,
    guildID: String,
    level: Number,
    xp: Number,
});

const banCount = new mongoose.Schema({
    botID: String,
    count: Number,
});

const welcomeSettings = new mongoose.Schema({
    guildID: String,
    channelID: String,
    message: String,
    embed: Boolean,
});

const goodbyeSettings = new mongoose.Schema({
    guildID: String,
    channelID: String,
    message: String,
    embed: Boolean,
});

const levelUpChannel = new mongoose.Schema({
    guildID: String,
    channel: String,
});

const CaseNo = new mongoose.Schema({
    guildID: String,
    case: Number,
});

const Logs = new mongoose.Schema({
    guildID: String,
    modLogID: String,
    starboardChannelID: String,
    antiInviteChannelIDs: Array,
    antiSwear: Boolean,
});

const Premium = new mongoose.Schema({
    guildID: String,
    embedColour: String,
});

const Profile = new mongoose.Schema({
    userID: String,
    inventory: Array,
});

const Bumps = new mongoose.Schema({
    guildID: String,
    bannerURL: String,
    description: String,
    invite: String,
    bumpChannelID: String,
    bumpCount: Number,
});

const agree = new mongoose.Schema({
    guildID: String,
    channelID: String,
    roleID: String,
});

const suggestions = new mongoose.Schema({
    guildID: String,
    channelID: String,
    roleID: String,
});

const msgCounts = new mongoose.Schema({
    guildID: String,
    userID: String,
    count: String,
});

const Tickets = new mongoose.Schema({
    guildID: String,
    enabled: Boolean,
    newThreadCategoryID: String,
    supportRoleID: String,
    logChannelID: String,
    openMessage: String,
});

const UserMail = new mongoose.Schema({
    userID: String,
    guildID: String,
    threadID: String,
    openThread: Boolean,
});

module.exports = {
    Money: mongoose.model("Money", moneySchema),
    Prefix: mongoose.model("Prefix", prefixSchema),
    Xp: mongoose.model("Xp", xpSchema),
    Bans: mongoose.model("Bans", banCount),
    Welcome: mongoose.model("Welcomes", welcomeSettings),
    Goodbye: mongoose.model("Goodbyes", goodbyeSettings),
    LevelUpChannel: mongoose.model("LevelUpChannel", levelUpChannel),
    CaseNo: mongoose.model("CaseNumbers", CaseNo),
    Logs: mongoose.model("Logs", Logs),
    Premium: mongoose.model("Premium_Guilds", Premium),
    Profile: mongoose.model("Profile", Profile),
    Bumps: mongoose.model("bumps", Bumps),
    Agree: mongoose.model("agree", agree),
    Suggestions: mongoose.model("suggestions", suggestions),
    msgCounts: mongoose.model("msgcounts", msgCounts),
    Tickets: mongoose.model("tickets", Tickets),
    UserMail: mongoose.model("usermails", UserMail),
};