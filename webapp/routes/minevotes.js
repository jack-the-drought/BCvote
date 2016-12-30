//for now generate just one block, make this dynamic later when transactions become numerous
var express = require('express');
var router = express.Router();
var isAdmin = require('../adminrequired');

router.post('/',isAdmin ,function(req, res,next) {

    var bitcoin = require('bitcoin');
    var client = new bitcoin.Client({
      host: 'john_btc',
      port: 18332,
      user: 'john',
      pass: 'johnpass'
    });
    client.generate(1,function(err, data) {//mine one block
      if (err) {
        return console.error(err);
      };
      //console.log('mined one block');
      res.send('Vote Mined and Closed!');
    });

  });



module.exports = router
