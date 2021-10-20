const { updateUserValidator, createUserValidator, updateUserPasswordValidator } = require('./user.validator');

module.exports = {
    authValidator: require('./auth.validator'),
    postValidator: require('./post.validator'),

    createUserValidator,
    updateUserValidator,
    updateUserPasswordValidator
};
