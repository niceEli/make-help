import * as esbuild from "esbuild";

export default function buildJS() {
	return new Promise((resolve, reject) => {
		try {
			esbuild.buildSync({
				entryPoints: ["src/**/*.ts"],
				outdir: "lib",
				logLevel: "debug",
				format: "esm",
				platform: "node",
				sourcemap: "inline",
				banner: { js: "#!/usr/bin/env node\n\"use strict\";\n// Copyright (c) 2025 niceEli, MIT Licence\n" },
			});
			resolve();
		} catch (error) {
			reject(error);
		}
	});
}