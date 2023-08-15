const express = require('express');

const usersController = require('../controllers/userController');

const router = express.Router();

router.get('/', usersController.getUsers);
router.delete('/:id', usersController.deleteUser);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.post('/forgot-password', usersController.forogotPassword);
router.get('/reset-password/:id/:token', usersController.resetPassword);
router.post('/reset-password/:id/:token', usersController.changePassword);
router.put('/personalZone', usersController.updateUserProfile);
router.put('/updateAdmin/:id', usersController.updateAdmin);
router.post('/reportABug', usersController.reportABug);
router.post('/sendComment', usersController.sendComment);

module.exports = router;
