const path = require("path");

const readFiles = require('../helper/readFiles');
const writeFiles = require('../helper/writeFiles');

const filePath = path.join(__dirname, '../dataBase/users.json');

module.exports = {
    getUsers: (reg,res) => {
        readFiles(filePath).then(data => res.json(data));
    },

    getUserById: (reg,res) => {
        readFiles(filePath).then(data => {
            const id = reg.params['user_id'];

            res.json(data[id - 1]);
        })
    },

    createUser: (reg,res) => {
        readFiles(filePath).then(data => {
            const user = {...reg.body, id: data.length + 1};
            const content = JSON.stringify([...data, user]);

            writeFiles(filePath, content);
            res.json(JSON.parse(content));
        })
    },

    updateUser: (reg,res) => {
        readFiles(filePath).then(data => {
            const id = reg.params['user_id'];

            data[id - 1] = {...data[id - 1], ...reg.body};
            writeFiles(filePath, JSON.stringify(data));
            res.json(data);
        })
    },

    deleteUser:(reg,res) => {
        readFiles(filePath).then(data => {
            const id = reg.params['user_id'];
            const newData = [...data];

            newData.splice(id-1, 1);
            writeFiles(filePath, JSON.stringify(newData));
            res.json(newData);
        });
    }
};