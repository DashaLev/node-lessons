const fs = require('fs');
const path = require("path");

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
];

const checkUser = (item, data,folderNameYounger,folderNameOlder) => {

    item.age <= 20 ?

        fs.writeFile(path.join(__dirname, 'files', folderNameYounger,`${item.name}.json`), data, (err) => {
            // console.log(err);
            return err;
        }) :

        fs.writeFile(path.join(__dirname, 'files', folderNameOlder,`${item.name}.json`), data, (err) => {
            // console.log(err);
            return err;
        });
};

const createUsers = () => {

    users.map(user => {

        const data = JSON.stringify(user);

        user.gender === "female" ?

            checkUser(user, data, 'womenYounger20','womenOlder20') :

            checkUser(user, data,'menYounger20', 'menOlder20');

    });
};

createUsers();