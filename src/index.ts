import {
    Client,
     Partials,
      GatewayIntentBits, 
      Collection,
      Message
} from "discord.js";
import * as commandHandlers from "./commands";
import * as eventHandlers from "./events";
import * as dotenv from "dotenv";
import { IDiscordCommand, IDiscordSubCommand } from "./types";

dotenv.config();

const { BOT_TOKEN } = process.env;

const commandNames = new Array<String>();
const discordCommands = new Collection<String, IDiscordCommand>();
const discordSubCommands = new Collection<String, IDiscordSubCommand>();

function initializeBot() {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Channel, Partials.Message, Partials.Reaction],
      });

      for(const command of Object.values(commandHandlers)) {
        const _command = command.getCommand();
        if(_command) {
            discordCommands.set(command.name,  _command);
        }
        const subCommands = command.getSubCommands();
        for(const subCommand of subCommands) {
            discordSubCommands.set(`${command.name}/${subCommand.name}`, subCommand);
        }
        commandNames.push(command.name);
      }

      const readyEventHandler = eventHandlers.ready();
      const messageCreateHandler = eventHandlers.messageCreate();

      client.once(
        readyEventHandler.name, 
        async () => {await readyEventHandler.execute(client);}
      );

      client.on(
        messageCreateHandler.name,
        (message: Message) => messageCreateHandler.execute(message)
      )

      client.login(BOT_TOKEN);
}

initializeBot();
// client.once('ready', () => {
//     console.log("Ready!");
// });

// client.on('messageCreate', (message,) => {
//     console.log("I'm in on messageCre");
//     console.log(message);
//     console.log(message.content);
// })

// client.on('messageUpdate', message => {
//     console.log("I'm in on messageUp");
//     console.log(message);
//     console.log(message.content);
// })

// client.login(BOT_TOKEN);