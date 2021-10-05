const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

async function readFiles(filePath) {
    const data = await readFilePromise(filePath);

    return JSON.parse(data.toString());
}

module.exports = readFiles;