

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const RentalsController = require('../controllers/RentalsController');


//Endpoint-function links

router.get('/', RentalsController.getRentals);



//Export
module.exports = router;