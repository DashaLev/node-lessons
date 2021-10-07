const User = require("../dataBase/User");

module.exports = {
    loginUser: async (req, res) => {
        try {
            const userEmail = await User.findOne({ email: req.body.email, password: req.body.password});

            if (!userEmail) {
                throw new Error('There is no User with that email and password');
            }

            res.json('You are logged in');
        } catch (e) {
            res.json(e.message);
        }
    }
};
