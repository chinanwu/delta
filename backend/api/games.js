const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const GameController = require('../controllers/GameController');

router.get('/', (req, res) =>
	Game.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	})
);

router.post('/create', GameController.createGame);

module.exports = router;
