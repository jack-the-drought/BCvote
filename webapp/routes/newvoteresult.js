var express = require('express');



var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://localhost/zehahaha');
var router = express.Router();

//this shit is async put everything in functions and pass them inside the connection so db closing will be the last thing
var Vote = require('../models/vote');

function getbalance(address) {
  return Math.ceil(Math.random()*10);
};

//chain mogoose.connect and connection close to the promises
function callmetest(){
  console.log("hello");
};
mongoose.connect('mongodb://mongo/zehahaha',callme);
//var voterId = req.params.id;
/* GET voteresults listing. */
function callme(){
var vote_name = 'test vote2';
var returnedvotequery = Vote.findOne({votename:vote_name}).exec();
router.get('/:v', function(req, res, next) {
  console.log('you requested the vote with id: ', req.params.v);
  returnedvotequery
  .then(function(returnedvote){

    var candarray = returnedvote.candidates;
    var arraycand_score = [];
    console.log(JSON.stringify(candarray));
    for (var i = 0; i<candarray.length; i++) {
      candelement = candarray[i];
      address = candelement["candidatebtcaddress"];
      candname = candelement["candidatename"];
      balance = getbalance(address);//
      var cand_score = [ candname ,balance ];
      arraycand_score.push(cand_score);
    }
    return arraycand_score;
    })
  .then(function(da){
  res.send(da);
    });
  });
};


module.exports = router;

setTimeout(function(){
  mongoose.connection.close();
},1500);
