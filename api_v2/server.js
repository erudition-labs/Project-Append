//require('dotenv').config(); so we can use env variables like this...
//process.env.JWT_SECRET
const express 		= require('express');
const mongoose 		= require('mongoose');
const bodyParser 	= require('body-parser');
const cors 			= require('cors');
const csrf 			= require('csurf');
const jwtDecode 	= require('jwt-decode');
const jwt 			= require('jsonwebtoken');
const helmet 		= require('helmet');
const rateLimit 	= require('express-rate-limit');
const config		= require('./database/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const limiter = new rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	delayMs: 0
});

app.use(limiter);
app.use(helmet());


const attatchUser = (request, response, next) => {
	const token = request.headers.authorization;

	if(token === 'Bearer null' || !token) {
		return response.status(401).json({success: false, message: 'Authentication Invalid'});
	}
	
	const decodedToken = jwtDecode(token.replace('Bearer ', ''));
	
	if(!decodedToken) {
		return response.status(401).json({success: false, message: 'There was a problem authorizing the request'});
	} else {
		request.user = decodedToken;
		next();
	}
};

const checkJwt = (request, response, next) => {
	const token = request.headers.authorization;
	if(token === 'Bearer null' || !token) {
		return response.status(403).json({success: false, message: 'Access denied'});
	}
	
	try {
		const decoded = jwt.verify(token, config.secret, { ///////////////////////change token secret to wahtevs
			audience	: 'api.euriditionlabs.com',
			issuer		: 'api.euriditionlabs.com'
		});
		console.log(decoded);
		next();
	} catch(error) {
		return response.status(403).json({success: false, message: 'Access denied'});
	}
};


/*
 *
 ********* Routes that DO NOT Require Auth		
 *
 * */

app.use('/api/v1/users', 			require('./api/users'));
app.use('/api/v1/authenticate', 	require('./api/authenticate'));

/*
 *
 ******** Routes REQUIRING Auth
 *
 * */

app.use(attatchUser);
app.use(checkJwt);

//app.use('/api/something', require('./api.something'));

async function connect() {
	try {
		mongoose.Promise = global.Promise;
		await mongoose.connect(config.database, { useNewUrlParser: true }); //////////////change to url
	} catch(error) {
		console.log('Mongoose error', error);
	}
	app.listen(3000);
	console.log('API listening on localhost:3000');
}

connect();
