const { BAD_REQUEST_STATUS } = require('../configs');
const { User } = require('../dataBase');
const { ErrorHandler, EMAIL_ALREADY_EXISTS, ACCESS_DENIED, ENTITY_NOT_FOUND } = require('../errors');

module.exports = {
    checkIfEmailUnique: async (req, res, next) => {
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

    checkUserExistById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { _id } = req.user;

            const user = await User.findById(user_id || _id).select('-__v');

            if (!user) {
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserExistByEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email }).select('-__v');

            if (!userByEmail) {
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    validationMiddleware: (validationFunction) => (req, res, next) => {
        try {
            const { error, value } = validationFunction.validate(req.body);

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
