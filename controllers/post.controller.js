const { Post } = require('../dataBase');

module.exports = {
    getPosts: async (req, res, next) => {
        try {
            const postsOfUser = await Post.find();

            res.json(postsOfUser);
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
    },

    getPostById: (req, res) => {
        const post = req.post;

        res.json(post);
    },

    createPost: async (req, res, next) => {
        try {
            const newPost = await Post.create(req.body);

            res.json(newPost);
        } catch (e) {
            next(e);
        }
    },

    updatePost: async (req, res, next) => {
        try {
            const { post_id } = req.params;
            const { title, post_body } = req.body;

            const updatedPost = await Post
                .findByIdAndUpdate(post_id, { title, post_body }, { new: true, fields: { __v: 0 } });

            res.json(updatedPost);
        } catch (e) {
            next(e);
        }
    },

    deletePost: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            const deletedPost = await Post.findByIdAndRemove(post_id, { select: { __v: 0 } });

            res.json(deletedPost);
        } catch (e) {
            next(e);
        }
    }
};
