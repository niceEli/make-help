/* eslint-disable */
import chalk from "chalk";
import { displayInfo } from "./displayInfo.js";
import { HelpData } from "./types.js";
import figlet from "figlet";

export function targetFile(data: HelpData, target: string) {
	if (!data.targets) {
		console.error(chalk.cyan(`No targets: "${target}"`));
		process.exit(1);
	}
	const entry = data.targets[target];
	if (!entry) {
		console.error(chalk.cyan(`No such target: "${target}"`));
		process.exit(1);
	}

	displayInfo(target, entry);
}

export function displayFile(data: HelpData) {
	if (data.name) {
		let name = figlet.textSync(data.name, {
			font: data.styles?.titleFont ?? "Slant",
		})
		
		if (data.styles?.titleColor) {
			const tc = data.styles?.titleColor
			name = chalk.rgb(tc.r, tc.g, tc.b)(name)
		}
		if (data.styles?.titleBackground) {
			const tbc = data.styles?.titleBackground
			name = chalk.bgRgb(tbc.r, tbc.g, tbc.b)(name)
		}
		
		console.log(name)
	}
	if (data.author) {
		console.log(chalk.bold(`Author: ${data.author}`));
	}
	
	if (data.author || data.name) console.log();

	if (data.description) {
		console.log(data.description);
		console.log()
	}
	
	if (data.targets ) {
		const entries = Object.entries(data.targets);
		
		console.log(chalk.bold("Available targets:\n"));
		
		// @ts-ignore
		for (const [target, info] of entries) {
			// @ts-ignore
			displayInfo(target, info);
		}
	}
}
