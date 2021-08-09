const express = require('express');
const controller = require('../controllers/cards.controller');
const router = express.Router();

router.get('/', controller.getCards);
router.get('/:id', controller.getById);
router.get('/many/:ids', controller.getByAllIds);

module.exports = router;
