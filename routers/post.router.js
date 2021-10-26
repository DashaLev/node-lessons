const postRouter = require('express').Router();

const { postController } = require('../controllers');
const { postMiddleware, userMiddleware, authMiddleware } = require('../middlewares');
const { createPostValidator, updatePostValidator } = require('../validators');

postRouter.get('/',
    postController.getPosts);

postRouter.post('/',
    userMiddleware.validationMiddleware(createPostValidator),
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserExistById,
    postController.createPost);

postRouter.get('/:user_id',
    userMiddleware.checkUserExistById,
    postController.getPostsOneUserById);

postRouter.put('/:post_id',
    userMiddleware.validationMiddleware(updatePostValidator),
    authMiddleware.checkAccessToken,
    postMiddleware.checkPostExist,
    postController.updatePost);

postRouter.delete('/:post_id',
    authMiddleware.checkAccessToken,
    postMiddleware.checkPostExist,
    postController.deletePost);

postRouter.get('/:user_id/:post_id',
    userMiddleware.checkUserExistById,
    postMiddleware.checkPostExist,
    postController.getPostById);

module.exports = postRouter;
