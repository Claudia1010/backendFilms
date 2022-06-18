

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const FilmsController = require('../controllers/FilmsController');


//Endpoint-function links

router.get('/', FilmsController.getFilms);
router.post('/addfilm', isAdmin, FilmsController.postFilm);



//Export
module.exports = router;