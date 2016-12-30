var express = require('express');
var bitcoin = require('bitcoin');
var client = new bitcoin.Client({
  host: 'john_btc',
  port: 18332,
  user: 'john',
  pass: 'johnpass'
});
var isAuthenticated = require('../requirelogin');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var router = express.Router();
var Vote = require('../models/vote');


//var returnedvotequery = Vote.findOne({votename:vote_name}).exec();
router.get('/:v',isAuthenticated, function(req, res, next) {
  mongoose.createConnection('mongodb://mongo/zehahaha',function(err){
    Vote.findOne({_id:req.params.v},function(err,returnedvote){
      if (err) throw err;
    console.log('user requested the vote with id: ', req.params.v);
    var candarray = returnedvote.candidates;
    var arraycand_score = [];
    console.log(JSON.stringify(candarray));
    for (var i = 0; i<candarray.length; i++)
    {!function zehahaha(i){
      var cand_score = [];
      candelement = candarray[i];
      address = candelement["candidatebtcaddress"];
      candname = candelement["candidatename"];
      cand_score.push(candname);
      console.log('candname',candname);
      client.getReceivedByAddress(address,function(err, data) {
        console.log('candnameagain',candname);

      balance = data;//
      cand_score.push(balance);
      //var cand_score = [ candname ,balance ];
      arraycand_score.push(cand_score);
      if ((arraycand_score.length)==(returnedvote.candidates.length))
      res.send(arraycand_score);//if elements are the same length
      mongoose.connection.close();
      });
    }(i);
   };
  });
  });
  });

module.exports = router;
