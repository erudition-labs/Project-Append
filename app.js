//Main server entry point file

//Modules required from core and package.json
const express 		= require('express');
const path 			= require('path'); //core module
const bodyParser 	= require('body-parser'); //parses incoming request bodies. Grabs the data from forms, etc..
const cors 			= require('cors'); //https://github.com/expressjs/cors
const passport 		= require('passport');
const mongoose 		= require('mongoose');
const config 		= require('./database/config/database');
const users 		= require('./routes/users'); //contains backend routes that users can access. we define users in the models

require('./database/config/passport')(passport);

var promise = mongoose.connect(config.database); //connect to mongoose database
mongoose.connection.on('connected', () => {     //tell us if we are connected
	console.log('Connected to database '+ config.database)
});

mongoose.connection.on('error', (error) => {     //tell the error if it occurs
	console.log('Database Error'+ error)
});

const app	= express();
const port	= 3000; //port number

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());              //cors middleware
app.use(bodyParser.json());   //body parser middleware

app.use(passport.initialize()); //passport middleware, authentication and token generation
app.use(passport.session());   //will use passport-jwt strategy

//Endpoints
app.use('/api/v1/auth', users);      //users routes
	// Any request in the form of localhost:port/users/whatever must be
// defined here in order to be used.

app.use(express.static(path.join(__dirname, 'public'))); //static angular app folder

//Index Route
app.get('/', (request, response) => { //route set root Endpoint
	response.send('Invalid Endpoint!');
});

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'public/index.html')); //all routes go to here
});

//server start
app.listen(port, () => {
	console.log('Server started on port ' + port);
});
