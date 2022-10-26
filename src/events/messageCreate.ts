import { Message } from "discord.js";

export const messageCreate = () => {
    return {
        name: 'messageCreate',
        execute: async (message : Message) => {
            console.log("Message: ",message.content);
        }
    }
}