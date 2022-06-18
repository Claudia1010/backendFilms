


const { User } = require('../models/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

//ClientController object declaration
const UsersController = {};

//METODO GET
UsersController.getUsers = (req, res) => {
    //Esta funcion llamada findAll es una funcion de Sequelize
    User.findAll()
    .then(data => {
    
        res.send(data)
    });
};


//Export
module.exports = UsersController;
