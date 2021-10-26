const { createPostValidator, updatePostValidator } = require('./post.validator');
const { updateUserValidator, createUserValidator, updateUserPasswordValidator,
    loginUserValidator } = require('./user.validator');

module.exports = {
    createPostValidator,
    updatePostValidator,

    createUserValidator,
    updateUserValidator,
    updateUserPasswordValidator,
    loginUserValidator
};
