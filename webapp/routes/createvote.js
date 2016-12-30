var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Vote = require('../models/vote');
var isAuthenticated = require('../requirelogin');//changewith isAdmin middleware
var isAdmin = require('../adminrequired');


router.get('/', function(req, res, next) {//this is added for the middleware
  res.send('create vote page served');
});

router.post('/',isAdmin, function(req, res,next) {//change with isAdmin middleware //done
  mongoose.createConnection('mongodb://mongo/zehahaha',function(err){
    if (err) console.log(err);
    //console.log('requested vote creation:',req.body);
    var zambala = req.body;
    var voteObj = new Vote({completed: false, });
    voteObj.votename = zambala.votename;
    //console.log('vote isss ',voteObj);
    var parsedcandidates =[];
    var bitcoin = require('bitcoin');
    var client = new bitcoin.Client({
      host: 'john_btc',//change this to inna machine
      port: 18332,
      user: 'john',
      pass: 'johnpass'
    });
    for (var i =0; i < (zambala.candidates).length;i++)
    {!function zehahaha(i){
      //fuck! the callback gets called after the loop finishes#fixed with zehahaha; zehahaha
      //now loop is messy(no order but doesnt matter since addresse are random)
      client.getNewAddress(function(err, data) {
        if (err) {
        console.log('error here');  //remove me

          return console.error(err);
        };
        var candobj = {};
        console.log("i is .. ",i);
        //console.log(data);
        console.log(JSON.stringify((zambala.candidates)[i]));
        //console.log(JSON.stringify(zambala.candidates)[i]);
        candobj.candidatename = ((zambala.candidates)[i]).text;
        candobj.candidatebtcaddress = data;
        voteObj.candidates.push(candobj);
        console.log(data);
        //console.log('Info: ' + JSON.stringify(data));
        console.log('number of voteObj candidates: ',(voteObj.candidates).length);
        if (((voteObj.candidates).length)==((zambala.candidates).length)) { //Save object in here
          console.log('Vote object is ::', JSON.stringify(voteObj));
            res.send('will do');
            voteObj.save(function(err){
              if (err)
                return console.log(err);
              else {
                console.log('saved successfully');
                mongoose.connection.close();
              }
            });
         };
      });
    }(i);

      //parsedcandidates.push({((zambala.candidates)[i]).text,"fakeaddress"});
    };

  });
});

module.exports = router
