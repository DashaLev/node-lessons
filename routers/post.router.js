const postRouter = require('express').Router();

const { postController } = require('../controllers');
const { postMiddleware, userMiddleware, authMiddleware} = require('../middlewares');

postRouter.get('/',
    postController.getPosts);

postRouter.post('/',
    postMiddleware.isPostBodyValid,
    userMiddleware.checkUserExistMiddleware,
    authMiddleware.checkAccessToken,
    postController.createPost);

postRouter.get('/:user_id',
    userMiddleware.checkUserExistMiddleware,
    postController.getPostsOneUserById);

postRouter.put('/:post_id',
    postMiddleware.isPostBodyForUpdateValid,
    postMiddleware.checkPostExistMiddleware,
    authMiddleware.checkAccessToken,
    postController.updatePost);

postRouter.delete('/:post_id',
    postMiddleware.checkPostExistMiddleware,
    authMiddleware.checkAccessToken,
    postController.deletePost);

postRouter.get('/:user_id/:post_id',
    userMiddleware.checkUserExistMiddleware,
    postMiddleware.checkPostExistMiddleware,
    postController.getPostById);

module.exports = postRouter;
