import { IExecuteProps } from "../types";

export const interactionCreate = () => {
    return {
        name: "interactionCreate",
        execute: async (
            {interaction, client, commands, subcommands, commandNames} : IExecuteProps
        ) => {
            if(!interaction.isCommand()) {
                console.log("it's not a command!!");
                return;
            }
            console.log(interaction);
            console.log(client);
            console.log(commands);
            console.log(subcommands);
            console.log(commandNames);
            
            commands.get('myName')?.execute(interaction);
            // return await interaction.reply({
                // content:"check",
                // ephemeral:true
            // })
        }
    }
}