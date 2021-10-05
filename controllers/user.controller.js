const path = require("path");
const readFiles = require('../helper/readFiles');
const writeFiles = require('../helper/writeFiles');

const filePath = path.join(__dirname, '../dataBase/users.json');

module.exports = {
    getUsers: (reg,res) => {
        readFiles(filePath).then(data => res.json(data));
    },

    getUserById: (reg,res) => {
        const {user_id} = reg.params;

        readFiles(filePath).then(data => {

            for (const item in data) {
                if (data[item].id === Number(user_id)) {
                   res.json(data[item]);
                }
            }
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
        const { user_id } = reg.params;

        readFiles(filePath).then(data => {
            const newData = [];

            for (const item in data) {
                if (data[item].id === Number(user_id)) {
                    const updatedUser = {...data[item], ...reg.body};
                    newData.push(updatedUser)
                }
                if (data[item].id !== Number(user_id)) {
                    newData.push(data[item])
                }
            }
            newData.sort((a,b) => a.id - b.id);
            writeFiles(filePath, JSON.stringify(newData));
            res.json(newData);
        })
    },

    deleteUser:(reg,res) => {
        const {user_id} = reg.params;

        readFiles(filePath).then(data => {
            const newData = [];

            for (const item in data) {
                if (data[item].id !== Number(user_id)) {
                    newData.push(data[item])
                }
            }
            writeFiles(filePath, JSON.stringify(newData));
            res.json(newData);
        });
    }
};