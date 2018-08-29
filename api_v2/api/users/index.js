const express 									= require('express');
const router 									= express.Router();
const controller 								= require('./controller');
const { body, check, validationResult }			= require('express-validator/check');
const { sanitizeBody }							= require('express-validator/filter');


router.route('/').post([
	body('email').exists().isEmail().withMessage('Valid Email Required').normalizeEmail(),
	body('firstName').exists().withMessage('First Name Required').trim().escape(),
	body('lastName').exists().withMessage('Last Name Required').trim().escape(),
	body('rank').exists().withMessage('Rank Required').trim().escape(),
	body('flight').exists().withMessage('Flight Required').trim().escape(),
	body('team').exists().withMessage('Team Required').trim().escape(),
	body('role').exists().withMessage('User Role Required').trim().escape(),
	body('password').exists().withMessage('Password Required').trim().escape()
], controller.postUser);

router.route('/verify-resend').post([
	body('email').exists().withMessage('Email Required')
		.isEmail().withMessage('Valid Email Required').normalizeEmail()
], controller.postVerifyResend);


router.route('/email-verification').post(controller.postEmailVerification);
router.route('/check-email').get(controller.getUserByEmail);
router.route('/users').get(controller.getUsers);

module.exports = router;
