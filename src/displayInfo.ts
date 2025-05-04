import chalk from "chalk";
import { entryData, nameAndDesc } from "./types.js";

export function displayInfo(target: string, entry: entryData) {
	console.log(`- ${chalk.cyan(target)}:`);
	
	if (entry.description){
		console.log(`\t${entry.description}`);
	} 
	if (entry.usage) {
		const args: nameAndDesc[] = [];
		const options: nameAndDesc[] = [];
		if (entry.usage.commands) {
			for (const arg of entry.usage.commands) {
				args.push(arg);
			}
		}
		if (entry.usage.options) {
			for (const opt of entry.usage.options) {
				options.push(opt);
			}
		}
		
		if (entry.usage.example) {
			console.log(`\t${chalk.bold("Usage:")} ${entry.usage.example}`);
		} else {
			console.log(`\t${chalk.bold("Usage:")} ${target}`);
		}
		
		if (args.length > 0) {
			console.log(`\t\t${chalk.bold("Commands:")}`);
			for (const arg of args) {
				console.log(`\t\t\t${chalk.cyan(arg.name)}: ${arg.description}`);
			}
		}
		if (options.length > 0) {
			console.log(`\t\t${chalk.bold("Options:")}`);
			for (const opt of options) {
				console.log(`\t\t\t${chalk.cyan(opt.name)}: ${opt.description}`);
			}
		}
	}
}