

const { Film } = require("../models/index");
const jwt = require('jsonwebtoken');
let authConfig = require('../config/auth');

//UserController object declaration
const FilmsController = {};

FilmsController.getFilms = (req, res) => {
  //Esta funcion llamada findAll es una funcion de Sequelize
  Film.findAll().then((data) => {
    res.send(data);
  });
};


//Export
module.exports = FilmsController;
