const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        const user = req.user;

        res.json(user);
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            const updatedUser = await User.findByIdAndUpdate(user_id, req.body);

            res.json(updatedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            const deletedUser = await User.findByIdAndDelete(user_id);

            res.json(deletedUser);
        } catch (e) {
            res.json(e.message);
        }
    }
};
