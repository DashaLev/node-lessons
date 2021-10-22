const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS, FORGOT_PASSWORD, JWT_FORGOT_PASSWORD_SECRET } = require('../configs');
const { ErrorHandler, INVALID_TOKEN, WRONG_TOKEN_TYPE} = require('../errors');

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

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = JWT_FORGOT_PASSWORD_SECRET;
                break;
            default:
                throw new ErrorHandler( WRONG_TOKEN_TYPE.message, WRONG_TOKEN_TYPE.status);
        }

        return jwt.sign({}, secretWord, { expiresIn: '24h' });
    },

    verifyActionToken: async (token, actionTokenType) => {
        try {
            let secretWord;

            switch (actionTokenType) {
                case FORGOT_PASSWORD:
                    secretWord = JWT_FORGOT_PASSWORD_SECRET;
                    break;
                default:
                    throw new ErrorHandler( WRONG_TOKEN_TYPE.message, WRONG_TOKEN_TYPE.status);
            }

            await jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
        }
    },
};
