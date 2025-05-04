import ts from 'typescript';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function dts() {
	return new Promise((resolve, reject) => {
		try {
			const configPath = path.resolve(__dirname, '../../tsconfig.json');

			const configText = readFileSync(configPath, 'utf8');
			const result = ts.parseConfigFileTextToJson(configPath, configText);
			if (result.error) reject("Failed");

			const config = ts.parseJsonConfigFileContent(
				result.config,
				ts.sys,
				path.dirname(configPath)
			);

			const program = ts.createProgram({
				rootNames: config.fileNames,
				options: {
					...config.options,
					declaration: true,
					emitDeclarationOnly: true,
					outDir: './lib',
				},
			});

			const emitResult = program.emit();
			const diagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

			if (diagnostics.length > 0) {
				diagnostics.forEach(d => {
					const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
					const file = d.file?.fileName ?? 'unknown';
					console.error(`Error in ${file}: ${message}`);
				});
				reject("Build failed.");
			}
			
			resolve();
		}
		catch (error) {
			reject(error);
		}
	})
} 