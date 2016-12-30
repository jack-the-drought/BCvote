var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');

var router = express.Router();

/* GET voteresults listing. */
router.get('/', function(req, res, next) {
  res.send('this is the register page');
});

router.post('/', function(req,res,next){
  mongoose.createConnection('mongodb://mongo/zehahaha',function(err){
  console.log('received creds for registration: ', JSON.stringify(req.body));
  var userObj = new User;
  userObj.name = req.body.username;
  userObj.password = req.body.password;
  console.log('userobj is ', JSON.stringify(userObj));
  userObj.save(function(err){
    console.log('wtf');
    res.send('what the fuck');
    if (err) console.log('err')
    else console.log('success');
    mongoose.connection.close();
    });
  });
});
module.exports = router
