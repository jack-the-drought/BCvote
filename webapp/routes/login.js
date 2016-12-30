var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
var uuid = require('gen-uuid/node_modules/uuid');
var router = express.Router();
md5 = require('js-md5');

/* GET voteresults listing. */
router.get('/', function(req, res, next) {
  res.send('this is the login page');
});
router.post('/', function(req,res,next){
  mongoose.connect('mongodb://mongo/zehahaha',function(err){
    User.findOne({name:req.body.username},function(err,returneduser){
      if (!returneduser) res.send('invalid user or password')
      else {
          console.log('received creds: ', JSON.stringify(req.body));
          if (md5(req.body.password)==returneduser.password){
            console.log('login success should grant session')

            req.session.sessId = uuid();
            req.session.user = req.body.username;

            req.session.save();
            if (req.session.user=="admin") res.send('welcome admin');
            //req.session.cookie.user = "blabla";
            else res.send('logged in successfully!');
            console.log(req.session);
          }
            else res.send('invalid user or password');
          console.log(JSON.stringify(req.session));
      }
    mongoose.connection.close();

    });

  });
});

module.exports = router
