
</br>

<img src="https://github.com/Claudia1010/backendFilms/blob/main/img/geekhubs.png">

</br>

### Films Backend

</br>

This is my fourth project of GeeksHubs Academy FSD bootcamp. The objective of this project is to replicate the 

backend part of a movie rental service, using SQL for the database.

We use a SQL database since we are interested in being able to navigate between related tables to gather data from 

different tables in the same query.

</br>

**Some of the first steps:**

</br>

1. First of all we create the database in mySQL workbench: Right click above "Schemas" and select "create schema". 

2. Install the json package with the command line: npm init -y. Only done once when starting the node project.

3. To install the dependencies we will need for the project: npm i express sequelize sequelize-cli

mysql2 nodemon jsonwebtoken dotenv bcrypt axios.

</br>

As we can see in this screenshot taken from Workbench, the database consists in 3 simple tables connected between 

them: films, rentals and users.

</br>

<img src="https://github.com/Claudia1010/backendFilms/blob/main/img/Screenshot1.png">

The relationship between users and films is "many to many", so we must create an intermediate table like in this case 

Rentals.

The relationship between users and rentals is "1 to many" (1:n), and the relationship between films and rentals is 

exactly the same (1:n).


## Endpoints

The root for all the endpoints will be:

### `http://localhost:3000`

Endpoint-function links: The method to enter in Postman is specified, and what we must enter after the root to access each of the endpoints:

- Films:

   - GET all the films: 
        router.get('/', FilmsController.getFilms)
   - POST to add a movie only with admin permissions:
        router.post('/addfilm', isAdmin, FilmsController.postFilm)
   - GET filter a movie by the title in the URL:
        router.get('/searchByName/:name', FilmsController.searchByName)
   - GET filter a movie by the genre in the URL:
        router.get('/searchByGenre/:genre', FilmsController.searchByGenre)
   - PUT update a movie with the filmID in the URL:
        router.put('/updatefilm/:id', isAdmin, FilmsController.updatefilm)
   - DELETE delete a movie with the filmID in the URL:
        router.delete('/deletefilm/:id', isAdmin, FilmsController.deletefilmbyid);

</br>

<img src="https://github.com/Claudia1010/backendFilms/blob/main/img/Screenshot2.png">

- Rentals:

   - GET all the rentals only with admin rights: 
        router.get('/', isAdmin, RentalsController.getRentals)
   - POST to rent a movie with the auth token given in the login:
        router.post('/rentfilm', auth, RentalsController.postRental)
   - PUT to update a rent with the rentID given in the URL, only by the admin:
        router.put('/updaterental/:id', isAdmin, RentalsController.updateRental)
   - DELETE the rent giving the filmID in the URL, only by the admin:
        router.delete('/deleterental/:id', isAdmin, RentalsController.deleterental)

</br>

<img src="https://github.com/Claudia1010/backendFilms/blob/main/img/Screenshot3.png">

- Users:

   - GET all the users only by the admin: 
        router.get('/', isAdmin, UsersController.getUsers)
   - POST to register a user :
        router.post('/register', UsersController.postUser)
   - POST for the login of the registered user where the token will be given:
        router.post('/login', UsersController.loginUser)
   - GET to see the profile details from a specific user providing the email by URL:
        router.get('/profile/:email', auth, UsersController.getuserbyemail);
   - PUT to update the profile details from a specific user providing the userId by URL:
        router.put('/updateuser/:id', auth, UsersController.updateUser)
   - DELETE to remove a user only by the admin with userId from the URL:
        router.delete('/deleteuser/:id', isAdmin, UsersController.deleteuser);

</br>

<img src="https://github.com/Claudia1010/backendFilms/blob/main/img/Screenshot4.png">

</br>

**Technologies:**

- Node.Js

- SQL

- Sequelize

- Nodemon

- Cors

- Bcrypt

- Express

- DotenV

- JWT

- GIT/GitHub

- MySQL Workbench

- Postman
