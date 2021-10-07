const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userEmail = await User.findOne({ email: req.body.email });

            if (userEmail) {
                throw new Error('Email already exists');
            }
            if (!req.body.name || !req.body.email || !req.body.password) {
                throw new Error('Name, email, password are required');
            }
            if (req.body.password.length < 6 || req.body.password.length > 10) {
                throw new Error('Password length has to be longer than 6 and shorter than 10 symbols');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
