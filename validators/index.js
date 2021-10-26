const { createPostValidator, updatePostValidator } = require('./post.validator');
const { updateUserValidator, createUserValidator, userEmailValidator, userPasswordValidator,
    loginUserValidator } = require('./user.validator');

module.exports = {
    createPostValidator,
    updatePostValidator,

    createUserValidator,
    loginUserValidator,
    updateUserValidator,
    userEmailValidator,
    userPasswordValidator,
};
