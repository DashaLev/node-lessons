const Post = require('../dataBase/Post');

module.exports = {
    getPosts: async (req, res, next) => {
        try {
            const postsOfUser = await Post.find();

            res.json(postsOfUser);
        } catch (e) {
            next(e);
        }
    },

    createPost: async (req, res, next) => {
        try {
            const newPost = await Post.create(req.body);

            res.json(newPost);
        } catch (e) {
            next(e);
        }
    },

    getPostsOneUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const postsOneUser = await Post.find({ user_id });

            res.json(postsOneUser);
        } catch (e) {
            next(e);
        }
    }
};

