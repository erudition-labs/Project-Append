const express 	= require('express');
const router	 = express.Router;

router.route('/').get(controller.getEvents);
router.route('/:id').get(controller.getEvent);
