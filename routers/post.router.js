const postRouter = require('express').Router();

const { postController } = require('../controllers');
const { postMiddleware, userMiddleware, authMiddleware } = require('../middlewares');

postRouter.get('/',
    postController.getPosts);

postRouter.post('/',
    postMiddleware.isPostBodyValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserExistMiddleware,
    postController.createPost);

postRouter.get('/:user_id',
    userMiddleware.checkUserExistMiddleware,
    postController.getPostsOneUserById);

postRouter.put('/:post_id',
    postMiddleware.isPostBodyForUpdateValid,
    authMiddleware.checkAccessToken,
    postMiddleware.checkPostExistMiddleware,
    postController.updatePost);

postRouter.delete('/:post_id',
    authMiddleware.checkAccessToken,
    postMiddleware.checkPostExistMiddleware,
    postController.deletePost);

postRouter.get('/:user_id/:post_id',
    userMiddleware.checkUserExistMiddleware,
    postMiddleware.checkPostExistMiddleware,
    postController.getPostById);

module.exports = postRouter;
