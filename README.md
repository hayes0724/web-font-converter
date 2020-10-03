# Web Font Converter
![npm (scoped)](https://img.shields.io/npm/v/@hayes0724/web-font-converter)
![build](https://github.com/hayes0724/web-font-converter/workflows/Node.js%20CI/badge.svg?branch=master)
![node-current (scoped)](https://img.shields.io/node/v/@hayes0724/web-font-converter)
[![GitHub issues](https://img.shields.io/github/issues/hayes0724/web-font-converter.svg)](https://GitHub.com/hayes0724/web-font-converter/issues/)
[![GitHub license](https://img.shields.io/github/license/hayes0724/web-font-converter.svg)](https://github.com/hayes0724/web-font-converter/blob/master/LICENSE)

Convert font files to different formats. 
Primarily used for creating woff/woff2 files for use on the web.

## Table of Contents
1. [Install](#Install)
2. [Formats](#Formats)
3. [API](#API)
    1. [Convert All Fonts](#Convert All Fonts)
    2. [Convert Font](#Convert Font)
    3. [Fonts](#Fonts)
4. [CLI](#CLI)

## Install
Install with npm:
```shell script
npm install --save-dev @hayes0724/web-font-converter
```
Install with yarn:
```shell script
yarn add @hayes0724/web-font-converter --dev
```


## Formats

1. ttf -> woff
2. ttf -> woff2
3. svg -> ttf
4. svg -> ttf -> woff
5. svg -> ttf -> woff2
6. otf -> svg
7. otf -> svg -> ttf
3. otf -> svg -> ttf -> woff
4. otf -> svg -> ttf -> woff2

## API

### Convert All Fonts
Converts all fonts that match input formats to the specified output format
```javascript
const { convertAllFonts } = require('@hayes0724/web-font-converter')

// This will convert all ttf fonts to both woff and woff2
convertAllFonts({
    pathIn: './fonts',
    pathOut: './output',
    outputFormats: ['.woff', '.woff2'],
    inputFormats: ['.ttf'],
    debug: false
})

// This will convert all ttf and svg fonts to both woff and woff2
convertAllFonts({
    pathIn: './fonts',
    pathOut: './output',
    outputFormats: ['.woff', '.woff2'],
    inputFormats: ['.ttf', '.svg'],
    debug: false
})

// If you provide no options it will run with the defaults below
convertFont({})
```

| Option | Description | Default
| --- | --- | --- |
| pathIn | {String} Path to font folder | current directory |
| pathOut | {String} Path to store converted fonts | current directory |
| outputFormats | {Array} Font types to convert to | ['.woff', '.woff2'] |
| inputFormats | {Array} Font type to convert from | ['.ttf'] |
| debug | {Boolean} extra output | false |

Input Formats: otf, svg, ttf

Output Formats: svg, ttf, woff, woff2

### Convert Font
Converts a single font, uses file extension to determine conversion.
```javascript
const { convertFont } = require('@hayes0724/web-font-converter')

// This will convert the font from ttf to woff and place font in output folder
convertFont(`./fonts/input/Roboto-Regular.ttf`, `./fonts/output/Roboto-Regular.woff`)
// This will convert the font from svg to woff2 and place font in the same folder
convertFont(`./Roboto-Regular.svg`, `./Roboto-Regular.woff2`)
```

### Fonts
Convert a single font from one format to another. This is used by `convertFont` and `convertAllFonts`, it's useful for creating your own 
scripts for processing.
```javascript
const fonts = require('@hayes0724/web-font-converter/src/lib/fonts')

// fonts[inputKey].convert[outputKey](inputFile, outputFile)
fonts.ttf.convert.woff2('myfile.ttf', 'myfont.woff2')
```

## CLI 
Converts a single font, uses file extension to determine conversion.
```shell script
font-convert --pathIn='./fonts/Roboto-Regular.ttf' --pathOut='./fonts/Roboto-Regular.woff'
```

| Option | Description 
| --- | --- |
| `--pathIn` | {String} Input font file |
| `--pathOut` | {String} Output font file |

Input Formats: otf, svg, ttf

Output Formats: svg, ttf, woff, woff2

