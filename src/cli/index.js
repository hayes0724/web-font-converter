#!/usr/bin/env node
'use strict';
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const chalk = require('chalk');
const { convertFont } = require('../index')

if (!args.pathIn) {
    console.error(chalk.redBright("--pathIn is required"))
    process.exit(1)
}

if (!args.pathOut) {
    console.error(chalk.redBright("--pathOut is required"))
    process.exit(1)
}

console.log(chalk.green('Starting conversion...'))

convertFont(args.pathIn, args.pathOut)
