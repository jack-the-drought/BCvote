var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = require('./routes/login');
var register = require('./routes/register');
//var test = require('./routes/test');
var newVote = require('./routes/createvote');
var doTheVoting = require('./routes/dothevoting');
var castVote=require('./routes/castvote');
var listVotes = require('./routes/allvotes');
var voteRes = require('./routes/voteresult');
var home = require('./routes/index');
var mineVotes = require('./routes/minevotes');
var app = express();
var session = require('express-session');



app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'jade');
/*app.engine('html', engines.mustache);
app.set('view engine', 'html');
*/
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//this was 60 secondes :v now it's 600 zehahaha==> now it's 6000 ==> it's over 9000!!!
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 6000000 }}));
/**********************APP URLS*************************/
//app.use('/test', test);
app.use('/createvote', newVote);
app.use('/vote', doTheVoting);
app.use('/castvote', castVote);
app.use('/listvotes', listVotes);
app.use('/voteresults', voteRes);
app.use('/minevotes', mineVotes);
app.use('/login', login);
app.use('/register', register);
app.use('/', home);



/***********************ERROR HANDLERS**************************/

/**************************************EXPORT THE APP*************************************/
module.exports = app
