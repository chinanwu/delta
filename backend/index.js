const { createServer } = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./db');

const app = express();
app.use(logger('dev'));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, DELETE, PUT, OPTIONS'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
	res.setHeader('Access-Control-Max-Age', '86400');
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./api'));

app.use(function(err, req, res, next) {
	console.log(err.stack);

	res.status(err.status || 500);

	res.json({
		errors: {
			message: err.message,
			error: err,
		},
	});
});

const PORT = process.env.PORT || 5000;
createServer(app).listen(PORT);
