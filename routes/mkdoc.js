const express = require('express');
const controller = require('../controllers/mkdoc.controller');
const router = express.Router();

router.post('/', controller.makeDoc);

module.exports = router;