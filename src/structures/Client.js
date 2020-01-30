const { Client, Collection, RichEmbed } = require("discord.js");
const mongoose = require("mongoose");
const { resolve } = require('path');
const { readdirSync, statSync } = require('fs');
const moment = require('moment');
const { GiveawaysManager } = require("discord-giveaways");
class NewBot extends Client {
    constructor(options = {}) {
        super(options);
        this.botInvite = "https://discordapp.com/api/oauth2/authorize?client_id=663333257517072384&permissions=8&scope=bot";
        this.supportInvite = "https://discord.gg/3JMEGcQ";
        this.websiteLink = "https://newbot.xyz";
        this.premiumImage = "";
        this.nodes = [
            { host: "localhost", port: "2333", password: "youshallnotpass"}
        ];
        this.token = process.env.TOKEN;
        this.commandDir = process.env.COMMAND_DIR;
		this.eventDir = process.env.EVENT_DIR;
        this.commands = new Collection();
        this.aliases = new Collection();
        this.commandCooldowns = new Map();
        this.afk = new Map();
        this.Embed = new RichEmbed();
        this.prefix = "?";
        this.creator = {
            tag: "Matievis The Kat#8509",
            id: "492708936290402305"
        };
        this.Models = require("./Models.js");
        this.Errors = require("./Errors.js");
        this.Emojis = require("./Emojis");
        this.Colours = {
            YELLOW: "#F4D03F",
            PINK: "#F48FB1",
            ORANGE: "#FF8F00",
            PURPLE: "#673AB7",
            BLURPLE: "#7986CB"
        };
        this.GiveawayManager = new GiveawaysManager({
            storage: "./Giveaways.json",
            updateCountdownEvery: 30000,
            default: {
                botsCanWin: false,
                exemptPermissions: [],
                embedColor: this.Colours.ORNAGE,
                reaction: "🎉"
            }
        });
        this.store = require("./Store");
    };

    log(msg) {
        return console.log(`[LOG] (${moment().format('HH:mm')}): ${msg}`);
    };

    capitalise(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    };

    getUser(query) {
        let target = this.users.get(query) ||
                    this.users.filter(u => u.username.toLowerCase().includes(query.toLowerCase())).first() ||
                    this.users.filter(u => u.tag.toLowerCase().includes(query.toLowerCase())).first();
        return target;
    };

    getMember(includeAuthor, query, msg) {
        let target;
        if(includeAuthor === true) {
            target = msg.guild.members.get(query) ||
                    msg.mentions.members.first() ||
                    msg.member;
            if(query.length > 3) {
                target = msg.guild.members.filter(m => m.displayName.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.filter(m => m.user.username.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.filter(m => m.user.tag.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.mentions.users.first() ||
                        msg.guild.members.get(query) ||
                        msg.mentions.members.first() ||
                        msg.member;
            }
        } else {
            target = msg.guild.members.get(query) ||
                    msg.mentions.members.first();
            if(query.length > 3) {
                target = msg.guild.members.get(query) ||
                        msg.guild.members.filter(m => m.displayName.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.filter(m => m.user.username.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.filter(m => m.user.tag.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.mentions.members.first();
            }
        };
        return target;
    };

    getChannelTarget(msg, query) {
        let target;
        if(query.length > 3) {
            target = msg.mentions.channels.first() ||
                    msg.guild.channels.get(query) ||
                    msg.guild.channels.filter(ch => ch.name.includes(query.toLowerCase()) && ch.type === "text").first();
        } else {
            target = msg.mentions.channels.first() ||
                    msg.guild.channels.get(query);
        }
        return target;
    };

    getCategoryTarget(msg, query) {
        let target;
        if(query.length > 3) {
            target = msg.mentions.channels.filter(ch => ch.type === "category").first() || 
                    msg.guild.channels.find(ch => ch.id === query && ch.type === "category")
                    msg.guild.channels.filter(ch => ch.name.includes(query.toLowerCase()) && ch.type === "category").first();
        } else {
            target = msg.mentions.channels.filter(ch => ch.type === "category").first() || 
                    msg.guild.channels.find(ch => ch.id === query && ch.type === "category");
        };
        return target;
    };

    getRoleTarget(msg, query) {
        let target;
        if(query.length > 3) {
            target = msg.mentions.roles.first() ||
                    msg.guild.roles.get(query.toLowerCase()) ||
                    msg.guild.roles.find(r => r.name.includes(query.toLowerCase()));
        } else {
            target = msg.mentions.roles.first() ||
                    msg.guild.roles.get(query.toLowerCase())
        };
        return target;
    };

    loadCommands() {
		function find_nested(dir, pattern) {
            let results = [];
            readdirSync(dir).forEach(inner_dir => {
                inner_dir = resolve(dir, inner_dir);
                const stat = statSync(inner_dir);
    
                if (stat.isDirectory()) {
                    results = results.concat(find_nested(inner_dir, pattern));
                };
                if (stat.isFile() && inner_dir.endsWith(pattern)) {
                    results.push(inner_dir);
                };
            });
            return results;
        };
        const cmd_files = find_nested(resolve(`${__dirname}/${this.commandDir}`), ".js");
        cmd_files.forEach(file => {
            const props = require(file);
            this.commands.set(props.name, props);
            props.aliases.forEach(alias => {
                this.aliases.set(alias, props.name);
            });
        });
    };
    
    loadEvents() {
		const folders = readdirSync(resolve(`${__dirname}/${this.eventDir}`));
		for (const folder of folders) {
			const files = readdirSync(resolve(`${__dirname}/${this.eventDir}/${folder}`)).filter(f => f.endsWith('.js'));
			for (const file of files) {
				const event = require(resolve(`${__dirname}/${this.eventDir}/${folder}/${file}`));
				const name = event.name ? event.name : file.split('.')[0];
				this.on(name, event.run.bind(null, this));
			};
		};
	};

    connectToDB() {
        return mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    };
};

module.exports = NewBot;