const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure
const GameSchema = new Schema({
	url: { type: String, unique: true },
	from: String,
	to: String,
});

module.exports = mongoose.model('Game', GameSchema);
