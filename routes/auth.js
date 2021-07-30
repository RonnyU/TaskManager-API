const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// ? api/auth
router.post(
  '/',
  [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'The minimum password characters required is 6').isLength(
      { min: 6 }
    ),
  ],
  authController.authenticateUser
);

module.exports = router;
