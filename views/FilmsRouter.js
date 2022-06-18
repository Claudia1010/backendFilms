

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const FilmsController = require('../controllers/FilmsController');


//Endpoint-function links

router.get('/', FilmsController.getFilms);
router.post('/addfilm', isAdmin, FilmsController.postFilm);
router.get('/searchByName/:name', FilmsController.searchByName);
router.get('/searchByGenre/:genre', FilmsController.searchByGenre);
router.put('/updatefilm/:id', isAdmin, FilmsController.updatefilm);
router.delete('/deletefilm/:id', isAdmin, FilmsController.deletefilmbyid);

//Export
module.exports = router;