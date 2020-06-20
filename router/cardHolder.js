const router = require('express').Router();

const controller = require('../controllers/cardHolder.controller');

router.get('/', controller.getCardHolders);

router.get('/:id', controller.getCardHolderById);

router.post('/', controller.createCardHolder);

module.exports = router;