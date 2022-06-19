

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const UsersController = require('../controllers/UsersController');


//Endpoint-function links

//GET all the users only by the admin 
router.get('/', isAdmin, UsersController.getUsers);
//POST to register a user 
router.post('/register', UsersController.postUser);
//POST for the login of the registered user where the token will be given
router.post('/login', UsersController.loginUser);
//GET to see the profile details from a specific user providing the email by URL
router.get('/profile/:email', auth, UsersController.getuserbyemail);
//PUT to update the profile details from a specific user providing the userId by URL
router.put('/updateuser/:id', auth, UsersController.updateUser);
//DELETE to remove a user only by the admin with userId from the URL
router.delete('/deleteuser/:id', isAdmin, UsersController.deleteuser);

//Export
module.exports = router;