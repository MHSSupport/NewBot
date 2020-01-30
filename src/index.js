require('dotenv').config();
const NewBot = require('./structures/Client');
const client = new NewBot({
	disableEveryone: true,
	sync: true,
});

client.connectToDB();
client.loadEvents();
client.loadCommands();
client.login(NewBot.token).catch(err => client.log(err));
client.on("error", err => client.log(err));

module.exports = {
	client: client
};