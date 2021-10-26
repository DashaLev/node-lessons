const { AUTHORIZATION, REFRESH, ACCESS } = require('../configs');
const { User, O_Auth, Action } = require('../dataBase');
const { ErrorHandler, WRONG_EMAIL_OR_PASSWORD, INVALID_TOKEN } = require('../errors');
const { passwordService, jwtService } = require('../services');

module.exports = {
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

            await jwtService.verifyToken(token, ACCESS);

            const tokenResponse = await O_Auth.findOne({ access_token: token });

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            req.user = tokenResponse.user_id;
            req.access_token = tokenResponse.access_token;

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

            const tokenResponse = await O_Auth.findOne({ refresh_token: token });

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await O_Auth.deleteOne({ refresh_token: token });

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenResponse = await Action.findOne({ token });

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await Action.deleteOne({ token });

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
