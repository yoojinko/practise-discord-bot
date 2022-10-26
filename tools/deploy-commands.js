require('dotenv').config();

const { REST } = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

const { BOT_TOKEN, APPLICATION_ID } = process.env;

const commandHandlers = require('../dist/commands');
const commands = [
    commandHandlers.nameCommand.getCommand().data.toJSON()
];

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

rest
 .put(Routes.applicationCommands(APPLICATION_ID), {body:commands})
 .then(() => console.log('Successfully registered'))
 .catch(console.error);
