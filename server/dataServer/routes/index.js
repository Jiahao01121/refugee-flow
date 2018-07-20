var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {

  res.sendFile('index.html',{
    root: path.join(__dirname, '../build')
  });
});

module.exports = router;
