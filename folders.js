const fs = require('fs');
const path = require("path");

const mkdirPath = path.join(__dirname, 'files');

const folders = ['menOlder20', 'menYounger20', 'womenOlder20', 'womenYounger20'];

const createFolder = () => {
    folders.forEach(folder => {
        try{
            fs.mkdirSync(path.join(mkdirPath, folder), {recursive: true});
        } catch (err) {
            if (err) return err;
        }
    });
};

createFolder();