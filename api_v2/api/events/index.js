const express 			= require('express');
const router	 		= express.Router();
const controller 		= require('./controller');
const { requireAdmin }	= require('./../users/util');

//router.route('/').get(controller.getEvents);
router.route('/').post(controller.postEvent);
router.route('/:id').get(controller.getEvent);
router.route('/').get(controller.getEvents);
router.route('/:id').put(controller.putEvent);
router.route('/:id').delete(requireAdmin, controller.deleteEvent);

module.exports = router;
