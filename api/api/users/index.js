const express 									= require('express');
const router 									= express.Router();
const controller 								= require('./controller');
const { body, check, validationResult }			= require('express-validator/check');
const { sanitizeBody }							= require('express-validator/filter');
const passport 									= require('passport');


router.route('/').post([
	body('email').exists().isEmail().withMessage('Valid Email Required').normalizeEmail(),
	body('firstName').exists().withMessage('First Name Required').trim().escape(),
	body('lastName').exists().withMessage('Last Name Required').trim().escape(),
	body('flight').exists().withMessage('Flight Required').trim().escape(),
	body('phone').exists().withMessage('User Phone Required').trim().escape(),
	body('role').exists().withMessage('User Role Required').trim().escape(),
	body('password').exists().withMessage('Password Required').trim().escape(),
	body('fullName').exists().withMessage('Full Name Required').trim().escape()
], controller.postUser);

router.route('/verify-resend').post([
	body('email').exists().withMessage('Email Required')
		.isEmail().withMessage('Valid Email Required').normalizeEmail()
], controller.postVerifyResend);


router.route('/email-verification/:token').post(controller.postEmailVerification);
router.route('/check-email').get(controller.getUserByEmail);
router.route('/users').get(passport.authenticate('jwt', { session: false }), controller.getUsers);
router.route('/:id').get(passport.authenticate('jwt', { session: false }), controller.getUser);
router.route('/:id').put(passport.authenticate('jwt', { session: false }), controller.putUser);
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), controller.deleteUser);
router.route('/forgot-password').post(controller.passwordResetRequest);
router.route('/reset-password/:token').post(controller.passwordReset);



module.exports = router;
