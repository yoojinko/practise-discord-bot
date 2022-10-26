import Command from "../command";
import myNameCommand from "./name";

export const nameCommand = new Command('name', 'What is My Name');
nameCommand.addSubCommands([myNameCommand]);