const { words } = require('../utils/words');

const getWords = (req, res) => res.send(words);

const validateWord = (req, res) => res.send(words.includes(req.query.word));

module.exports = {
	getWords,
	validateWord,
};
