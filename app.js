const fs = require('fs');

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

// const

const CreateUsers = () => {
    users.forEach(item => {
        const data = JSON.stringify(item);
        const {name, gender, age} = item;
        if (gender === 'male') {
            age <= 20 ? fs.writeFile(`${__dirname}/files/menYounger20/${name}.json`, data, (err) => {
                console.log(err);
                return;
            }) : fs.writeFile(`${__dirname}/files/menOlder20/${name}.json`, data, (err) => {
                console.log(err);
            });
        } else if (gender === 'female') {
            age <= 20 ?  fs.writeFile(`${__dirname}/files/womenYounger20/${name}.json`, data, (err) => {
                console.log(err);
                return;
            }) : fs.writeFile(`${__dirname}/files/womenOlder20/${name}.json`, data, (err) => {
                console.log(err);
                return;
            });
        }
    });
};
CreateUsers();