/**
 * Created by Crystian on 3/16/2015.
 */

var gutil = require('gulp-util'),
	debug = require('gulp-debug'),
	utils = require('./utils'),
	strip = require('gulp-strip-comments'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	replace = require('gulp-replace'),
	concat = require('gulp-concat'),
	fs = require('fs-extra'),
	extend = require('extend'),
	uglify = require('gulp-uglify'),
	gif = require('gulp-if'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	StreamQueue = require('streamqueue'),
	aux = require('./auxiliar'),
	shared = require('./shared'),
	commons = require('../commons'),
	LZString = require('../../vendors/lz-string/libs/lz-string'),
	gulp = require('gulp');


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
		'ignore': false,		//ignore on dev time, request by request
		'replaces': {
			'pre': [			//pre minificatedd
				//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
			],
			'post': [			//post minificatedd
				//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
			]
		}
	},
	validCssExtensions : ['sass', 'scss','less', 'css'],
	validExtensions : ['html', 'js'],

    //??
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

exports.runMagic = function(appsJson, options) {
	return runEachApp(appsJson, doMagic, options);
};

exports.runJsonify = function(appsJson, options) {
	return runEachApp(appsJson, runJsonify, options);
};


function runEachApp(appsJson, fnEach, options){
	var apps = require(global.cfg.appRoot +'/'+ appsJson).apps,
		stream = undefined;

	var i = 0,
		l = apps.length;

	for (; i < l; i++) {
		var app = apps[i];
		stream = aux.merge(stream, fnEach(global.cfg.folders.www +'/'+ app +'/app.json', app, options));
	}

	return stream;
}


function runEachPreprocessors(url, appName){
	var files = require(global.cfg.appRoot +'/'+ url).files;
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

		file.path = global.cfg.appRoot +'/'+ aux.makePath(file.path);

		var source = file.path + '/' + file.file,
			finalFileName = file.path + '/' + fileName +'.css';

		//which name have min file?, default: *.min.*
		file.min = file.min || utils.setExtensionFilename(file.file, 'min.css');

		if(!utils.fileExist(source)){
			console.logRed('File not found: '+ source);
			utils.exit(1);
		}

		//just for detect potentian file exists
		file._cssFile = finalFileName;

		if( !(global.cfg.release || file.overwrite)
			&& (aux.fileDestExist(file)
			&& !file.overwrite)) {//for the overwrite = false
			//exist, and don't overwrite it
			console.log('File found, don\'t overwrite ('+ file.file +')');
			continue;
		}

		var stream = gulp.src(source);
			//.pipe(debug({verbose: true}))
			//.on('error', gutil.log);

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

		if(!(file.makeMin && type === 'css')) {
			stream = stream.pipe(gulp.dest(file.path));
		}

		if(file.makeMin){
			stream = _minificateAndSave(stream, file, 'css')
		}

		streams = aux.merge(streams, stream);
	}

	return streams;
}


function doMagic(url, appName, options) {
	var files = require(global.cfg.appRoot +'/'+ url).files;
	var i = 0,
		l = files.length,
		streamsFinal = undefined,
		streams = [];

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
		} else {

			//just for remove header a footer comments
			if(type === 'js'){
				stream = stream.pipe(uglify({
					output:{beautify: false}, mangle: true}
				));
			}
		}

		if(!streams[type]){
			streams[type] = new StreamQueue({ objectMode: true });
		}
		streams[type] = streams[type].queue(stream);
	}


	['css','js','html'].map(function (v) {
		streamsFinal = aux.merge(streamsFinal, _concat(streams, v, appName));
	});

	return streamsFinal;
}

function runJsonify(path, app, options){

	var json = {};
	json.v = global.cfg.version;
	json.j = fs.readFileSync(global.cfg.folders.temp +'/'+ app +'.js', {encoding: 'utf8'});
	json.c = fs.readFileSync(global.cfg.folders.temp +'/'+ app +'.css', {encoding: 'utf8'});
	json.h = fs.readFileSync(global.cfg.folders.temp +'/'+ app +'.html', {encoding: 'utf8'});

	var b = JSON.stringify(json);

	if(cfg.compress){
		b = LZString.compressToUTF16(b);
		console.logGreen(app +' compressed!');
	}

	fs.writeFileSync(global.cfg.folders.build +'/'+ app +'.json', b);

	console.logGreen(app +' generated!');
}

function _concat(_streams, _type, _appName){

	var s = _streams[_type].done();
	s = s.pipe(concat(_appName+'.'+ _type, {newLine: ' '}))
		.pipe(gulp.dest(global.cfg.folders.temp));

	return s;
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
		console.log('File to process:', file.file);
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
		//console.logWarn('CSS');

		stream = stream
			.pipe(strip({safe:false, block:false}))
			.pipe(gif(global.cfg.release || file.makeMin, minifycss()))
			.pipe(rename(utils.setExtensionFilename(file.min,'css')));

		return stream;
	},

	'js': function(stream, file){
		//console.logWarn('JS');

		if(!file.minificated && global.cfg.release){
			stream = commons.jsMaker(stream);
			stream = stream.pipe(strip({safe:false, block:false}));
		}

		return stream;
	},

	'html': function(stream, file) {
		//console.logWarn('HTML');
		stream = shared.htmlMin(stream);
		return stream;
	}
};
