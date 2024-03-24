const Express = require('express');
const router = Express.Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const UserController = require('../controllers/UserController');


router.get('/', UserController.getUsers);

router.post('/new',
    [
        check('username').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail(),
        check('password').not().isEmpty().trim().escape(),
    ],
    UserController.postUser);


router.get('/:email', UserController.findUser);

router.patch('/update/:id', [
    check('username').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('password').not().isEmpty().trim().escape(),
], UserController.updateUser);

router.delete('/delete/:id', UserController.deleteUser);

router.post('/login', [
    check('email').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
], UserController.login)

module.exports = router;