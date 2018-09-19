const express 			= require('express');
const router	 		= express.Router();
const controller 		= require('./controller');
const passport 			= require('passport');


router.route('/').get(passport.authenticate('jwt', { session: false }), controller.getUpdates);
router.route('/').post(passport.authenticate('jwt', { session: false }), controller.createUpdate);
router.route('/').put(passport.authenticate('jwt', { session: false }), controller.editUpdate);
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), controller.deleteUpdate);


module.exports = router;
