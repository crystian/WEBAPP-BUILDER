/**
 * Created by Crystian on 3/27/2015.
 */


var gulp = require('gulp'),
	merge = require('merge-stream');

exports.merge = function(stream, newStream) {
	return (stream === undefined) ? newStream : merge(stream, newStream);
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
//this is util for Libs with out min version
exports.fileDestExist = function(file){
	var r = false;

	//validate if exist, if exist return don't process nothing
	var p = (global.cfg.loader.release || file.makeMin) ? file.path + '/' +file.min : file._cssFile;
	if(fs.existsSync(p)){
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

exports.exit = function (n){
	process.exit(n);
};