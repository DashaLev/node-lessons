const { EMAIL_ALREADY_EXISTS,
    USER_NOT_FOUND,
    UPDATE_UNALLOWED_USER_FIELDS,
    ACCESS_DENIED,
    WRONG_EMAIL_OR_PASSWORD } = require('./errors.list');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    EMAIL_ALREADY_EXISTS,
    USER_NOT_FOUND,
    UPDATE_UNALLOWED_USER_FIELDS,
    ACCESS_DENIED,
    WRONG_EMAIL_OR_PASSWORD
};
