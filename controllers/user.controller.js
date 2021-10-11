const User = require('../dataBase/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({}, {__v: 0});

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
            const { password } = req.body;
            const hashedPassword = await passwordService.hash(password);
            const newUser = await User.create({ ...req.body, password: hashedPassword });
            const normalizedUser = userUtil.userNormalizator(newUser);

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            const { name } = req.body;
            const updatedUser = await User.findByIdAndUpdate(user_id, { name }, { new: true, fields: {__v: 0} });

            res.json(updatedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            const deletedUser = await User.findByIdAndRemove(user_id, { select: {__v: 0} });

            res.json(deletedUser);
        } catch (e) {
            res.json(e.message);
        }
    }
};
