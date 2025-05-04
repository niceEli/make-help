import fs from "fs";
import chalk from "chalk";

export function getFilePath(defFilePath: string) {
	let paths = [defFilePath];
	
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (defFilePath == undefined) {
		paths = ["help.yaml", "help.yml", "help.json", "help.toml"]
	}
	
	let path = ""
	
	for (const p of paths) {
		if (fs.existsSync(p)) {
			path = p;
			break;
		}
	}
	
	if (path == "") {
		console.error(chalk.red(`No Help Files Found`));
		console.log("Default Help File Types: help.yaml, help.yml, help.json, help.toml")
		process.exit(1);
	}
	
	return path;
}