"use strict";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const fonts = require("./lib/fonts");
const config = require('./lib/config')

/**
 * @function convertAllFonts
 * @param {defaultConfig} settings
 */
exports.convertAllFonts = (settings) => {
  const options = Object.assign(config.defaultConfig, settings);
  let files;
  try {
    console.log(chalk.blue("Starting conversion now..."));
    if (options.debug) {
      console.log(chalk.blue(`Input folder: ${options.pathIn}`));
      console.log(chalk.blue(`Output folder: ${options.pathOut}`));
      console.log(chalk.blue(`Formats: ${options.inputFormats}`));
    }
    files = fs.readdirSync(options.pathIn);
    files.forEach((file) => {
      getFontType(file);
    });
    parseFileMap(options);
    // Convert
    console.log(chalk.greenBright("Fonts converted successfully"));
    process.exit(0);
  } catch (err) {
    console.log(chalk.redBright(err));
    process.exit(1);
  }
};

/**
 *
 * @param {String} font - Font to convert
 * @param {String} output - Output file with extension
 * @example convertFont('./fonts/Roboto-Regular.ttf', './fonts/Roboto-Regular.woff')
 */
exports.convertFont = (font, output) => {
  validateFiles(font, output)
  const extIn = getExtensionKey(path.extname(font));
  const extOut = getExtensionKey(path.extname(output));
  fonts[extIn].convert[extOut](font, output);
}

const validateFiles = (input, output) => {
  if (!checkIfValidInput(input)) {
    console.error(chalk.redBright(`${input} is not a valid input format`))
    console.log(`Valid extensions: ${config.inputExtensions}`)
    process.exit(1)
  }
  if (!checkIfValidOutput(output)) {
    console.error(chalk.redBright(`${output} is not a valid input format`))
    console.log(`Valid extensions: ${config.outputExtensions}`)
    process.exit(1)
  }
}

/**
 *
 * @param {String} font
 * @return {boolean}
 */
const checkIfValidInput = (font) => {
  return config.inputExtensions.indexOf(path.extname(font)) > -1
}

/**
 *
 * @param {String} font
 * @return {boolean}
 */
const checkIfValidOutput = (font) => {
  return config.outputExtensions.indexOf(path.extname(font)) > -1
}

/**
 * @function getFontType
 * @param {String} file
 */
const getFontType = (file) => {
  const ext = path.extname(file);
  if (config.extensions.indexOf(ext) > -1) {
    fonts[ext.replace(".", "")].files.push(file);
  }
};

/**
 * @function getExtensionKey
 * @param {String} extension
 * @return {String}
 */
const getExtensionKey = (extension) => {
  return extension.replace(".", "");
};

/**
 * @function parseFileMap
 * @memberOf {defaultConfig} options
 * @param {defaultConfig} options
 */
const parseFileMap = (options) => {
  // process each input format
  options.inputFormats.forEach((format) => {
    const inputKey = getExtensionKey(format);
    // process each input file
    fonts[inputKey].files.forEach((file) => {
      // process each output format for each file
      options.outputFormats.forEach((output) => {
        const outputKey = getExtensionKey(output);
        const inputFile = path.resolve(options.pathIn, file);
        const outputFile = path.resolve(
          options.pathOut,
          file.replace(inputKey, outputKey)
        );
        // Convert the font
        console.log(fonts[inputKey].convert[outputKey]);
        console.log(outputKey);
        fonts[inputKey].convert[outputKey](inputFile, outputFile);
      });
    });
  });
};
