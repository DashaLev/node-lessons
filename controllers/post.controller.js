const { CREATED_STATUS, NO_CONTENT_STATUS } = require('../configs');
const { Post } = require('../dataBase');
const { postService } = require('../services');

module.exports = {
    getPosts: async (req, res, next) => {
        try {
            const posts = await postService.getAllPosts(req.query);

            res.json(posts);
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

            res.status(CREATED_STATUS).json(newPost);
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

            res.status(CREATED_STATUS).json(updatedPost);
        } catch (e) {
            next(e);
        }
    },

    deletePost: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            await Post.deleteOne(post_id);

            res.sendStatus(NO_CONTENT_STATUS);
        } catch (e) {
            next(e);
        }
    }
};

