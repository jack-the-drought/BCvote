var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Vote = require('../models/vote');
var isAuthenticated = require('../requirelogin');

router.post('/',isAuthenticated, function(req, res,next) {
  mongoose.connect('mongodb://mongo/zehahaha',function(err){
    var bitcoin = require('bitcoin');
    var client = new bitcoin.Client({
      host: 'john_btc',
      port: 18332,
      user: 'john',
      pass: 'johnpass'
    });

//change this with sendtoaddress after modifying database values
    Vote.findOne({_id:req.body.voteId},function(err,returnedvote){
      if (err) console.log('ERROR : ', err);
      //console.log('returned vote is ', JSON.stringify(returnedvote));
      //check if alrady voted or not
      if ((returnedvote.alreadyvoted).indexOf(req.session.user)==-1)
      {
      for (var i = 0; i < (returnedvote.candidates).length;i++)
        if (returnedvote.candidates[i].candidatename==req.body.choice) {
          var bitchaddress = returnedvote.candidates[i].candidatebtcaddress;
          console.log('bitchaddress is ', bitchaddress);};
      client.sendToAddress(bitchaddress, 0.0001,function(err, data) {
        if (err) {
          return console.error(err);
        };
        //push value req.session.user to alreadyvoted[] array in returned vote then save back using the update method
        //try with save first maybe that's one use of the objectid in mongo
        returnedvote.alreadyvoted.push(req.session.user);
        returnedvote.save(function(err){
          console.log('Info: ' + JSON.stringify(data));
          //req.body.choice is the choice

          //console.log('requested to vote with parameters: '+JSON.stringify(req.body));
          //console.log('requested to vote with id: '+req.body.voteId);
          res.send(['voted successfully!','color:green']);
          mongoose.connection.close();

        });




    });
  }
  else {console.log('user already voted, sorry');
        res.send(['you already voted in this vote','color:red']);
      }







    });

  });
});



module.exports=router
