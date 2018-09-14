const express 			= require('express');
const router	 		= express.Router();
const controller 		= require('./controller');

router.route('/').get(passport.authenticate('jwt', { session: false }), controller.getUpdates);
router.route('/').post(passport.authenticate('jwt', { session: false }), controller.createUpdate);

module.exports = router;
