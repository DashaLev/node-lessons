const {
    ACCESS_DENIED,
    EMAIL_ALREADY_EXISTS,
    ENTITY_NOT_FOUND,
    INVALID_TOKEN,
    WRONG_EMAIL_OR_PASSWORD,
    WRONG_TOKEN_TYPE
} = require('./errors.list');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    ACCESS_DENIED,
    EMAIL_ALREADY_EXISTS,
    ENTITY_NOT_FOUND,
    INVALID_TOKEN,
    WRONG_EMAIL_OR_PASSWORD,
    WRONG_TOKEN_TYPE
};
