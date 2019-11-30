const express = require('express');
const router = express.Router();
const WordsController = require('../controllers/WordsController');

router.get('/', WordsController.getWords);
router.get('/validate', WordsController.validateWord);

module.exports = router;
