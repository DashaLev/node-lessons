const router = require('express').Router();

const { userRoles } = require('../configs');
const { userController } = require('../controllers');
const { userMiddleware, authMiddleware} = require('../middlewares');
const { createUserValidator, updateUserValidator } = require('../validators');

router.get('/',
    userController.getUsers);

router.post('/',
    userMiddleware.userValidationMiddleware(createUserValidator),
    // userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id',
    userMiddleware.checkUserExistMiddleware,
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.userValidationMiddleware(updateUserValidator),
    // userMiddleware.isUserBodyForUpdateValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserExistMiddleware,
    userController.updateUser);

router.delete('/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserExistMiddleware,
    userMiddleware.checkUserRole([
        userRoles.MANAGER,
        userRoles.ADMIN
    ]),
    userController.deleteUser);

module.exports = router;
