var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: 'Express' });
  // 返回react app ; build 里面的index.html
  res.sendFile('index.html',{
    root: path.join(__dirname, '../build')
  });
});

module.exports = router;
