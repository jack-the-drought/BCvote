var mongoose = require('mongoose');
var md5 = require('js-md5');
var userSchema = new mongoose.Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
  var user = this;
  user.password = md5(user.password);
  next();
});



module.exports = mongoose.model('user',userSchema);
