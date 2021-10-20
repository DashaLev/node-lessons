const { User } = require('../dataBase');
const { ErrorHandler, EMAIL_ALREADY_EXISTS, ACCESS_DENIED, ENTITY_NOT_FOUND, BAD_REQUEST_STATUS } = require('../errors');

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

            const { email } = req.body;

            const user = await User.findById(user_id || userId_inPost).select('-__v');

            const userByEmail = await User.findOne({ email }).select('-__v');

            if (!user && user_id || !user && userId_inPost || !userByEmail && email) {
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
            }

            req.user = user || userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    userValidationMiddleware: (validationFunction) => (req, res, next) => {
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
