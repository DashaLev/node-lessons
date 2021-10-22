const { REGISTERED_USER, DELETED_USER, UPDATED_USER, CREATED_STATUS, NO_CONTENT_STATUS, actionTokenTypes,
    FRONT_END_URL, ACTIVATE_ACCOUNT_FRONT_END_URL
} = require('../configs');
const { User, O_Auth, Action} = require('../dataBase');
const { passwordService, emailService, jwtService} = require('../services');
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

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            const token = jwtService.generateActionToken(actionTokenTypes.ACTIVATE_ACCOUNT);

            await Action.create({ token, type:actionTokenTypes.ACTIVATE_ACCOUNT, user_id: newUser._id });

            await emailService.sendMail(email, REGISTERED_USER, { userName: name,
                activateAccountUrl: FRONT_END_URL + ACTIVATE_ACCOUNT_FRONT_END_URL + '?token=' + token });

            const normalizedUser = userUtil.userNormalizer(newUser.toObject());

            res.status(CREATED_STATUS).json({ user: normalizedUser, activate_token: token });
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

            res.status(CREATED_STATUS).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { _id, name, email } = req.user;

            await User.deleteOne({ _id });

            await emailService.sendMail(email, DELETED_USER, { userName: name });

            await O_Auth.deleteMany({ user_id: _id });

            res.sendStatus(NO_CONTENT_STATUS);
        } catch (e) {
            next(e);
        }
    }
};
