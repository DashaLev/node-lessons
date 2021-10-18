const authRouter = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

authRouter.post('/',
    authMiddleware.isLoginBodyValid,
    authMiddleware.loginUserMiddleware,
    authController.loginUser);

authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.loginUser);

authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logoutUser);

authRouter.post('/logout_all_devices',
    authMiddleware.checkAccessToken,
    authController.logoutUserFromAllDevices);

module.exports = authRouter;
