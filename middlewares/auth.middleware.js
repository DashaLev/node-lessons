const User = require('../dataBase/User');
const { compare } = require('../services/password.service');

module.exports = {
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
