

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const UsersController = require('../controllers/UsersController');


//Endpoint-function links

router.get('/', UsersController.getUsers);

//Export
module.exports = router;