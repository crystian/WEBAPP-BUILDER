/**
 * Created by Crystian on 3/27/2015.
 */


var gutil = require('gulp-util'),
	//debug = require('gulp-debug'),
    utils = require('./utils'),
	replace = require('gulp-replace'),
	merge = require('merge-stream'),
	gulp = require('gulp');

exports.merge = function(stream, newStream) {
	return (stream === undefined) ? newStream : merge(stream, newStream);
};

exports.isNotActive = function(file) {
	//eval, yes, with pleasure! :)
	return (!eval(file.active));
};

exports.makePath = function(path) {
	var r = path;
	//if fail, it is a string
	try {
		//eval, yes, with pleasure! :)
		r = eval(path);
	} catch (e) {
	}
	return r;
};

//if it is minificated version, just validate this file, otherwise check the normal version
//this is util for Libs without min version
exports.fileDestExist = function(file){
	var r = false;

	//validate if exist, if exist return don't process nothing
	var p = (global.cfg.release || file.makeMin) ? file.path + '/' +file.min : file._cssFile;
	if(utils.fileExist(p)){
		r = true;
	}

	return r;
};


exports.replace = function(stream, replaces){
	var i = 0,
		l = replaces.length;

	for (; i < l; i++) {
		var replacePair = replaces[i];
		if(!replacePair || replacePair.length !== 2){
			console.logRed('Replace pair not correct format, check it, it should be two items: 0 = value searched, 1 = replace, elements found: '+ replacePair.length);
			this.exit(-1);
			return;
		}

		console.logGreen('key: "'+ replacePair[0] +'" value: "'+ replacePair[1] +'"');
		stream = stream.pipe(replace(replacePair[0], replacePair[1]));
	}

	return stream;
};
