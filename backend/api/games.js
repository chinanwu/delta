const express = require('express');
const router = express.Router();
const GameController = require('../controllers/GameController');

router.get('/', GameController.getGames);
router.get('/getOrCreate/:url', GameController.getOrCreate);
router.post('/new', GameController.createGame);
router.get('/:url', GameController.getGame);
router.get('/:url/new', GameController.createGameFromExisting);

module.exports = router;
