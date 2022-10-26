import { Client } from "discord.js";

export const ready = () => {
    return {
        name: 'ready',
        execute: async (client : Client) => {
            console.log('Ready!!');
        }
    }
}