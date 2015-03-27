/**
 * Created by Crystian on 2/21/2015.
 */

// share with app

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	jshint = require('gulp-jshint'),
	chalk = require('chalk'),
	gutil = require('gulp-util');


//COMMONS between project and loader:
process.on('uncaughtException', function(err){
	if(typeof err === 'string') err = {message:err};
	console.logRed('uncaughtException: ' + err.message);
	if (gutil.env.debug) {
		console.logRed(err.stack);
	}
	process.exit(1);             // exit with error
});

console.logWarn = function (m) {
	console.log(chalk.black.bgYellow(m));
};

console.logGreen = function (m) {
	console.log(chalk.black.bgGreen(m));
};

console.logRed = function (m) {
	console.log(chalk.white.bold.bgRed(m));
};


exports.getExtensionFile = function(s) {
	var arr = s.split('.');
	if (arr.length === 0) {
		return s;
	}
	return arr[arr.length - 1];
};

exports.getFileName = function(s) {
	var arr = s.split('.');
	if (arr.length === 0) {
		return s;
	}
	arr.splice(arr.length-1,1);
	return arr.join('.');
};

exports.setExtensionFilename = function(s, extension) {
	var arr = s.split('.');
	if (arr.length <= 1) {
		console.logRed('Extension not found!');
		return s;
	}

	arr.pop();
	arr.push(extension);

	return arr.join('.');
};

exports.setPreExtensionFilename = function(s, preExtension) {
	var arr = s.split('.');
	if (arr.length <= 1) {
		console.logRed('Extension not found!');
		return s;
	}

	arr.splice(arr.length-1, 0, preExtension);

	return arr.join('.');
};
