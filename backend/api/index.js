const express = require('express');
const app = express();

app.use('/api/test', require('./test'));
app.use('/api/words', require('./words'));
app.use('/api/games', require('./games'));

module.exports = app;
