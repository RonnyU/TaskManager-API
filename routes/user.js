const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// / = api/user because we add that path in the index.js
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'The minimum password characters required is 6').isLength(
      { min: 6 }
    ),
  ],
  userController.createUser
);

module.exports = router;
