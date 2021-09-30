const fs = require('fs');
const path = require("path");

const pathUsersDir = path.join(__dirname,'users')

fs.readdirSync(pathUsersDir).forEach(directory => {

    fs.readdirSync(path.join(pathUsersDir,directory)).forEach(file => {

        fs.readFile(path.join(pathUsersDir, directory, file),(err, data) => {

            if (err) {
                console.log(err)
                return;
            }

            let directoryName = directory.split('_')[0]

            if (JSON.parse(data).gender !== directoryName) {

                JSON.parse(data).gender === "male" ?

                fs.rename(path.join(pathUsersDir, directory, file), path.join(pathUsersDir, 'male_users', file), (err) => {
                    console.log(err)
                }) :

                fs.rename(path.join(pathUsersDir, directory, file), path.join(pathUsersDir, 'female_users', file), (err) => {
                    console.log(err)
                })
            }

       })
   });

})
