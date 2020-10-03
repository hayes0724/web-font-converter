const fs = require("fs");
const fsExtra = require('fs-extra')
const fonts = require('../src/lib/fonts')
const fileName = 'Roboto-Regular'
const fileIn = `./tests/fonts/${fileName}`
const fileOut = `./tests/output/${fileName}`

const createOutputDirectory = () => {
    if (!fs.existsSync('./tests/output/')){
        fs.mkdirSync('./tests/output/');
    }
}

beforeAll(() => {
    createOutputDirectory()
})

afterEach(() => {
    fsExtra.emptyDirSync('./tests/output/')
});

describe('TTF input font tests', () => {
    test('convert ttf to woff', () => {
        fonts.ttf.convert.woff(`${fileIn}.ttf`, `${fileOut}.woff`)
        const size = fs.statSync(`${fileOut}.woff`).size
        expect(size).toEqual(89984);
    });

    test('convert ttf to woff2', () => {
        fonts.ttf.convert.woff2(`${fileIn}.ttf`, `${fileOut}.woff2`)
        const size = fs.statSync(`${fileOut}.woff2`).size
        expect(size).toEqual(66296);
    });
})

describe('OTF input font tests', () => {
    test('convert otf to woff', () => {
        fonts.otf.convert.woff(`${fileIn}.otf`, `${fileOut}.woff`)
        const size = fs.statSync(`${fileOut}.woff`).size
        expect(size / 100).toBeCloseTo(487.76, 1);
    });

    test('convert otf to woff2', () => {
        fonts.otf.convert.woff2(`${fileIn}.otf`, `${fileOut}.woff2`)
        const size = fs.statSync(`${fileOut}.woff2`).size
        expect(size).toBeGreaterThanOrEqual(35000);
        expect(size).toBeLessThanOrEqual(35300);
    });

    test('convert otf to ttf', () => {
        fonts.otf.convert.ttf(`${fileIn}.otf`, `${fileOut}.ttf`)
        const size = fs.statSync(`${fileOut}.ttf`).size
        expect(size).toEqual(104408);
    });

    test('convert otf to svg', () => {
        fonts.otf.convert.svg(`${fileIn}.otf`, `${fileOut}.svg`)
        const size = fs.statSync(`${fileOut}.svg`).size
        expect(size).toEqual(492329);
    });
})

describe('SVG input font tests', () => {
    test('convert svg to ttf', () => {
        fonts.svg.convert.ttf(`${fileIn}.svg`, `${fileOut}.ttf`)
        const size = fs.statSync(`${fileOut}.ttf`).size
        expect(size).toEqual(104408);
    });

    test('convert svg to woff', () => {
        fonts.svg.convert.woff(`${fileIn}.svg`, `${fileOut}.woff`)
        const size = fs.statSync(`${fileOut}.woff`).size
        expect(size).toEqual(48776);
    });

    test('convert svg to woff2', () => {
        fonts.svg.convert.woff2(`${fileIn}.svg`, `${fileOut}.woff2`)
        const size = fs.statSync(`${fileOut}.woff2`).size
        expect(size).toBeGreaterThanOrEqual(35000);
        expect(size).toBeLessThanOrEqual(35300);
    });
})
