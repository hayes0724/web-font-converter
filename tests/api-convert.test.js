const fs = require("fs");
const fsExtra = require('fs-extra')
const { convertFont } = require('../src/index')
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
        convertFont(`${fileIn}.ttf`, `${fileOut}.woff`)
        const size = fs.statSync(`${fileOut}.woff`).size
        expect(size).toEqual(89984);
    });

    test('convert ttf to woff2', () => {
        convertFont(`${fileIn}.ttf`, `${fileOut}.woff2`)
        const size = fs.statSync(`${fileOut}.woff2`).size
        expect(size).toEqual(66296);
    });
})

describe('OTF input font tests', () => {
    test('convert otf to woff', () => {
        convertFont(`${fileIn}.otf`, `${fileOut}.woff`)
        const size = fs.statSync(`${fileOut}.woff`).size
        expect(size / 100).toBeCloseTo(487.76, 1);
    });

    test('convert otf to woff2', () => {
        convertFont(`${fileIn}.otf`, `${fileOut}.woff2`)
        const size = fs.statSync(`${fileOut}.woff2`).size
        expect(size).toBeGreaterThanOrEqual(35000);
        expect(size).toBeLessThanOrEqual(35300);
    });

    test('convert otf to ttf', () => {
        convertFont(`${fileIn}.otf`, `${fileOut}.ttf`)
        const size = fs.statSync(`${fileOut}.ttf`).size
        expect(size).toEqual(104408);
    });

    test('convert otf to svg', () => {
        convertFont(`${fileIn}.otf`, `${fileOut}.svg`)
        const size = fs.statSync(`${fileOut}.svg`).size
        expect(size).toEqual(492329);
    });
})

describe('SVG input font tests', () => {
    test('convert svg to ttf', () => {
        convertFont(`${fileIn}.svg`, `${fileOut}.ttf`)
        const size = fs.statSync(`${fileOut}.ttf`).size
        expect(size).toEqual(104408);
    });

    test('convert svg to woff', () => {
        convertFont(`${fileIn}.svg`, `${fileOut}.woff`)
        const size = fs.statSync(`${fileOut}.woff`).size
        expect(size).toEqual(48776);
    });

    test('convert svg to woff2', () => {
        convertFont(`${fileIn}.svg`, `${fileOut}.woff2`)
        const size = fs.statSync(`${fileOut}.woff2`).size
        expect(size).toBeGreaterThanOrEqual(35000);
        expect(size).toBeLessThanOrEqual(35300);
    });
})
