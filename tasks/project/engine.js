/**
 * Created by Crystian on 3/16/2015.
 */

var gulp = require('gulp'),
	utils = require('./utils'),
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
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	aux = require('./auxiliar'),
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
	validExtensions : ['html', 'js'],
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


exports.runPreprocessors = function(appsJson) {
	return runEachApp(appsJson, runEachPreprocessors);
};

exports.runMagic = function(appsJson) {
	return runEachApp(appsJson, doMagic);
};



function runEachApp(appsJson, fnEach){
	var apps = require('../../../'+ appsJson),
		stream = undefined;

	var self = this;

	apps.forEach(function (v) {
		stream = aux.merge(stream, fnEach('www/'+ v +'/app.json'));
	});

	return stream;
}


function runEachPreprocessors(url){
	var files = require('../../../'+ url);
	var i = 0,
		l = files.length,
		streams = undefined;

	for (; i < l; i++) {
		var file = extend(true, {}, defaults.file, files[i]);

		if(aux.isNotActive(file) || file.minificated){continue;}

		var fileName = utils.getFileName(file.file),
			type = utils.getExtensionFile(file.file);


		//valid types
		if(defaults.validCssExtensions.indexOf(type)===-1){continue;}

		file.path = aux.makePath(file.path);

		var source = file.path + '/' + file.file,
			final = file.path + '/' + fileName +'.css';

		//which name have min file?, default: *.min.*
		file.min = file.min || utils.setExtensionFilename(file.file, 'min.css');

		if(!fs.existsSync(source)){
			console.logRed('File not found: '+ source);
			aux.exit(1);
		}

		//just for detect potentian file exists
		file._cssFile = final;

		if( !(global.cfg.loader.release || file.overwrite)
			&& (aux.fileDestExist(file)
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
			stream = _minificateAndSave(stream, file, 'css')
		}

		streams = aux.merge(streams, stream);
	}

	return streams;
}


function doMagic(url, options) {
	var files = require('../../../' + url);
	var i = 0,
		l = files.length,
		streams = undefined;

	for (; i < l; i++) {
		var file = extend(true, {}, defaults.file, files[i]);

		if(aux.isNotActive(file)){continue;}

		var fileName = utils.getFileName(file.file),
			type = utils.getExtensionFile(file.file);

		//valid types and normalize it
		var flagTypeValid = false;
		if (type === 'css' || defaults.validCssExtensions.indexOf(type) !== -1) {
			flagTypeValid = true;
			type = 'css';
		} else if(defaults.validExtensions.indexOf(type) !== -1) {
			flagTypeValid = true;
		}

		if(!flagTypeValid){
			console.logWarn('Invalid file type: '+ file.file);
			continue;
		}

		file.min = file.min || utils.setPreExtensionFilename(file.file, 'min');

		file.path = aux.makePath(file.path);

		var source = file.path +'/'+ fileName + '.' + type;

		if(file.minificated || file.makeMin){
			source = file.path +'/'+ file.min;
		}

		var stream = gulp.src(source)
			.pipe(debug({verbose: true}))
			.on('error', gutil.log);

		if(!file.minificated && !file.makeMin){
			stream = _minificate(stream, file, type)
		}

		streams = aux.merge(streams, stream);
	}

	return streams;
}

function validFileExist(fileName){
	if (!fs.existsSync(fileName)) {
		console.logRed('File not found: ' + fileName);
		aux.exit(1);
	}
}

function _minificateAndSave(stream, file, type){
	stream = _minificate(stream, file, type);

	stream = stream.pipe(gulp.dest(file.path));

	return stream;
}

function _minificate(stream, file, type){
	//replaces previously to minimisation
	stream = aux.replace(stream, file.replaces.pre);

	if (_handle[type]) {
		console.log('File to process: ', file.file);
		stream = _handle[type](stream, file);
	} else {
		console.logRed('Type not found on _minificate, file: '+ file.file);
	}

	//* replaces posterity to minimisation
	stream = aux.replace(stream, file.replaces.post);

	return stream;
}

var _handle = {
	'css' : function(stream, file) {
		console.logWarn('CSS');

		stream = stream
			.pipe(strip({safe:false, block:false}))
			.pipe(minifycss())
			.pipe(rename(file.min))

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

