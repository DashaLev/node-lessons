const authRouter = require('express').Router();

const { authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');

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
