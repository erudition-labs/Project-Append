//require('dotenv').config(); 
const express 		= require('express');
const mongoose 		= require('mongoose');
const bodyParser 	= require('body-parser');
const cors 			= require('cors');
const csrf 			= require('csurf');
const jwtDecode 	= require('jwt-decode');
const jwt 			= require('jsonwebtoken');
const cookieParser	= require('cookie-parser');
const helmet 		= require('helmet');
const rateLimit 	= require('express-rate-limit');

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

app.use(cookieParser());

const attatchUser = (request, response, next) => {
	const token = request.cookies.token;
	if(!token) {
		return response.status(401).json({success: false, msg: 'Authentication Invalid'});
	}
	
	const decodedToken = jwtDecode(token);
	
	if(!decodedToken) {
		return response.status(401).json({success: false, msg: 'There was a problem authorizing the request'});
	} else {
		request.user = decodedToken;
		next();
	}
};

const checkJwt = (request, response, next) => {
	const token = request.cookies.token;
	if(!token) {
		return response.status(403).json({success: false, msg: 'Access denied'});
	}
	
	try {
		const decoded = jwt.verify(token, tokenSecret, { ///////////////////////change token secret to wahtevs
			audience	: 'api.euriditionlabs.com',
			issuer		: 'api.euriditionlabs.com'
		});
		console.log(decoded);
		next();
	} catch(error) {
		return response.status(403).json({success: false, msg: 'Access denied'});
	}
};
