const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/mairead', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch(e => {
		console.error('Connection error', e.message);
	});
mongoose.set('debug', true);

const db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('../models/Game');

module.exports = db;
