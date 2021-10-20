const { Post } = require('../dataBase');
const { BAD_REQUEST_STATUS } = require('../configs');
const { ErrorHandler, ENTITY_NOT_FOUND } = require('../errors');
const { postValidator } = require('../validators');

module.exports = {
    isPostBodyValid: (req, res, next) => {
        try {
            const { error, value } = postValidator.createPostValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST_STATUS);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isPostBodyForUpdateValid: (req, res, next) => {
        try {
            const { error, value } = postValidator.updatePostValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST_STATUS);
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
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
            }

            req.post = post;

            next();
        } catch (e) {
            next(e);
        }
    }
};

