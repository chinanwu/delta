const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get("/", (req, res) =>
  fs.readFile(path.join(__dirname, '../resources/words.txt'), 'utf8', (err, words) => {
    if (err) throw err;
    res.send(words);
  })
);

module.exports = router;
