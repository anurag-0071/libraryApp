const router = require('express').Router();

const controller = require('../controllers/books.controller');

router.get('/', controller.getBooks);

router.get('/:id', controller.getBookById);

router.post('/', controller.createBook);

// router.post('/rent');

module.exports = router;