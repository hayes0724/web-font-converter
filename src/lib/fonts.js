"use strict";
const fs = require("fs");
const { ttf2woffConvert } = require("./ttf2woff");
const ttf2woff2 = require("ttf2woff2");
const otf2svg = require("otf2svg");
const svg2ttf = require("svg2ttf");

const fonts = {
  ttf: {
    files: [],
    convert: {
      woff: (inFile, outFile) => {
        ttf2woffConvert(inFile, outFile);
      },
      woff2: (inFile, outFile) => {
        fs.writeFileSync(outFile, ttf2woff2(fs.readFileSync(inFile)));
      },
    },
  },
  svg: {
    files: [],
    convert: {
      ttf: (inFile, outFile) => {
        const ttf = svg2ttf(fs.readFileSync(inFile, "utf8"), {});
        fs.writeFileSync(outFile, new Buffer(ttf.buffer));
      },
      woff: (inFile, outFile) => {
        const ttfFile = outFile.replace("woff", "ttf");
        // Convert SVG to TTF
        fonts.svg.convert.ttf(inFile, ttfFile);
        // Convert TTF to WOFF/WOFF2
        fonts.ttf.convert.woff(ttfFile, outFile);
      },
      woff2: (inFile, outFile) => {
        const ttfFile = outFile.replace("woff2", "ttf");
        // Convert SVG to TTF
        fonts.svg.convert.ttf(inFile, ttfFile);
        // Convert TTF to WOFF/WOFF2
        fonts.ttf.convert.woff2(ttfFile, outFile);
      },
    },
  },
  otf: {
    files: [],
    convert: {
      svg: (inFile, outFile) => {
        otf2svg.convertToFile(inFile, outFile);
      },
      ttf: (inFile, outFile) => {
        const svgFile = outFile.replace("woff2", "svg");
        const ttfFile = outFile.replace("woff2", "ttf");
        // Convert to SVG, the only format possible for otf
        fonts.otf.convert.svg(inFile, svgFile);
        // Convert SVG to TTF
        fonts.svg.convert.ttf(svgFile, ttfFile);
      },
      woff: (inFile, outFile) => {
        const svgFile = outFile.replace("woff", "svg");
        const ttfFile = outFile.replace("woff", "ttf");
        // Convert to SVG, the only format possible for otf
        fonts.otf.convert.svg(inFile, svgFile);
        // Convert SVG to TTF
        fonts.svg.convert.ttf(svgFile, ttfFile);
        // Convert TTF to WOFF/WOFF2
        fonts.ttf.convert.woff(ttfFile, outFile);
      },
      woff2: (inFile, outFile) => {
        const svgFile = outFile.replace("woff2", "svg");
        const ttfFile = outFile.replace("woff2", "ttf");
        // Convert to SVG, the only format possible for otf
        fonts.otf.convert.svg(inFile, svgFile);
        // Convert SVG to TTF
        fonts.svg.convert.ttf(svgFile, ttfFile);
        // Convert TTF to WOFF/WOFF2
        fonts.ttf.convert.woff2(ttfFile, outFile);
      },
    },
  },
  woff: {
    files: [],
  },
  woff2: {
    files: [],
  },
};

module.exports = fonts;
