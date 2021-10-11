const authRouter = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

authRouter.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.loginUserMiddleware,
    authController.loginUser);

module.exports = authRouter;
