"use strict";

var express = require('express'),  
  config = require('./config'),    
  route = require('./route'), 
  app = express(),
  http = require('http').Server(app);
  
var options = {
  debug: true
}

var port = process.env.PORT || 3009;


http.listen(port,function(){
    console.log('listening on *: ' + port);
});


config(app);

route(app); 
