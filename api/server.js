//require('dotenv').config(); so we can use env variables like this...
//process.env.JWT_SECRET
const express 		= require('express');
const mongoose 		= require('mongoose');
const bodyParser 	= require('body-parser');
const cors 			= require('cors');
const helmet 		= require('helmet');
const rateLimit 	= require('express-rate-limit');
const passport		= require('passport');
const JwtStrategy 	= require('passport-jwt').Strategy
const ExtractJwt 	= require('passport-jwt').ExtractJwt;
const config		= require('./database/config');
const User			= require('./api/users/model').user;
//require('./database/passport')(passport);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,

}

app.use(cors(corsOptions));


/* Passport Config */
let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secret;
//options.issuer = 'api.euriditionlabs.com';
//options.audience = 'oursite.com';
passport.use(new JwtStrategy(options, function(jwtPayload, done) {
	User.findOne({ _id: jwtPayload.sub }, function(error, user) {
		if(error) { return done(err, false); }

		if(user) {
			return done(null, user);
		} else {
			return done(null, false);
			//or do something else like say hey..make an account
		}
	});
}));
			



app.use(passport.initialize()); //passport middleware, authentication and token generation
app.use(passport.session());   //will use passport-jwt strategy

const limiter = new rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	delayMs: 0
});

app.use(limiter);
app.use(helmet());




app.use('/api/v1/users', 			require('./api/users'));
app.use('/api/v1/authenticate', 	require('./api/authenticate'));
app.use('/api/v1/events', 			require('./api/events'));
app.use('/api/v1/updates', 			require('./api/updates'));


var clients = 0;

async function connect() {
	try {
		mongoose.Promise = global.Promise;
		await mongoose.connect(config.database, { useNewUrlParser: true }); //////////////change to url
	} catch(error) {
		console.log('Mongoose error', error);
	}
	app.listen(3000);
	const http 	= require('http').createServer(app);
	const io 	= require('socket.io').listen(http);
	//app.listen(3000);
	http.listen(3001);
	app.set('socketio', io);
	console.log('API listening on port: 3000');
	io.on('connection', function(socket) {
		clients++;
		app.set('clients', clients);

		socket.on('disconnect', function() {
		  clients--;
		  app.set('clients', clients);
		});
	  });
}

connect();

module.exports = {
	clients, 
};
