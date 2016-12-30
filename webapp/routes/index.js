var express = require('express');
var isAuthenticated = require('../requirelogin');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('index');
});

module.exports = router
