const router = require('express').Router();

const controller = require('../controllers/rental.controller');

router.get('/', controller.getRentals);

router.get('/:id', controller.getRentalById);

router.post('/', controller.createRental);

module.exports = router;