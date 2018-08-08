const express 		= require('express');
const router 		= express.Router();
const controller 	= require('./controller');

router.route('/').post(Controller.postUser);
router.route('/check-email').get(controller.getUserByEmail);

module.exports router;
