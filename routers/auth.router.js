const authRouter = require('express').Router();

const { authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');

authRouter.post('/',
    authMiddleware.isLoginBodyValid,
    authMiddleware.loginUserMiddleware,
    authController.loginUser);

module.exports = authRouter;
