#!/usr/bin/env node
'use strict';
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const chalk = require('chalk');
const version = require('../../package.json').version;
const { convertFont } = require('../index')

convertFont(args.fileIn, args.fileOut)
