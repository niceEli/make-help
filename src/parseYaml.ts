import yaml, { Document } from "yaml";
import chalk from "chalk";
import { HelpData } from "./types.js";

export function parseYaml(rawYaml: string) {
	let data: Document;
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		data = yaml.parse(rawYaml);
	} catch (e) {
		const message: string = e instanceof Error ? e.message : "Unknown error";
		console.error(chalk.red(`YAML parse error: ${message}`));
		process.exit(1);
	}

	return data as unknown as HelpData;
}