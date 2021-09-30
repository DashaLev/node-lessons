const fs = require('fs');
const path = require("path");

const mkdirPath = path.join(__dirname, 'files');
const folders = ['menOlder20', 'menYounger20', 'womenOlder20', 'womenYounger20']
const users = [
    { name: 'Olivia', gender: 'female', age: 22 },
    { name: 'Emma', gender: 'female', age: 18 },
    { name: 'Charlotte', gender: 'female', age: 34 },
    { name: 'Amelia', gender: 'female', age: 41 },
    { name: 'Mia', gender: 'female', age: 11 },
    { name: 'Jim', gender: 'male', age: 9 },
    { name: 'John', gender: 'male', age: 28 },
    { name: 'Jack', gender: 'male', age: 45 },
    { name: 'Din', gender: 'male', age: 36 },
    { name: 'Rick', gender: 'male', age: 19},
]

folders.forEach(folder => {
    fs.mkdir(path.join(mkdirPath, folder), {recursive: true}, (e) => {
        console.log(e);
    });
})

users.forEach(user => {
    let data = JSON.stringify(user)
    let {name, gender, age} = user

    if (gender === 'male' && age <= 20) {
        fs.writeFile(`${__dirname}/files/menYounger20/${name}.json`, data, (err) => {
            console.log(err);
        });
    } else if (gender === 'male' && age >= 20) {
        fs.writeFile(`${__dirname}/files/menOlder20/${name}.json`, data, (err) => {
            console.log(err);
        });
    } else if (gender === 'female' && age <= 20) {
        fs.writeFile(`${__dirname}/files/womenYounger20/${name}.json`, data, (err) => {
            console.log(err);
        });
    } else if (gender === 'female' && age >= 20) {
        fs.writeFile(`${__dirname}/files/womenOlder20/${name}.json`, data, (err) => {
            console.log(err);
        });
    }
})