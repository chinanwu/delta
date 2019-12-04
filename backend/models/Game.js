const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure
const GameSchema = new Schema({
	url: { type: String, unique: true },
	from: String,
	to: String,
	// players: { type: Number, default: 0 },
});

module.exports = mongoose.model('Game', GameSchema);
