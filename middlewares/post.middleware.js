const { Post } = require('../dataBase');
const { ErrorHandler, ENTITY_NOT_FOUND } = require('../errors');

module.exports = {
    checkPostExist: async (req, res, next) => {
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

