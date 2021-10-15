const joi = require('joi');

const createPostValidator = joi.object({
    title: joi
        .string()
        .min(3)
        .required(),
    post_body: joi
        .string()
        .required()
        .min(30),
    user_id: joi
        .string()
        .required(),
});

const updatePostValidator = joi.object({
    title: joi
        .string()
        .min(3),
    post_body: joi
        .string()
        .min(30)
});

module.exports = {
    createPostValidator,
    updatePostValidator
};

