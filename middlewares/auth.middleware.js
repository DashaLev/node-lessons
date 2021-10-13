const User = require('../dataBase/User');
const { compare } = require('../services/password.service');
const { authValidator } = require('../validators');
const { ErrorHandler, WRONG_EMAIL_OR_PASSWORD } = require('../errors');

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

            await compare(password, userExist.password);

            req.user = userExist;

            next();
        } catch (e) {
            next(e);
        }
    }
};
