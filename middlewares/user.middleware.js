const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userUniqueEmail = await User.findOne({ email });

            if (userUniqueEmail) {
                throw new Error('Email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    checkUserExistMiddleware: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new Error('There is no User with that ID');
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isUserBodyValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isUserBodyForUpdateValid: (req, res, next) => {
        try {
            const { name } = req.body;

            if (Object.keys(req.body).length > 1 || !name) {
                throw new Error('You can update only field - Name');
            }

            const { error, value } = userValidator.updateUserValidator.validate({ name });

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
