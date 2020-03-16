"use strict";
var express = require('express');
var pathExp = require("path");
var multer = require('multer');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var ejs = require('ejs');
var favicon = require('serve-favicon')



module.exports = function (app) {

	app.use('/assets',express.static(__dirname + '/public'));
	//middleware
	app.use(session({
	  secret: 'keyboard cat',
	  resave: true,	  
	  saveUninitialized: true,
	  cookie: {
	  	httpOnly: true, 
	  	//maxAge: 3600000 * 24, // 24 hours
	  	path: "/"
	  } //secure: true will be set on the cookie when i this site is on https
	}));
	
	
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json({limit: '50mb'}));
	//app.use(multer({dest: './uploads'}).any());

	var multer = require('multer');

	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, './uploads')
	  },
	  filename: function (req, file, cb) {
	    cb(null, Date.now() + genHash(5) + pathExp.extname(file.originalname)) //Appending .jpg
	  }
	})

	var upload = multer({ storage: storage });

	app.use(upload.any())

	app.use(favicon(pathExp.join(__dirname, 'public', 'favicon.ico')))
	
	var path = "";
	var list;
	var switchUrl;
	
	app.use(function(req,res,next){		
	 path = req.url;
	 console.log("https://" + req.headers.host + req.url);		
	 next();		
	});

	app.set('view engine', 'html');
	//app.set('view engine', 'ejs');
	app.engine('html', ejs.renderFile);
	app.set('views', __dirname + '/views');

}