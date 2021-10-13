const User = require('../dataBase/User');
const { userValidator } = require('../validators');
const { ErrorHandler, EMAIL_ALREADY_EXISTS, USER_NOT_FOUND,
    UPDATE_UNALLOWED_USER_FIELDS, ACCESS_DENIED } = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userUniqueEmail = await User.findOne({ email });

            if (userUniqueEmail) {
                throw new ErrorHandler(EMAIL_ALREADY_EXISTS.message, EMAIL_ALREADY_EXISTS.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserExistMiddleware: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const userId_inPost = req.body.user_id;

            const user = await User.findById(user_id || userId_inPost).select('-__v');

            if (!user) {
                throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.status);
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
                throw new ErrorHandler(UPDATE_UNALLOWED_USER_FIELDS.message, UPDATE_UNALLOWED_USER_FIELDS.status);
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
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(ACCESS_DENIED.message, ACCESS_DENIED.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
