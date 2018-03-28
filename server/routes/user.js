const express = require('express');
const router = express.Router();

const { signUp, log_in } = require('../controllers/user.controller')

router.post('/create', signUp)
router.post('/login', log_in)

module.exports = router;
