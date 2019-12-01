const Game = require('../models/Game');
const { words } = require('../utils/words');

const getRandom = max => Math.floor(Math.random() * (+max - +0)) + +0;

const getGames = (req, res) =>
	Game.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});

const getGame = (req, res) =>
	Game.find({ url: req.params.url }, (err, data) =>
		err
			? res.json({ success: false, error: err })
			: data.length === 0
			? res.json({ success: false, error: 'No Game Found' })
			: res.json({ success: true, data: data[0] })
	);

const createGame = (req, res) => {
	const game = new Game();

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
				url: game.url,
				from: game.from,
				to: game.to,
				message: 'Game created!',
			});
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'Game not created!',
			});
		});
};

module.exports = {
	getGames,
	getGame,
	createGame,
};
