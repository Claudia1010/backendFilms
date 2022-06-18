

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

//agrega peliculas por atributos en el body
FilmsController.postFilm = async (req, res) => {

  let name = req.body.name;
  let description = req.body.description;
  let release_date = req.body.release_date;
  let adult = req.body.adult;
  let genre = req.body.genre;
  let length = req.body.length;
  let price = req.body.price;
  let image = req.body.image;

  // if(name === null || name == "" || name == undefined){

  //     res.send("No has introducido el nombre de la pelicula");

  // }else{
  Film.create({
    name: name,
    description: description,
    release_date: release_date,
    adult: adult,
    genre: genre,
    length: length,
    price: price,
    image: image
  })
    .then((film) => {
      res.send(`${film.name}, added successfully`);
    })
    .catch((error) => {
      res.send(error);
    });
};




//Export
module.exports = FilmsController;
