const { User, O_Auth } = require('../dataBase');
const { AUTHORIZATION, REFRESH } = require('../configs');
const { ErrorHandler, WRONG_EMAIL_OR_PASSWORD, INVALID_TOKEN } = require('../errors');
const { passwordService, jwtService } = require('../services');
const { authValidator } = require('../validators');

module.exports = {
    isLoginBodyValid: (req, res, next) => {
        try {
            const { error, value } = authValidator.loginUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    loginUserMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const userExist = await User.findOne({ email }).select('+password');

            if (!userExist) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            await passwordService.compare(password, userExist.password);

            req.user = userExist;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({ access_token: token })
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            req.user = tokenResponse.user_id;
            req.tokenValue = tokenResponse.access_token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, REFRESH);

            const tokenResponse = await O_Auth
                .findOne({ refresh_token: token })
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await O_Auth.remove({ refresh_token: token });

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
