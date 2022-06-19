

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const FilmsController = require('../controllers/FilmsController');


//Endpoint-function links

//GET all the films 
router.get('/', FilmsController.getFilms);
//POST to add a movie only with admin permissions
router.post('/addfilm', isAdmin, FilmsController.postFilm);
//GET filter a movie by the title in the URL
router.get('/searchByName/:name', FilmsController.searchByName);
//GET filter a movie by the genre in the URL
router.get('/searchByGenre/:genre', FilmsController.searchByGenre);
//PUT update a movie with the filmID in the URL
router.put('/updatefilm/:id', isAdmin, FilmsController.updatefilm);
//DELETE delete a movie with the filmID in the URL
router.delete('/deletefilm/:id', isAdmin, FilmsController.deletefilmbyid);

//Export
module.exports = router;