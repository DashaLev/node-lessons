const User = require('../dataBase/User');
const { compare } = require('../services/password.service');
const { authValidator } = require('../validators');


module.exports = {
    isLoginBodyValid: (req, res, next) => {
        try {
            const { error, value } = authValidator.loginUserValidator.validate(req.body);

            if (error) {
                return next({
                    message: 'Wrong email or password'
                });
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
                return next({
                    message: 'Wrong email or password'
                });
            }

            await compare(password, userExist.password);

            req.user = userExist;

            next();
        } catch (e) {
            next(e);
        }
    }
};
