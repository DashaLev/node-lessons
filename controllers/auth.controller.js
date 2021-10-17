const { O_Auth } = require('../dataBase');
const { jwtService } = require('../services');
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
            await O_Auth.findOneAndDelete({ access_token: req.tokenValue });

            res.json('You are logged out');

        } catch (e) {
            next(e);
        }
    },

    logoutUserFromAllDevices: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await O_Auth.deleteMany({ user_id: _id });

            res.json('You are logged out from all devices');
        } catch (e) {
            next(e);
        }
    }
};

