import Command from "../command";
import myNameCommand from "./name";

export const appCommand = new Command('name', 'What is My Name');
appCommand.addSubCommands([myNameCommand]);