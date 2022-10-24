import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const myNameCommand = {
    name: "myName",
    addSubcommand:(slashCommandBuilder: SlashCommandBuilder)=> 
        slashCommandBuilder.addSubcommand((subcommand) =>
            subcommand
                .setName('name')
                .setDescription('What is your name?')
        ) ,
    execute: async (interaction:CommandInteraction) => {
        console.log(interaction);
    },
};

export default myNameCommand;