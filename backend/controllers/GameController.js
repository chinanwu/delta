const CODES = require('../constants/HttpResponseCodes');
const Game = require('../models/Game');
const { words } = require('../utils/words');

const getRandom = max => Math.floor(Math.random() * (+max - +0)) + +0;

const findGame = (url, callback) => Game.find({ url: url }, callback);

const getWords = () => {
	const max = words.length;
	const from = words[getRandom(max)];
	const to = words[getRandom(max)];

	// TODO: Figure out how to check if words are the same without js flipping out
	return { from, to };
};

const getGames = (req, res) =>
	Game.find((err, data) =>
		err
			? res
					.status(CODES.INTERNAL_SERVER_ERROR)
					.json({ success: false, error: err })
			: res.status(CODES.OK).json({ success: true, data: data })
	);

const getGame = (req, res) =>
	findGame(req.params.url, (err, data) =>
		err
			? res
					.status(CODES.INTERNAL_SERVER_ERROR)
					.json({ success: false, error: err })
			: data.length === 0
			? res
					.status(CODES.NOT_FOUND)
					.json({ success: false, error: 'No Game Found' })
			: res.status(CODES.OK).json({ success: true, data: data[0] })
	);

const createGame = (req, res) => {
	const game = new Game();

	const { from, to } = getWords();
	game.from = from;
	game.to = to;
	game.url = req.body.url.toString();

	game
		.save()
		.then(() => {
			return res.status(CODES.CREATED).json({
				success: true,
				data: { id: game._id, url: game.url, from, to },
			});
		})
		.catch(error => {
			return res.status(CODES.INTERNAL_SERVER_ERROR).json({
				success: false,
				error,
			});
		});
};

const createGameFromExisting = (req, res) => {
	const { from, to } = getWords();
	const values = { $set: { from: from, to: to } };

	Game.updateOne({ url: req.params.url }, values)
		.then(() => getGame(req, res))
		.catch(error =>
			res.status(CODES.NOT_FOUND).json({
				success: false,
				error,
			})
		);
};

const getOrCreate = (req, res) =>
	findGame(req.params.url, (err, data) =>
		err
			? res
					.status(CODES.INTERNAL_SERVER_ERROR)
					.json({ success: false, error: err })
			: data.length === 0
			? ((req.body.url = req.params.url), createGame(req, res))
			: res.status(CODES.OK).json({ success: true, data: data[0] })
	);

module.exports = {
	getGames,
	getGame,
	createGame,
	createGameFromExisting,
	getOrCreate,
};
