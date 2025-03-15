const express = require('express');
const userController = require('../controller/userController.js');

const router = express.Router();

// Routes for User CRUD
router.post('/create', userController.createUser);
router.post('/login', userController.userLogin);
router.get('/getalluser', userController.getUsers);
router.get('/getuserbyid', userController.getUserById);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);

module.exports = router;
