const ttf2woff = require('ttf2woff')
const fs = require('fs');

/**
 * @function ttf2woffConvert
 * @param {String} infile
 * @param {String} outfile
 * @param {?String} metadata
 */

exports.ttf2woffConvert = (infile, outfile, metadata = null) => {
    let input;
    let options = {};

    try {
        input = fs.readFileSync(infile);
    } catch (e) {
        console.error("Can't open input file (%s)", infile);
        process.exit(1);
    }

    if (metadata) {
        try {
            options.metadata = Array.prototype.slice.call(fs.readFileSync (metadata), 0);
        } catch (e) {
            console.error("Can't open metadata file (%s)", infile);
            process.exit(1);
        }
    }

    const ttf = new Uint8Array(input);
    const woff = Buffer.from ?
        Buffer.from(ttf2woff(ttf, options).buffer)
        :
        new Buffer(ttf2woff(ttf, options).buffer);

    fs.writeFileSync(outfile, woff);
}
