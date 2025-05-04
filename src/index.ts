import { Command } from 'commander';
import { getFile } from "./getFile.js";
import { parseYaml } from "./parseYaml.js";
import { displayFile, targetFile } from "./displayFile.js";

const makeHelp = new Command();

makeHelp
	.name("makeman")
	.description("An Opinionated GNU Make Help System.")
	.argument("[file]", "Help file")
	.argument('[target]', 'Optional: specific make target to describe')
	.parse();

let filePath = makeHelp.args[0];
const target = makeHelp.args[1];

if (!filePath) {
	filePath = "help.yaml";
}

const file = getFile(filePath);
const yamlFile = parseYaml(file);

if (target) {
	targetFile(yamlFile, target)
} else {
	displayFile(yamlFile);
}
