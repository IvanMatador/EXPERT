const express = require('express');
const controller = require('../controllers/filters.controller');
const router = express.Router();

router.get('/', controller.getByParams);


module.exports = router;
