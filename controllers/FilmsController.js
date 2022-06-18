

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

//POST add films by body only with admin permission
FilmsController.postFilm = async (req, res) => {

  let name = req.body.name;
  let description = req.body.description;
  let release_date = req.body.release_date;
  let adult = req.body.adult;
  let genre = req.body.genre;
  let length = req.body.length;
  let price = req.body.price;
  let image = req.body.image;

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


//GET search by film name by URL
FilmsController.searchByName = async (req, res) => {
    let name = req.params.name;
    let consult = `SELECT * FROM films WHERE name LIKE '%${name}%'`;
    let result = await Film.sequelize.query(consult, {
              type: Film.sequelize.QueryTypes.SELECT
    });
    if(result != 0){
      res.send(result)
    } else {
         res.send(`The film ${name} is not available at the films database`)
  }
};

//GET search by film genre by URL
FilmsController.searchByGenre = async (req, res) => {
  let genre = req.params.genre;
  let consult = `SELECT name, description, release_date, adult, genre, length, price FROM films WHERE genre like '%${genre}%' ORDER BY name ASC`;
  let result = await Film.sequelize.query(consult, {
            type: Film.sequelize.QueryTypes.SELECT
  });
  if(result != 0){
    res.send(result)
  } else {
       res.send(`The genre ${genre} is not available at the films database`)
}
};

 //PUT update films by URL only with admin permissions
 FilmsController.updatefilm =(req, res) => {
  let filmId = req.params.id;
  Film.update(req.body, {
      where: { id : filmId }
  }).then((elem) => {
      res.send(`El film con id ${filmId} ha sido modificado`);
  }).catch(err => {
      console.log(err);
  });
}

//DELETE the film with the id by URL only with admin permissions
FilmsController.deletefilmbyid = (req, res) => {
  let filmId = req.params.id;
  Film.destroy({
       where : { 
          id : filmId 
      }
  })
  .then(count => {
      if(!count){
          return res.status(404).send({error: 'No user'});
      }
      res.send(`${filmId}, deleted successfully`);
  }).catch((err)=> {
      console.log(err);
  });
}


//Export
module.exports = FilmsController;
