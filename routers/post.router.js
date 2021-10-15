const postRouter = require('express').Router();

const { postController } = require('../controllers');
const { postMiddleware, userMiddleware } = require('../middlewares');

postRouter.get('/',
    postController.getPosts);

postRouter.post('/',
    postMiddleware.isPostBodyValid,
    userMiddleware.checkUserExistMiddleware,
    postController.createPost);

postRouter.get('/:user_id',
    postController.getPostsOneUserById);

postRouter.put('/:post_id',
    postMiddleware.isPostBodyForUpdateValid,
    postMiddleware.checkPostExistMiddleware,
    postController.updatePost);

postRouter.delete('/:post_id',
    postMiddleware.checkPostExistMiddleware,
    postController.deletePost);

postRouter.get('/post/:post_id',
    postMiddleware.checkPostExistMiddleware,
    postController.getPostById);

module.exports = postRouter;
