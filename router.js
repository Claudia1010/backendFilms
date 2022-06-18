

const router = require('express').Router();

const UsersRouter = require('./views/UsersRouter');

const FilmsRouter = require('./views/FilmsRouter');

const RentalsRouter = require('./views/RentalsRouter');


router.use('/users', UsersRouter);

router.use('/films', FilmsRouter);

router.use('/rentals', RentalsRouter);


//Export
module.exports = router;