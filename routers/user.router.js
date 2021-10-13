const router = require('express').Router();

const { USER } = require('../configs/user-roles.enum');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

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
    userController.updateUser);

router.delete('/:user_id',
    userMiddleware.checkUserExistMiddleware,
    userMiddleware.checkUserRole([USER]),
    userController.deleteUser);

module.exports = router;
