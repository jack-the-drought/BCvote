//get the vote name/id as param in URL
//fetch vote options and voting addresses from database, candidates addresses as well
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Vote = require('../models/vote');
var isAuthenticated = require('../requirelogin');
router.get('/:voteId',isAuthenticated, function(req, res,next) {
  mongoose.connect('mongodb://mongo/zehahaha',function(err){
    if (err) console.log(err);
    //console.log('casting vote is ready for vote with id:', req.params.voteId);
    Vote.findOne({_id:req.params.voteId},function(err,vote){
      //only send candidate names and save them to $scope later
      candidatenamesarray=[];
      for (i=0;i<(vote.candidates).length;i++){
        candidatenamesarray.push(vote.candidates[i]['candidatename']);
        //console.log(JSON.stringify(vote.candidates[i]['candidatename']));
        //console.log(JSON.stringify(vote.candidates[i]));

      }
      //console.log(candidatenamesarray);
      res.send([vote.votename,candidatenamesarray,vote._id,req.session.user]);
      mongoose.connection.close() ;
    });

  });
});
module.exports = router
