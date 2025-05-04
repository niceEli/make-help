import buildJS from "./buildJS.js";
import dtsBuild from "./dts.js";
import chalk from "chalk";

export default function buildAll(dev){
	const startTime = Date.now();

	const bjs = buildJS();
	bjs.then(
		() => {
			console.log(chalk.green(".js built"));
		},
		(err) => {
			console.log(chalk.red(err));
		},
	);
	
	if (!dev) {
		const dts = dtsBuild();
		dts.then(
			() => {
				console.log(chalk.green(".d.ts built"));
			},
			(err) => {
				console.log(chalk.red(err));
			},
		);
		Promise.all([dts, bjs]).then(() => {
			const endTime = Date.now();
			const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
			console.log(chalk.green(`\nBuild completed in ${elapsedTime}s`));
		});
	}
	
	if (dev) {
		Promise.all([bjs]).then(() => {
			const endTime = Date.now();
			const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
			console.log(chalk.green(`\nBuild completed in ${elapsedTime}s`));
		});
	}
}
