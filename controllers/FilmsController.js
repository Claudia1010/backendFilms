

const { Film } = require("../models/index");
const jwt = require('jsonwebtoken');
let authConfig = require('../config/auth');

//UserController object declaration
const FilmsController = {};

FilmsController.getFilms = (req, res) => {
  Film.findAll().then((data) => {
    res.send(data);
  });
};


//Export
module.exports = FilmsController;
