var mongoose = require('mongoose');
var bitcoin = require('bitcoin');
var client = new bitcoin.Client({
  host: '172.17.0.2',//change this to inna machine
  port: 18332,
  user: 'john',
  pass: 'johnpass'
});
var voteSchema = new mongoose.Schema({
  votename: { type: String, unique: true },
  completed: Boolean,
  //note: String,
  candidates:
  //{
     [
       {
         candidatename : String,
         candidatebtcaddress : String,
       }
     ],
  alreadyvoted:[],

});
voteSchema.pre('save', function(next) {// this. contains the adresses
  /*
  for (var i =0; i<(this.candidates).length; i++) {
    !function zehahaha(i){//zehahaha saves the day again
    //console.log(((this.candidates)[i]).candidatebtcaddress);
    //send 0.0001 bitcoin to ((this.candidates)[i]).candidatebtcaddress
    client.sendToAddress(((this.candidates)[i]).candidatebtcaddress, 0.001,function(err, data) {
      if (err) {
        return console.error(err);
      };
    var addr = ((this.candidates)[i]).candidatebtcaddress;
    });

 }(i);
 };*/



  console.log('pre saving vote called');
  next();
});

module.exports = mongoose.model('vote',voteSchema);
