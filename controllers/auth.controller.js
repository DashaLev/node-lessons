const { CHANGE_USER_PASSWORD, NEW_USER_PASSWORD, CREATED_STATUS, FRONT_END_URL,
    FORGOT_PASSWORD_FRONT_END_URL, actionTokenTypes, LOGGED_OUT, USER_ACTIVATED
} = require('../configs');
const { O_Auth, Action, User } = require('../dataBase');
const { jwtService, emailService, passwordService } = require('../services');
const { userUtil } = require('../util');

module.exports = {
    activateUser: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await User.findByIdAndUpdate( _id, { is_active: true });

            res.status(CREATED_STATUS).json(USER_ACTIVATED);
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            const normalizedUser = userUtil.userNormalizer(user.toObject());

            await O_Auth.create({ ...tokenPair, user_id: normalizedUser._id });

            res.status(CREATED_STATUS).json({ user: normalizedUser, ...tokenPair });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const { access_token } = req;

            await O_Auth.deleteOne({ access_token });

            res.json(LOGGED_OUT);
        } catch (e) {
            next(e);
        }
    },

    sendMailChangePassword: async (req, res, next) => {
        try {
            const { _id, name, email } = req.user;

            const token = jwtService.generateActionToken(actionTokenTypes.FORGOT_PASSWORD);

            await Action.create({ token, user_id: _id });

            await emailService.sendMail(email, CHANGE_USER_PASSWORD, { userName: name,
                changePasswordUrl: FRONT_END_URL + FORGOT_PASSWORD_FRONT_END_URL + '?token=' + token, token });

            res.sendStatus(CREATED_STATUS);
        } catch (e) {
            next(e);
        }
    },

    setNewPassword: async (req, res, next) => {
        try {
            const { _id, name, email } = req.user;

            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate(_id, { password: hashedPassword });

            await emailService.sendMail(email, NEW_USER_PASSWORD, { userName: name, password });

            await O_Auth.deleteMany({ user_id: _id });

            res.sendStatus(CREATED_STATUS);
        } catch (e) {
            next(e);
        }
    }
};

