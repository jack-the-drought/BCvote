var app = require('./app');
var http = require('http');
var fs = require('fs');
var https = require('https');
// -keyout privateKey.key -out certificate.crt
var privatekey = fs.readFileSync('privateKey.key');
var certificate = fs.readFileSync('certificate.crt');

https.createServer({key:privatekey,cert:certificate},app).listen(3000, function () {
    console.log("Express server listening on port 3000 (use https)");
});
