

const { Rental } = require('../models/index');

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// let authConfig = require('../config/auth');

//Declaro el objeto UsuariosController (siempre igual para cada controller)
const RentalsController = {};

//METODO GET RENTS
RentalsController.getRentals = (req, res) => {
    //Esta funcion llamada findAll es una funcion de Sequelize
    Rental.findAll()
    .then(data => {
    
        res.send(data)
    });
};


//Export
module.exports = RentalsController;
