const express = require('express');
const router = express.Router();
const empty = require('../controllers/empty');

router.post('/auth/login', empty);
router.post('/auth/logout', empty);

router.get('/user', empty);
router.get('/user/:id', empty);

module.exports = router;