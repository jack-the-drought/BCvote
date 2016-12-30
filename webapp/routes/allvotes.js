var express = require('express');

var router = express.Router();
var isAuthenticated = require('../requirelogin');
var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');


//this shit is async put everything in functions and pass them inside the connection so db closing will be the last thing
var Vote = require('../models/vote');
router.get('/',isAuthenticated, function(req, res,next) {
  mongoose.connect('mongodb://mongo/zehahaha',function(err){
  Vote.find({}, function(err, votes) {
    res.send(votes);
    //console.log("sent all votes to server");

  });
 });
});

module.exports = router;

/*
setTimeout(function(){
  mongoose.connection.close();
},4000);
*/
