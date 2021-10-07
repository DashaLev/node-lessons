const path = require('path');

const readFiles = require('../helper/readFiles');
const writeFiles = require('../helper/writeFiles');

const filePath = path.join(__dirname, '../dataBase/users.json');

module.exports = {
    getUsers: async (req, res) => {
        const data = await readFiles(filePath);

        res.json(data);
    },

    getUserById: async (req, res) => {
        const data = await readFiles(filePath);
        const id = req.params['user_id'];

        res.json(data[id - 1]);
    },

    createUser: async (req, res) => {
        const data = await readFiles(filePath);
        const user = {...req.body, id: data.length + 1};
        const content = JSON.stringify([...data, user]);

        await writeFiles(filePath, content);

        res.json(JSON.parse(content));
    },

    updateUser: async (req, res) => {
        const data = await readFiles(filePath);
        const id = req.params['user_id'];

        data[id - 1] = {...data[id - 1], ...req.body};
        await writeFiles(filePath, JSON.stringify(data));

        res.json(data);
    },

    deleteUser: async (req, res) => {
        const data = await readFiles(filePath);
        const id = req.params['user_id'];
        const newData = [...data];

        newData.splice(id-1, 1);
        await writeFiles(filePath, JSON.stringify(newData));

        res.json(newData);
    }
};