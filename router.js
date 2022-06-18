

const router = require('express').Router();

const ClientsRouter = require('./views/ClientsRouter');

const FilmsRouter = require('./views/FilmsRouter');

const RentsRouter = require('./views/RentsRouter');


router.use('/clients', ClientsRouter);

router.use('/films', FilmsRouter);

router.use('/rents', RentsRouter);


//Export
module.exports = router;