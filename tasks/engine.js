/**
 * Created by Crystian on 3/16/2015.
 */

var gulp = require('gulp'),
	shared = require('./shared'),
	strip = require('gulp-strip-comments'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	replace = require('gulp-replace'),
	fs = require('fs-extra'),
	extend = require('extend'),
	gif = require('gulp-if'),
	less = require('gulp-less'),
	debug = require('gulp-debug'),
	merge =require('merge-stream'),
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	gutil = require('gulp-util');
	//es = require('event-stream')

	//htmlreplace = require('gulp-html-replace'),
	//htmlmin = require('gulp-htmlmin'),
	//concat = require('gulp-concat'),
	//streamqueue =require('streamqueue'),
	//jshint = require('gulp-jshint'),
	//header = require('gulp-header'),
	//footer = require('gulp-footer'),
	//runSequence = require('run-sequence'),

var defaults = {
	file: {
		'file': 'file.css',		//extension define the flow, can be tipicals and file for preprocessor, automaticaly determine with one will be use
		'active': 'true',		//it will eval this field
		'path': 'www',			//it can be a statement, and it will be evaluated
		//'min': 'file.min.css',//file name final for minificated file, just use it if you want another name, by default is 'min.'+ext
		'linter': true,			//if you want to lint, will not apply for libraries
		'autoPrefix': true,		//auto prefix when source is active
		'overwrite': true,		//specially for libs, just make it once
		'minificated': false,	//if it is a lib for don't re do the minifcation
		'makeMin': false,		//it should be create a minificate version
		'replaces': {
			'pre': [			//pre minificatedd
				//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
			],
			'post': [			//post minificatedd
				//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
			]
		}
	},
	validCssExtensions : ['sass', 'scss','less'],
	options: {
		extensionToProcess : {
			'scss': true,
			'sass': true,
			'less': true,
			'css': true,
			'js': true,
			'html': true
		}
	}
};

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

gulp.task('a', ['preprocessors:loader'], function () {
	return doMagic('../www/app.json');
});

gulp.task('b', function () {
	return doMagic('../www/app.json');
});

gulp.task('preprocessors:loader', function () {
	return preprocessorsProcess('../www/app.json');
});

function preprocessorsProcess(url){
	var files = require(url);
	var i = 0,
		l = files.length,
		streams = undefined;

	for (; i < l; i++) {
		var file = extend(true, {}, defaults.file, files[i]);

		if(_isNotActive(file) || file.minificated){continue;}

		var fileName = shared.getFileName(file.file),
			type = shared.getExtensionFile(file.file);


		//valid types
		if(defaults.validCssExtensions.indexOf(type)===-1){continue;}

		file.path = _makePath(file.path);

		var source = file.path + '/' + file.file,
			final = file.path + '/' + fileName +'.css';

		//which name have min file?, default: *.min.*
		file.min = file.min || shared.setExtensionFilename(file.file, 'min.css');

		if(!fs.existsSync(source)){
			console.logRed('File not found: '+ source);
			_exit(1);
		}

		file._cssFile = final;

		if( !(global.cfg.loader.release || file.overwrite)
			&& (_fileDestExist(file)
			&& !file.overwrite)) {//for the overwrite = false
			//exist, and don't overwrite it
			console.log('File found, don\'t overwrite ('+ file.file +')');
			continue;
		}

		var stream = gulp.src(source)
			.pipe(debug({verbose: true}))
			.on('error', gutil.log);

		switch (type){
			case 'scss':
			case 'sass':
				var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};

				stream = stream.pipe(sass(sassOptions));
				break;
			case 'less':
				stream = stream.pipe(less());
				break;
		}

		if (file.autoPrefix) {
			stream = stream.pipe(autoprefixer(global.cfg.autoprefixer))
				.pipe(replace(' 0px', ' 0'));
		}

		if (file.linter) {
			stream = stream.pipe(csslint('csslintrc.json'))
				.pipe(csslint.reporter()).on('error', gutil.log);
		}

		stream = stream.pipe(gulp.dest(file.path));

		if(file.makeMin){
			stream = _minificate(stream, file, type)
		}

		streams = _merge(streams, stream);
	}

	return streams;
}


function doMagic(url, options){
	var streams = undefined,
		files = require(url);

	options = _mergeOptions(options);

	var i = 0,
		l = files.length;

	for (; i < l; i++) {
		var file = extend(true, {}, defaults.file, files[i]);

		//is active? you can send an expression
		if(_isNotActive(file)){continue;}

		////which name have min file?, default: *.min.*
		//file.min = file.min || shared.setPreExtensionFilename(file.file, 'min');

		//getting the path, you can send an expression
		file.path = _makePath(file.path);

		var source = file.path + '/' + file.file,
			fileName = shared.getFileName(file.file),
			type = shared.getExtensionFile(file.file);

		if(options.extensionToProcess[type]===undefined){
			console.logRed('Error, extension unknown, check app.json: '+ source);
			_exit(-1);
		} else if(options.extensionToProcess[type]===true) {

			//just css files, before that it should be run preprocessorsProcess
			if (defaults.validCssExtensions.indexOf(type) !== -1) {
				type = 'css';
				source = file.path + '/' + fileName + '.css';
			}

			//file should be exist!
			if (!fs.existsSync(source)) {
				console.logRed('File not found!: ' + source);
				_exit(-1);
			}

			//Finally I'll create a stream
			var newStream = gulp.src(source)
				.pipe(debug({verbose: true}))
				.on('error', gutil.log);

			{
				//replaces previously to minimisation
				newStream = _replace(newStream, file.replaces.pre);

				if (_handle[type]) {
					console.log('File to process: ', source);
					newStream = _handle[type](newStream, file);
				}

				//* replaces posterity to minimisation
				newStream = _replace(newStream, file.replaces.post);

			}
		}


		streams = _merge(streams, newStream);
	}

	return streams;

}

function _minificate(stream, file, type){
	//replaces previously to minimisation
	stream = _replace(stream, file.replaces.pre);

	//just css files, before that it should be run preprocessorsProcess
	if (defaults.validCssExtensions.indexOf(type) !== -1) {
		type = 'css';
	}

	if (_handle[type]) {
		console.log('File to process: ', file.file);
		stream = _handle[type](stream, file);
	} else {
		console.logRed('Type not found on _minificate, file: '+ file.file);
	}

	//* replaces posterity to minimisation
	stream = _replace(stream, file.replaces.post);

	return stream;
}

var _handle = {
	'css' : function(stream, file) {
		console.logWarn('CSS');

		stream.pipe(strip({safe:false, block:false}))
			.pipe(minifycss())
			.pipe(rename({extname: '.min.css'}))
			.pipe(gulp.dest(file.path));

		return stream;
	},

	'js': function(stream, file){
		console.log('NADA AUN JS');
		return stream;
	},
	'html': function(stream, file) {
		console.log('NADA AUN HTML');
		return stream;
	}
};


function _mergeOptions(options) {
	//merge options, by default all are true, but if we send and type others will be false
	if (options) {
		var op = {};
		for (ext in defaults.options.extensionToProcess) {
			var extDetected = options.extensionToProcess[ext];
			if (extDetected === undefined) {
				op[ext] = false;
			} else {
				op[ext] = extDetected;
			}
		}
		options.extensionToProcess = op;
	} else {
		options = extend(true, {}, defaults.options);
	}
	return options;
}

function _merge(stream, newStream) {
	return (stream === undefined) ? newStream : merge(stream, newStream);
}

function _isNotActive(file) {
	//eval, yes, with pleasure! :)
	return (!eval(file.active));
}

function _makePath(path) {
	var r = path;
	//if fail, it is a string
	try {
		//eval, yes, with pleasure! :)
		r = eval(path);
	} catch (e) {
	}
	return r;
}

//if it is minificated version, just validate this file, otherwise check the normal version
//this is util for Libs with out min version
function _fileDestExist(file){
	var r = false;

	//validate if exist, if exist return don't process nothing
	var p = (global.cfg.loader.release || file.makeMin) ? file.path + '/' +file.min : file._cssFile;
	if(fs.existsSync(p)){
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
		stream = stream.pipe(replace(replacePair[0], replacePair[1]));
	}

	return stream;
}

function _exit(n){
	process.exit(n);
}