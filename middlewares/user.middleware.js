const User = require('../dataBase/User');
const { userValidator } = require('../validators');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userUniqueEmail = await User.findOne({ email });

            if (userUniqueEmail) {
                return next({
                    message:'Email already exists'
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserExistMiddleware: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id, {__v: 0});

            if (!user) {
                return next({
                    message:'There is no User with that ID',
                    status:404
                });
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                return next({
                    message: error.details[0].message
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyForUpdateValid: (req, res, next) => {
        try {
            const { name } = req.body;

            if (Object.keys(req.body).length > 1 || !name) {
                return next({
                    message: 'You can update only field - Name'
                });
            }

            const { error, value } = userValidator.updateUserValidator.validate({ name });

            if (error) {
                return next({
                    message: error.details[0].message
                });
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
