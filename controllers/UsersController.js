


const { User } = require('../models/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

//ClientController object declaration
const UsersController = {};

//GET
UsersController.getUsers = (req, res) => {
    User.findAll()
    .then(data => {
    
        res.send(data)
    });
};


//Export
module.exports = UsersController;
