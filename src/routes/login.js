const express = require('express');
const { login } = require('../controllers/login');

const router = express.Router();

router.post('/api/v1/user/login', login);

module.exports = router;
