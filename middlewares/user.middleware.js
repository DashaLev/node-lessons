const { User } = require('../dataBase');
const { ErrorHandler, EMAIL_ALREADY_EXISTS, ACCESS_DENIED, ENTITY_NOT_FOUND, BAD_REQUEST_STATUS } = require('../errors');
const { userValidator } = require('../validators');

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
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
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
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST_STATUS);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyForUpdateValid: (req, res, next) => {
        try {

            const { error, value } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST_STATUS);
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
