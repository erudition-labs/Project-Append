const express 			= require('express');
const router	 		= express.Router();
const controller 		= require('./controller');
const { requireAdmin }	= require('./../users/util');
const passport 			= require('passport');

//router.route('/').get(controller.getEvents);
router.route('/').post(passport.authenticate('jwt', {session: false}), controller.postEvent);
router.route('/:id').get(controller.getEvent);
router.route('/').get(controller.getEvents);
router.route('/').put(controller.putEvent);
router.route('/signup').put(controller.putSignupEvent);
router.route('/unregister').put(controller.putUnregisterEvent);
router.route('/:id').put(controller.putEvent);
router.route('/:id').delete(requireAdmin, controller.deleteEvent);

module.exports = router;
