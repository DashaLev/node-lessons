const { postController } = require('../controllers');
const {postMiddleware, userMiddleware} = require('../middlewares');

const postRouter = require('express').Router();

postRouter.get('/',
    postController.getPosts);

postRouter.post('/',
    postMiddleware.isPostBodyValid,
    userMiddleware.checkUserExistMiddleware,
    postController.createPost);

postRouter.get('/:user_id',
    postController.getPostsOneUserById);

module.exports = postRouter;
