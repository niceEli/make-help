import { Command } from 'commander';
import { getFile } from "./getFile.js";
import { parseFile } from "./parseFile.js";
import { displayFile, targetFile } from "./displayFile.js";
import { getFilePath } from "./getFilePath.js";
import mime from "mime";
import { HelpData, opts } from "./types.js";
import yaml from "yaml";
import * as toml from "smol-toml";
import { input, select } from "@inquirer/prompts";
import fs from "fs";

const makeHelp = new Command();

makeHelp
	.name("makeman")
	.description("An Opinionated GNU Make Help System.")
	.argument("[file]", "Help file")
	.argument('[target]', 'Optional: specific make target to describe')
	.option("-j, --toJson", "Convert to JSON")
	.option("-y, --toYaml", "Convert to YAML")
	.option("-t, --toToml", "Convert to TOML")
	.option("-i, --init", "Initialize a new help file")
	.parse();

const options = makeHelp.opts<opts>();

if (options.init) {
	const name = await input({ message: "Name Of The App:" })
	const author = await input({ message: "Author:" })
	const description = await input({ message: "Description:" })

	const type = await select({ message: "Type Of Help File:", choices: ["YAML", "JSON", "TOML"] })

	const file: HelpData = {
		$schema: "https://unpkg.com/makeman@*/help.schema.json",
		name: name,
		author: author,
		description: description,
	}

	switch (type) {
		case "YAML": {
			const yamlFile = yaml.stringify(file);
			fs.writeFileSync("help.yaml", yamlFile);
		}break
		case "JSON": {
			const jsonFile = JSON.stringify(file, null, 2);
			fs.writeFileSync("help.json", jsonFile);
		}break
		case "TOML": {
			const tomlFile = toml.stringify(file);
			fs.writeFileSync("help.toml", tomlFile);
		}break
	}

	process.exit(0);
}

let filePath = makeHelp.args[0];
const target = makeHelp.args[1];

filePath = getFilePath(filePath);
const fileType = mime.getType(filePath);
if (fileType == null || (fileType !== "text/yaml" && fileType !== "application/json" && fileType !== "application/toml")) {
	console.error(`File type not recognized: ${filePath}`);
	process.exit(1);
}

const file = getFile(filePath);
const parsedFile = parseFile(file, fileType);

if (options.toYaml) {
	console.log(yaml.stringify(parsedFile));
	process.exit(0);
}
if (options.toJson) {
	console.log(JSON.stringify(parsedFile, null, 2));
	process.exit(0);
}
if (options.toToml) {
	console.log(toml.stringify(parsedFile));
	process.exit(0);
}

if (target) {
	targetFile(parsedFile, target)
} else {
	displayFile(parsedFile);
}