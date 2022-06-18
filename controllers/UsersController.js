


const { User } = require('../models/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

//ClientController object declaration
const UsersController = {};

//GET
UsersController.getUsers = (req, res) => {
    User.findAll()
    .then(data => {
    
        res.send(data)
    });
};

//POST
//Register function called from Views: router.post('/register', UsersController.postUser)
UsersController.postUser = async (req, res) => {
    
    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    let address = req.body.address;
    let phone = req.body.phone;
    let rol = req.body.rol;


    User.create({
        name: name,
        surname: surname,
        email: email,
        password: password,
        address: address,
        phone: phone,
        rol: rol
    }).then(user => {
        res.send(`${user.name}, you have been added successfully`);

    }).catch((error) => {
        res.send(error);
    });
};

//POST function called from Views: router.post('/login', UsersController.loginUser)
//función llamada desde Views: router.post('/login', ClientsController.loginClient)permite al cliente loguearse
UsersController.loginUser = (req, res) => {

    let email = req.body.email;
    let clave = req.body.password;

    User.findOne({
        where : {email : email}

    }).then(usuarioEncontrado => {

        if(!usuarioEncontrado){
            res.send("Usuario o password incorrectos");
        } else {
            if( bcrypt.compareSync(clave, usuarioEncontrado.password)){
                //Ahora ya si hemos comprobado que el usuario existe (email es correcto) y el password SI corresponde a ese usuario

                let token = jwt.sign({ user: usuarioEncontrado }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                
                let loginOKmessage = `Welcome again ${usuarioEncontrado.name}`
                res.json({
                    loginOKmessage,
                    user: usuarioEncontrado,
                    token: token
                })
            };
        };

    }).catch(err => console.log(err));
};

//Export
module.exports = UsersController;
