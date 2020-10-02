"use strict"
module.exports = {
    /**
     * @typedef {('.woff'|'.woff2'|'.otf'|'.ttf'|'.svg')} Extensions
     */
    extensions: [".ttf", ".otf", ".svg", ".woff", ".woff2"],

    /**
     * @typedef {('.woff'|'.woff2'|'.ttf'|'.svg')} OutputExtensions
     */
    outputExtensions: [".woff", ".woff2", ".ttf", ".svg"],

    /**
     * @typedef {('.otf'|'.ttf'|'.svg')} InputExtensions
     */
    inputExtensions: [".otf", ".ttf", ".svg"],

    /**
     * @typedef {Object} defaultConfig
     * @property {?String} pathIn - Where the fonts are located
     * @property {?String} pathOut [pathIn] - Path to store, defaults to pathIn
     * @property {?OutputExtensions} outputFormats ['.woff', '.woff2'] - array of file extensions for output files
     * @property {?InputExtensions} inputFormats ['.otf', '.ttf'] - array of file extensions for input files
     * @property {?Boolean} debug [false] - Enable debug output
     */
    defaultConfig: {
        pathIn: process.cwd(),
        pathOut: process.cwd(),
        outputFormats: this.outputExtensions,
        inputFormats: this.inputExtensions,
        debug: false,
    }
}
