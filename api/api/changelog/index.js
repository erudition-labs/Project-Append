const express 			= require('express');
const router	 		= express.Router();
const controller 		= require('./controller');
const passport 			= require('passport');

router.route('/').post(passport.authenticate('jwt', { session: false }), controller.postChangelog);
router.route('/').get(passport.authenticate('jwt', { session: false }), controller.getChangelog);
router.route('/').put(passport.authenticate('jwt', { session: false }), controller.putChangelog);


module.exports = router;