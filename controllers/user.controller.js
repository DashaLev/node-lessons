const User = require('../dataBase/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}, { __v: 0 });

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res) => {
        const user = req.user;

        res.json(user);
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            const normalizedUser = userUtil.userNormalizator(newUser.toObject());

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { name } = req.body;

            const updatedUser = await User
                .findByIdAndUpdate(user_id, { name }, { new: true, fields: { __v: 0 } });

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const deletedUser = await User.findByIdAndRemove(user_id, { select: { __v: 0 } });

            res.json(deletedUser);
        } catch (e) {
            next(e);
        }
    }
};
