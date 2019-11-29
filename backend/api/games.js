const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');

router.get('/', GameController.getGames);
router.post('/create', GameController.createGame);
router.get('/:url', GameController.getGame);

module.exports = router;
