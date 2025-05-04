import { Command } from 'commander';
import { getFile } from "./getFile.js";
import { parseFile } from "./parseFile.js";
import { displayFile, targetFile } from "./displayFile.js";
import { getFilePath } from "./getFilePath.js";
import mime from "mime";
import { opts } from "./types.js";
import yaml from "yaml";
import * as toml from "smol-toml";

const makeHelp = new Command();

makeHelp
	.name("makeman")
	.description("An Opinionated GNU Make Help System.")
	.argument("[file]", "Help file")
	.argument('[target]', 'Optional: specific make target to describe')
	.option("-j, --toJson", "Convert to JSON")
	.option("-y, --toYaml", "Convert to YAML")
	.option("-t, --toToml", "Convert to TOML")
	.parse();

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

const options = makeHelp.opts<opts>();
let useOptions: boolean = options.toJson || options.toYaml || options.toToml;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (useOptions == undefined) {
	useOptions = false;
}

if (!useOptions) {
	if (target) {
		targetFile(parsedFile, target)
	} else {
		displayFile(parsedFile);
	}
}

if (useOptions) {
	if (options.toYaml) {
		console.log(yaml.stringify(parsedFile));
	}
	if (options.toJson) {
		console.log(JSON.stringify(parsedFile, null, 2));
	}
	if (options.toToml) {
		console.log(toml.stringify(parsedFile));
	}
}