

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const RentalsController = require('../controllers/RentalsController');


//Endpoint-function links
//GET all the rentals only with admin rights
router.get('/', isAdmin, RentalsController.getRentals);
//POST to rent a movie with the auth token given in the login 
router.post('/rentfilm', auth, RentalsController.postRental);
//PUT to update a rent with the rentID given in the URL, only by the admin
router.put('/updaterental/:id', isAdmin, RentalsController.updateRental);
//DELETE the rent giving the filmID in the URL, only by the admin 
router.delete('/deleterental/:id', isAdmin, RentalsController.deleterental);



//Export
module.exports = router;