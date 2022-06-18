


const { User } = require('../models/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let authConfig = require('../config/auth');

//UserController object declaration
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

//GET to see profile details by email
UsersController.getuserbyemail = (req, res) => {
    let email = req.params.email;
    User.findOne({ where : { email : email }})
    .then(data => {
        res.send(data)
    });
};

//PUT to update the user profile by id by URL, and the given data by body
UsersController.updateUser = async (req, res) => {
    // admin only
    let userId = req.params.id;    
    let body = {

        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)),
        address: req.body.address,
        phone: req.body.phone,
    };    
    await User.update (body, { where : {id: userId}
    }).then((elem) => {
        res.send(`The user with id ${userId} has been edited`);
    }).catch(err => {
        console.log(err);
    });
}


//DELETE 
UsersController.deleteuser = (req, res) => {
    let id = req.params.id;
   
    User.destroy({
         where : { 
            id : id 
        }
    })
    .then(count => {
        if(!count){
            return res.status(404).send({error: 'No user'});
        }
        res.send("User deleted");
    }).catch((err)=> {
        console.log(err);
    });
}



//Export
module.exports = UsersController;
