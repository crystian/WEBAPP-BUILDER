/**
 * Created by Crystian on 3/16/2015.
 */

var gulp = require('gulp'),
	shared = require('./shared'),
	strip = require('gulp-strip-comments'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	replace = require('gulp-replace'),
	fs = require('fs-extra'),
	extend = require('extend'),
	gif = require('gulp-if'),
	debug = require('gulp-debug'),
	gutil = require('gulp-util');

//htmlreplace = require('gulp-html-replace'),
//htmlmin = require('gulp-htmlmin'),
//concat = require('gulp-concat'),
//rename = require('gulp-rename'),
//streamqueue =require('streamqueue'),
//merge =require('merge-stream'),
//jshint = require('gulp-jshint'),
//header = require('gulp-header'),
//footer = require('gulp-footer'),
//runSequence = require('run-sequence'),
//clean = require('gulp-clean'),



gulp.task('a', function (cb) {
	var files = require('../www/app.json');

	doMagic(files);
	cb();
});

gulp.task('doCss', function (cb) {
	var files = require('../www/app.json');

	doCss(files);
	cb();
});

function doCss(files){
	var i = 0,
		l = files.length;

	for (; i < l; i++) {
		var file = extend(true, {}, fileDefault, files[i]);


	}
}

function doMagic(files, options){
	'use strict';

	var fileDefault = {
			'file': 'file.css',
			'active': 'true',		//it will eval this field
			'path': 'www',			//it can be a statement, and it will be evaluated
			//'min': 'file.min.css',//file name final for minificated file, just use it if you want another name, by default is 'min.'+ext
			'linter': true,			//if you want to lint, will not apply for libraries
			'source': null,			//file for preprocessor, automaticaly determine with one will be use
			'autoPrefix': true,		//auto prefix when source is active
			'overwrite': true,		//specially for libs, just make it once
			'minificated': false,	//if it is a lib for don't re do the minifcation
			'replaces': {
				'pre': [			//pre minificatedd
					//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
				],
				'post': [			//post minificatedd
					//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
				]
			}
		},
		optionsDefault = {
			'css': true,
			'js': true,
			'html': true
		};

	options = extend(true, {}, optionsDefault, options);

	var i = 0,
		l = files.length;

	for (; i < l; i++) {
		var file = extend(true, {}, fileDefault, files[i]);
		console.log('File: ', file.path);

		//1 is active? you can send an expression
		if(_isNotActive(file)){continue;}

		//2 which name have min file?, default: *.min.*
		file.min = file.min || shared.setExtensionMinFile(file.file, 'min');

		//3 getting the path, you can send an expression
		_makePath(file);

		//4 overwrite?
		if(!file.overwrite && _fileExist(file)) {
			continue;
		}

		//5 Finally I'll create a stream
		var stream = gulp.src(file.path + '/'+ file.file)
				.pipe(debug({verbose: true}))
				.on('error', gutil.log);

		//6 replaces previously to minimisation
		_replace(stream, file.replaces.pre);

		var type = shared.getExtensionFile(file.file);

		if(options[type]){
			if (_handle[type]) {
				_handle[type](stream, file);
			} else {
				console.logRed('Error, extension unknown, check app.json');
			}
		}

		//* replaces posterity to minimisation
		_replace(stream, file.replaces.post);

	/*
	flujo:
		active
		min name
		path
		overwrite
		replace-pre

		css:
			sass
			prefijos
			linter
			save (sin min)
			minifacte

		replace-post
		concat
	*/

	}

}

var _handle = {
	'css' : function(stream, file) {
		console.logWarn('CSS');

		stream.pipe(gif(global.cfg.loader.release, strip({safe:false, block:false})));

		//specify for css like a preprocessors
		if (file.source !== null) {
			console.log('sass');

			var sassOptions = {sourcemap: false, style: 'expanded', noCache: true};
			if (global.cfg.os==='osx') {
				sassOptions['sourcemap=none'] = true;//hack for sass on mac
			}

			stream.pipe(sass(sassOptions));

			if (file.autoPrefix) {
				console.log('autoprefix');
				stream.pipe(autoprefixer(global.cfg.autoprefixer))
					.pipe(replace(' 0px', ' 0'));
			}
		}

		if (file.linter) {
			console.log('Linter');
			stream.pipe(csslint('csslintrc.json'))
				.pipe(csslint.reporter());
		}

		//finish preprocessor process and save it (*.css final version)
		stream.pipe(gulp.dest('aaaa/'+ file.path));

		//if it is false means it need write once, this is the moment!
		if(!file.overwrite){
			console.log('overwrite once');
			stream.pipe(minifycss());
			stream.pipe(gulp.dest('cccc/'+ file.path));
		} else {
			console.log('minificate: '+global.cfg.loader.release);
			stream.pipe(gif(global.cfg.loader.release, minifycss()))
		}

		return stream;

	},
	'js': function(stream, file){
		console.log('NADA AUN JS');
	},
	'html': function(stream, file) {
		console.log('NADA AUN HTML');
	}
};

function _isNotActive(file) {
	return (!eval(file.active));
}

function _makePath(file) {
	//if fail, it is a string
	try {
		file.path = eval(file.path);
	} catch (e) {
	}
}

//if it is minificated version, just validate this file, otherwise check the normal version
//this is util for Libs with out min version
function _fileExist(file){
	var r = false;
	//validate if exit, if exist return don't process nothing
	var p = file.path + '/';
	p += (file.minificated) ? file.min : file.file;

	if(fs.existsSync(p)){
		console.log('File found, don\'t overwrite ('+ p +')');
		r = true;
	}

	return r;
}

function _replace(stream, replaces){
	var i = 0,
		l = replaces.length;

	for (; i < l; i++) {
		var replacePair = replaces[i];
		if(!replacePair || replacePair.length !== 2){
			console.logRed('Replace pair not correct format, check it, it should be two items: 0 = value searched, 1 = replace, elements found: '+ replacePair.length);
			//todo salir con error!
			return;
		}

		console.logGreen('key: "'+ replacePair[0] +'" value: "'+ replacePair[1] +'"');
		stream.pipe(replace(replacePair[0], replacePair[1]));
	}

	return stream;
}
