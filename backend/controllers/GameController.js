const Game = require('../models/Game');
const fs = require('fs');
const path = require('path');

const getRandom = max => Math.floor(Math.random() * (+max - +0)) + +0;

const createGame = (req, res) => {
	const game = new Game();

	fs.readFile(
		path.join(__dirname, '../resources/words.txt'),
		'utf-8',
		(err, data) => {
			if (err) throw err;
			const words = data.split(' ');
			const max = words.length;
			game.from = words[getRandom(max)];
			game.to = words[getRandom(max)];
			game.url = req.body.url.toString();

			game
				.save()
				.then(() => {
					return res.status(201).json({
						success: true,
						id: game._id,
						message: 'Game created!',
					});
				})
				.catch(error => {
					return res.status(400).json({
						error,
						message: 'Game not created!',
					});
				});
		}
	);
};

module.exports = {
	createGame,
};
