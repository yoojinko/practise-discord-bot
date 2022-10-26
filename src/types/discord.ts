import { Client, Collection, CommandInteraction } from 'discord.js';

import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';

export type IExecuteFunc =
  (interaction: CommandInteraction) => Promise<any>;

export interface IExecuteProps {
  interaction: CommandInteraction;
  client: Client;
  commands: Collection<String, IDiscordCommand>;
  subcommands: Collection<String, IDiscordSubCommand>;
  commandNames: Array<String>;
}

export interface IDiscordCommand {
  data:
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute: IExecuteFunc;
}

export interface IDiscordSubCommand {
  name: string;
  addSubcommand: (slashCommandBuilder: SlashCommandBuilder) => void;
  execute: IExecuteFunc;
}
