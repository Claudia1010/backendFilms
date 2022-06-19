

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const RentalsController = require('../controllers/RentalsController');


//Endpoint-function links
//GET all the rentals 
router.get('/', isAdmin, RentalsController.getRentals);
//POST to rent a movie with the auth token
router.post('/rentfilm', auth, RentalsController.postRental);
//PUT to update the rent with the rentID by URL
router.put('/updaterental/:id', isAdmin, RentalsController.updateRental);
//DELETE the rent giving the filmID by URL
router.delete('/deleterental/:id', isAdmin, RentalsController.deleterental);



//Export
module.exports = router;