const fs = require('fs');
const path = require("path");

const pathUsersDirFemale = path.join(__dirname,'users','female_users');
const pathUsersDirMale = path.join(__dirname,'users','male_users');

const ChangeFileFolder = (pathUsersDir,gender,newPathUsersDir) => {
    fs.readdir(pathUsersDir,(err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        data.forEach(file => {
            fs.readFile(path.join(pathUsersDir, file),(err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const dataParse = JSON.parse(data);
                if (dataParse.gender === gender) {
                    fs.rename(path.join(pathUsersDir, file), path.join(newPathUsersDir, file), (err) => {
                        console.log(err);
                    })
                }
            });
        });
    });
};

ChangeFileFolder(pathUsersDirFemale, "male", pathUsersDirMale);
ChangeFileFolder(pathUsersDirMale,"female",pathUsersDirFemale);
