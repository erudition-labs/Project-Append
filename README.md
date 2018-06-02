#MEAN stack Rest API.
Using Mongoose as a mapper (Object Document Mapper ODM) to mongodb http://mongoosejs.com/
Backend express server and API for registration/login and get a json web token when authenticated
Authentication using passport and JWT -- allows us to specify which routes and endpoints the user will need a token for.

#Express Middleware Used
CORS-- https://www.npmjs.com/package/cors -- becuase backend server and frontend angular server are on different ports.

passport-JTW strategy -- https://www.npmjs.com/package/passport-jwt

Angular2-JWT -- https://github.com/auth0/angular2-jwt for managing tokens in the frontend

express-validator -- https://express-validator.github.io/docs/ for validation/sanitation of incoming client input

mongoose-unique-validator -- https://www.npmjs.com/package/mongoose-unique-validator nice mongoose way of validating uniqueness of fields

passwords hashed with bcryptjs

Run "npm install" to install packages. Need to do it in angular-src as well

Reccomend getting nodemon to auto detect changes to server and auto-reload. run "sudo npm install -g nodemon"

#ENDPOINTS so far

POST api/users/register

POST api/users/authenticate   // Gives back a token

GET api/users/profile         // Needs json web token to authorize

GET api/users/users //get a list of all users in database

DELETE api/users/delete/{id} //deletes a user by id
