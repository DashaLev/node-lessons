const User = require('../dataBase/User');
const { compare } = require('../services/password.service');
const authValidator = require('../validators/auth.validator');

module.exports = {
    isLoginBodyValid: (req, res, next) => {
        try {
            const { error, value } = authValidator.loginUserValidator.validate(req.body);

            if (error) {
                throw new Error('Wrong email or password');
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    loginUserMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userExist = await User.findOne({ email }).select('+password');

            if (!userExist) {
                throw new Error('Wrong email or password');
            }

            await compare(password, userExist.password);

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
