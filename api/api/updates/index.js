const express 			= require('express');
const router	 		= express.Router();
const controller 		= require('./controller');

router.route('/').get(controller.getUpdates);
router.route('/').post(controller.createUpdate);

module.exports = router;
