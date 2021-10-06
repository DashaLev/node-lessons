const fs = require('fs');
const util = require('util');

const writeFilePromise = util.promisify(fs.writeFile);

async function writeFiles(filePath,content) {
    await writeFilePromise(filePath, content);
}

module.exports = writeFiles;
