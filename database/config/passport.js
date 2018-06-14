const JwtStrategy	= require('passport-jwt').Strategy;
const ExtractJwt	= require('passport-jwt').ExtractJwt;
const User			= require('../models/user');
const config		= require('./database');

module.exports = function(passport) {
	let options = {};
	options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); //get token from the header
	options.secretOrKey = config.secret;
    //When a protected page is attempted to be accessed,  it goes here
    //a GET with the correct token will find the id
	passport.use(new JwtStrategy(options, (jwtPayload, done) => {
		User.findUserById(jwtPayload.data._id, (error, user) => {
			if(error) { return done(error, false); }
			if(user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));
}
