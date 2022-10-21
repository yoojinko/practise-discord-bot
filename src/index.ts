import {Client, Partials, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel, Partials.Message, Partials.Reaction],
  });
const { BOT_TOKEN } = process.env;

client.once('ready', () => {
    console.log("Ready!");
});

client.on('messageCreate', (message,) => {
    console.log("I'm in on messageCre");
    console.log(message);
    console.log(message.content);
})

client.on('messageUpdate', message => {
    console.log("I'm in on messageUp");
    console.log(message);
    console.log(message.content);
})

client.login(BOT_TOKEN);