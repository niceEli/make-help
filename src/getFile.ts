import fs from "fs";
import chalk from "chalk";

export function getFile(filePath: string) {
	let file: string;
	try {
		file = fs.readFileSync(filePath, 'utf8');
	} catch (e) {
		console.error(chalk.red(`Error reading file: ${filePath}`));
		console.error(e ?? "Error reading file");
		process.exit(1);
	}
	
	return file;
}