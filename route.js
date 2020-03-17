'use strict';
const express = require('express');
const pathExp = require("path");
const multer = require('multer');
const bodyParser = require('body-parser');

const fs = require('fs');

let path;


module.exports = function(app){

	app.get('/',function(req,res){
		
		path = "./views/index.html";

		if (fs.existsSync(path)) {
			res.render('index');
		} else {			
			res.end("Error: 404. File not found in server");
		}

	});

	app.get("/:filename",function(req,res){

		path = "./views/" + req.params.filename + '.html';

	  if (fs.existsSync(path)) {
	    res.render(req.params.filename)
	  } else {
	  	console.log("file not in server");
	  	res.redirect('/')
	  }
	})

}