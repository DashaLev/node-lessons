const fs = require('fs');

function writeFiles(filePath,content) {
    fs.writeFile(filePath, content, err => {
        if (err) return err;
    })
}

module.exports = writeFiles;