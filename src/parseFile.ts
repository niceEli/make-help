import yaml, { Document } from "yaml";
import chalk from "chalk";
import { HelpData } from "./types.js";
import * as toml from "smol-toml";

export function parseFile(rawYaml: string, fileType: string) {
	let data: Document;
	detectFile: try {
		if (fileType == "text/yaml") {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			data = yaml.parse(rawYaml);
			break detectFile;
		}
		if (fileType == "application/json") {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			data = JSON.parse(rawYaml);
			break detectFile;
		}
		if (fileType == "application/toml") {
			data = toml.parse(rawYaml) as unknown as Document;
			break detectFile;
		}
		console.error(chalk.red(`Unknown File Type`));
		process.exit(1);
	} catch (e) {
		const message: string = e instanceof Error ? e.message : "Unknown error";
		console.error(chalk.red(`File Parse Error: ${message}`));
		process.exit(1);
	}

	return data as unknown as HelpData;
}