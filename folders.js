const fs = require('fs');
const path = require("path");
const mkdirPath = path.join(__dirname, 'files');

const folders = ['menOlder20', 'menYounger20', 'womenOlder20', 'womenYounger20'];

const CreateFolder = () => {
    folders.forEach(folder => {
        fs.mkdir(path.join(mkdirPath, folder), {recursive: true}, (err) => {
            console.log(err);
        })
    });
};
CreateFolder();