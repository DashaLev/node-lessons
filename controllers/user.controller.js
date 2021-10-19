const { REGISTERED_USER, DELETED_USER, UPDATED_USER } = require('../configs');
const { User } = require('../dataBase');
const { passwordService, emailService } = require('../services');
const { userUtil } = require('../util');

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
            const { password, email, name } = req.body;

            const hashedPassword = await passwordService.hash(password);

            await emailService.sendMail(email, REGISTERED_USER, { userName: name });

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            const normalizedUser = userUtil.userNormalizer(newUser.toObject());

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

            const { email } = updatedUser;

            await emailService.sendMail(email, UPDATED_USER, { userName: name });

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const deletedUser = await User.findByIdAndRemove(user_id, { select: { __v: 0 } });

            const { name, email } = deletedUser;

            await emailService.sendMail(email, DELETED_USER, { userName: name });

            res.json(deletedUser);
        } catch (e) {
            next(e);
        }
    }
};
