const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware} = require('../middlewares');
const { userRoles } = require('../configs');

router.get('/',
    userController.getUsers);

router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id',
    userMiddleware.checkUserExistMiddleware,
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.isUserBodyForUpdateValid,
    userMiddleware.checkUserExistMiddleware,
    authMiddleware.checkAccessToken,
    userController.updateUser);

router.delete('/:user_id',
    userMiddleware.checkUserExistMiddleware,
    userMiddleware.checkUserRole([
        userRoles.MANAGER,
        userRoles.ADMIN
    ]),
    authMiddleware.checkAccessToken,
    userController.deleteUser);

module.exports = router;
