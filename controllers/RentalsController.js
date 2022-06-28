

const { Rental } = require('../models/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');


const RentalsController = {};

//GET RENTALS
RentalsController.getRentals = async (req, res) => {
    let consulta = `SELECT  users.name, films.name, rentals.id
    FROM rentals
    INNER JOIN users ON users.id = rentals.userId
    INNER JOIN films ON films.id = rentals.filmId`;

    let resultado = await Rental.sequelize.query(consulta, {
        type: Rental.sequelize.QueryTypes.SELECT
    });
    
    if(resultado != 0){
        res.send(resultado[0]);
    }else {
        res.send("Tu búsqueda es estúpida y no trae nada");
    };

};

RentalsController.postRental = async (req, res) => {
    
    let filmId = req.body.filmId;
    let totalPrice = req.body.totalPrice;
    let returnDate = req.body.returnDate;

    // pick the token
    let token = req.headers.authorization.split(' ')[1];    
    // pick the user logged
    let {user} = jwt.decode(token, authConfig.secret);
    let userId = user.id;

    let consulta = `SELECT films.name
    FROM films
    WHERE films.id LIKE '${filmId}'`;

    let resultado = await Rental.sequelize.query(consulta, {
        type: Rental.sequelize.QueryTypes.SELECT
    });

    if(resultado != 0){
        Rental.create({
        
            filmId: filmId,
            userId: userId,
            totalPrice: totalPrice,
            returnDate: returnDate
       
        }).then(rental => {
            res.send((resultado[0].name )+" has been rented successfully");
    
        }).catch((error) => {
            res.send(error);
        });
    }else {
        res.send("Check the provided information");
    };
};


//PUT update a rent with the rentalId given by URL, changing the data from the body
RentalsController.updateRental = async (req, res) => {
    let rentalId = req.params.id;

    let consulta = `SELECT films.name
    FROM films
    INNER JOIN rentals ON films.id = rentals.filmId
    WHERE rentals.id LIKE '${rentalId}'`;

    let resultado = await Rental.sequelize.query(consulta, {
        type: Rental.sequelize.QueryTypes.SELECT
    });
    if(resultado != 0){
        Rental.update(req.body, {
         where: { id : rentalId }
    }).then((elem) => {
        res.send((resultado[0].name )+" has been modified successfully");
    }).catch(err => {
        console.log(err);
    });
}else {
    res.send("Check the provided information");
};
};


//DELETE
RentalsController.deleterental = async (req, res) => {
    let rentalId = req.params.id;

    let consulta = `SELECT films.name
    FROM films
    INNER JOIN rentals ON films.id = rentals.filmId
    WHERE rentals.id LIKE '${rentalId}'`;

    let resultado = await Rental.sequelize.query(consulta, {
    type: Rental.sequelize.QueryTypes.SELECT
    });
     if(resultado != 0){

        Rental.destroy({
         where : { 
            id : rentalId 
        }
    })
    .then(count => {
        if(!count){
            return res.status(404).send({error: 'No user'});
        }
        res.send(`The rent of the film ${(resultado[0].name)} has been deleted`);
    }).catch((err)=> {
        console.log(err);
    });
}else {
    res.send("Check the provided information");
};
};

//Export
module.exports = RentalsController;
