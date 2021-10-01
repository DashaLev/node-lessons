const fs = require('fs');
const path = require("path");

const mkdirPath = path.join(__dirname, 'files');

const folders = ['menOlder20', 'menYounger20', 'womenOlder20', 'womenYounger20'];

const createFolder = () => {
    folders.forEach(folder => {
        fs.mkdirSync(path.join(mkdirPath, folder), {recursive: true}, err => {
            if (err) return err;
        });
    });
};

createFolder();