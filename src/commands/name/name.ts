import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const myNameCommand = {
    name: "myName",
    addSubcommand:(slashCommandBuilder: SlashCommandBuilder)=> 
        slashCommandBuilder.addSubcommand((subcommand) =>
            subcommand
                .setName('name')
                .setDescription('What is your name?')
                .addStringOption(option =>
                    option.setName('input')
                        .setDescription('the input'))
        ) ,
    execute: async (interaction:CommandInteraction) => {
        console.log("in createMessage");
        console.log(interaction);
    },
};

export default myNameCommand;