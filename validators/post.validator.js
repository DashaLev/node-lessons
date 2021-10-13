const joi = require('joi');

const createPostValidator = joi.object({
    title: joi
        .string()
        .alphanum()
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

module.exports = {
    createPostValidator
};

