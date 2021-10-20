const { O_Auth, Action } = require('../dataBase');
const { CHANGE_USER_PASSWORD } = require('../configs');
const { jwtService, emailService } = require('../services');
const { userUtil } = require('../util');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            const normalizedUser = userUtil.userNormalizer(user.toObject());

            await O_Auth.create({
                ...tokenPair,
                user_id: normalizedUser._id
            });

            res.json({
                user: normalizedUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const { access_token } = req;

            await O_Auth.deleteOne({ access_token });

            res.json('You are logged out');

        } catch (e) {
            next(e);
        }
    },

    logoutUserFromAllDevices: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await O_Auth.deleteMany({ user_id: _id });

            res.json('Success');
        } catch (e) {
            next(e);
        }
    },

    createActionToken: async (req, res, next) => {
        try {
            const user = req.user;

            const { _id, name, email } = user;

            const token = jwtService.generateActionToken();

            await Action.create({
                token,
                user_id: _id
            });

            await emailService.sendMail(email, CHANGE_USER_PASSWORD, { userName: name, token });

            res.json({
                user,
                token
            });
        } catch (e) {
            next(e);
        }
    }
};

