const express 			= require('express');
const router	 		= express.Router();
const controller 		= require('./controller');
const { requireAdmin }	= require('./../users/util');
const passport 			= require('passport');

//router.route('/').get(controller.getEvents);
router.route('/').post(passport.authenticate('jwt', { session: false }), controller.postEvent);
router.route('/:id').get(passport.authenticate('jwt', { session: false }), controller.getEvent);
router.route('/').get(passport.authenticate('jwt', { session: false }), controller.getEvents);
router.route('/').put(passport.authenticate('jwt', { session: false }), controller.putEvent);
router.route('/:id').put(passport.authenticate('jwt', { session: false }), controller.putEvent);
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), controller.deleteEvent);

module.exports = router;
