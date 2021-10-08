const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                throw new Error('Name, email, password are required');
            }
            if (password.length < 6 || password.length > 10) {
                throw new Error('Password length has to be longer than 6 and shorter than 10 symbols');
            }

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
    }
};
