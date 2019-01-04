var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Task-Tracker 1.1' });
});


// This is where I am adding routes to other pages for the nav buttons to use

router.get('/adduser', function(req, res, next) {
  res.render('adduser', { title: 'Adduser page title' });
});

router.get('/userlist', function(req, res, next) {
  res.render('userlist', { title: 'Userlist page title' });
});

router.get('/devops', function(req, res, next) {
  res.render('devops', { title: 'DevOps Page' });
});


module.exports = router;
