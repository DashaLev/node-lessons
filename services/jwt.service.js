const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS, JWT_ACTION_SECRET } = require('../configs');
const { ErrorHandler, INVALID_TOKEN } = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secretWord = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
        }
    },

    generateActionToken: () => jwt.sign({}, JWT_ACTION_SECRET, { expiresIn: '24h' }),

    verifyActionToken: async (token) => {
        try {
            await jwt.verify(token, JWT_ACTION_SECRET);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
        }
    },
};
