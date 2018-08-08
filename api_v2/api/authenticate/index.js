const express 									= require('express');
const router 									= express.Router();
const controller 								= require('./controller');
const { body, check, validationResult }			= require('express-validator/check');
const { sanitizeBody }							= require('express-validator/filter');

router.route('/').post([
	body('email').isEmail().withMessage('Valid Email Required').normalizeEmail(),
	body('password').exists().withMessage('Password Required').trim().escape()
], controller.postAuthenticate);
module.exports = router;
