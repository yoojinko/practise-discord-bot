import {
    Client,
      Collection,
      Message,
      CommandInteraction,
      Intents
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
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        ],
        partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
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
      const interactionCreateHandler = eventHandlers.interactionCreate();

      client.once(
        readyEventHandler.name, 
        async () => {await readyEventHandler.execute(client);}
      );

      client.on(
        messageCreateHandler.name,
        (message: Message) => messageCreateHandler.execute(message)
      )

      client.on(
        interactionCreateHandler.name, 
        (interaction:CommandInteraction) => interactionCreateHandler.execute({
          interaction,
          client,
          commands : discordCommands,
          subcommands: discordSubCommands,
          commandNames
        })
      )

      client.login(BOT_TOKEN);
}

initializeBot();