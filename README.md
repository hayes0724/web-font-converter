# Web Font Converter
Convert font files to different formats. 
Primarily used for creating woff/woff2 files for use on the web.

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

convertAllFonts({
    pathIn: './fonts',
    pathOut: './output',
    outputFormats: ['.woff', '.woff2'],
    inputFormats: ['.ttf'],
    debug: false
})

// If you provide no options it will run with the defaults below
convertFont({})
```
### Convert Font
Converts a single font, uses file extension to determine conversion 
```javascript
const { convertFont } = require('../src/index')

// This will convert the font from ttf to woff and place font in output folder
convertFont(`./fonts/input/Roboto-Regular.ttf`, `./fonts/output/Roboto-Regular.woff`)
// This will convert the font from svg to woff2 and place font in the same folder
convertFont(`./Roboto-Regular.svg`, `./Roboto-Regular.woff2`)
```

### Fonts
Convert a single font from one format to another
```javascript
const fonts = require('../src/lib/fonts')

// fonts[inputKey].convert[outputKey](inputFile, outputFile)
fonts.ttf.convert.woff2('myfile.ttf', 'myfont.woff2')
```

## CLI 
Work in progress

## Options
| Option | Description | Default
| --- | --- | --- |
| pathIn | {String} Path to font folder | current directory |
| pathOut | {String} Path to store converted fonts | current directory |
| outputFormats | {Array} Font types to convert to | ['.woff', '.woff2'] |
| inputFormats | {Array} Font type to convert from | ['.ttf'] |
| debug | {Boolean} extra output | false |

Input Formats: otf, svg, ttf

Output Formats: svg, ttf, woff, woff2
