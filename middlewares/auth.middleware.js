const User = require('../dataBase/User');

module.exports = {
    loginUserMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userExist = await User.findOne({email, password});

            if (!userExist) {
                throw new Error('There is no User with that email and password');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
