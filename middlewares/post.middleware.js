const { Post } = require('../dataBase');
const { ErrorHandler, UPDATE_UNALLOWED_POST_FIELDS, POST_NOT_FOUND } = require('../errors');
const { postValidator } = require('../validators');

module.exports = {
    isPostBodyValid: (req, res, next) => {
        try {
            const { error, value } = postValidator.createPostValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isPostBodyForUpdateValid: (req, res, next) => {
        try {
            const { title, post_body } = req.body;

            if (req.body.length > 2 || !title && !post_body) {
                throw new ErrorHandler(UPDATE_UNALLOWED_POST_FIELDS.message, UPDATE_UNALLOWED_POST_FIELDS.status);
            }

            const { error, value } = postValidator.updatePostValidator.validate({ title, post_body });

            if (error) {
                throw new ErrorHandler(error.details[0].message, 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPostExistMiddleware: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            const post = await Post.findById(post_id).select('-__v');

            if (!post) {
                throw new ErrorHandler(POST_NOT_FOUND.message, POST_NOT_FOUND.status);
            }

            req.post = post;

            next();
        } catch (e) {
            next(e);
        }
    },
};
