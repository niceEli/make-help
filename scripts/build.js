#!/usr/bin/env node
import buildAll from "./lib/buildAll.js";
import { Command } from "commander";

const build = new Command("build")

build
	.option("-d, --dev", "Build in dev mode", false)
	.parse()

buildAll(build.opts().dev)