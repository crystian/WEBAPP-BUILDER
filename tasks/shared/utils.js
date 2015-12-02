/**
 * Created by Crystian on 2/21/2015.
 */

// share with app

var chalk   = require('chalk'),
		_       = require('lodash'),
		path    = require('path'),
		fs      = require('fs'),
		filelog = require('gulp-filelog'),
		debug   = require('gulp-debug'),
		gif     = require('gulp-if'),
		through = require('through2'),
		gutil   = require('gulp-util');

//COMMONS between project and loader:
console.debug = function(){
	if(gutil.env.debug){
		console.log.apply(this, arguments);
	}
};

console.logWarn = function(m){
	console.log(chalk.black.bgYellow(m));
};

console.logGreen = function(m){
	console.log(chalk.black.bgGreen(m));
};

console.logRed = function(m){
	console.log(chalk.red.bold(m));
};

exports.readJsonFile = function(f){
	return eval('(' + cat(f) + ')');
};

exports.saveFile = function(f, c){
	return JSON.stringify(c, null, '\t').to(f);
};

exports.fileExist = function(fileName){
	// I tried using accessSync but doesn't work properly on node 4.2.1
	return fs.existsSync(fileName);
};

exports.normalizePathFwk = function(collection){
	return collection.map(function(_item){
		return global.cfg.pathFwk + _item;
	});
};

exports.addSlash = function(dictionary){
	var arr = Object.keys(dictionary),
			r   = {};

	_.forEach(arr, function(key){
		r[key] = dictionary[key] + '/';
	});

	return r;
};

exports.getExtensionFile = function(s){
	return path.extname(s).replace('.', '');
};

exports.getFileName = function(s){
	return path.basename(s, path.extname(s));
};

exports.getFileNameWithExtension = function(s){
	return path.basename(s);
};

exports.setExtensionFilename = function(s, extension){
	var arr = s.split('.');
	if(arr.length <= 1){
		console.logRed('Extension not found!');
		return s;
	}

	arr.pop();
	arr.push(extension);

	return arr.join('.');
};

exports.setPreExtensionFilename = function(s, preExtension){
	var arr = s.split('.');
	if(arr.length <= 1){
		console.logRed('Extension not found!');
		return s;
	}

	arr.splice(arr.length - 1, 0, preExtension);

	return arr.join('.');
};


/** Function count the occurrences of substring in a string;
 * @param {String} string   Required. The string;
 * @param {String} subString    Required. The string to search for;
 * @param {Boolean} allowOverlapping    Optional. Default: false;
 * @author Vitim.us http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
exports.occurrences = function(string, subString, allowOverlapping) {

	string += "";
	subString += "";
	if (subString.length <= 0) return (string.length + 1);

	var n = 0,
			pos = 0,
			step = allowOverlapping ? 1 : subString.length;

	while (true) {
		pos = string.indexOf(subString, pos);
		if (pos >= 0) {
			++n;
			pos += step;
		} else break;
	}
	return n;
}

exports.debugeame = function(){
	return through.obj()
		.pipe(gif(!!(gutil.env.debug), filelog()))
		//.pipe(gif(!!(gutil.env.debug), debug({verbose: true})))
		.on('error', gutil.log);
};

process.on('uncaughtException', function(err){
	if(typeof err === 'string') err = {message: err};
	console.logRed('uncaughtException: ' + err.message);
	if(gutil.env.debug){
		console.logRed(err.stack);
	}
	this.exit(1); // exit with error
});

exports.exit = function(n){
	process.exit(n);
};

