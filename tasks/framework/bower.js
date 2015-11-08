/**
 * Created by Crystian on 3/27/2015.
 */

var utils     = require('./utils.js'),
		bower     = require('gulp-bower'),
		fs        = require('fs-extra'),
		gif       = require('gulp-if'),
		minifycss = require('gulp-minify-css'),
		uglify    = require('gulp-uglify'),
		rename    = require('gulp-rename'),
		gutil     = require('gulp-util');

/*
 necesitaba hacer el minificado despues de la bajada, me complico la vida...,
 esto fue lo mejor que me quedo, luego de varias horas ...
 problemas con syncronismo y argumentos
 */
gulp.task('makeBower', ['downloadBower'], function(cb){

	var i   = 0,
			len = global.cfg.varLibsToMin.length;

	if(len === 0){
		cb();
	}

	global.cfg.varLibsToMinI = 0;

	for(; i < len; i++){
		var s = global.cfg.varLibsToMin[i];

		gulp.src(global.cfg.folders.fwk + '/' + s.dev)
			.pipe(utils.debugeame())
			.pipe(gif(s.type === 'js', uglify(), minifycss()))
			.pipe(rename(s.name))
			.pipe(gulp.dest(global.cfg.folders.fwk + '/' + s.pa))
			.on('finish', function(a, b, c){
				console.logGreen('Minification of ' + global.cfg.varLibsToMin[global.cfg.varLibsToMinI].name + '...');
				global.cfg.varLibsToMinI++;
				if(global.cfg.varLibsToMinI === len){
					cb();
				}
			});
	}
});

gulp.task('downloadBower', ['generatorBower'], function(){
	return bower(
			{
				directory: global.cfg.loader.folders.bower,
				cwd: global.cfg.folders.fwk,
				offline: global.cfg.offline
			});
});

gulp.task('generatorBower', ['parseBower'], function(cb){
	//update bower.json file
	fs.writeFile(global.cfg.folders.fwk + '/bower.json', JSON.stringify(global.cfg.varBower, null, '\t'), function(err){
		if(err){
			console.logRed('Error:');
			console.error(err);
			throw err;
		}
		console.logGreen('Bower.json generated');
		cb();
	});
});

gulp.task('parseBower', function(cb){
	var bower     = Object.keys(global.cfg.loader.bower),
			ambient   = global.cfg.loader.release ? 'prod' : 'dev',
			rJs       = [],
			rCss      = [],
			libsToMin = [],
			rBower    = {
				'name': global.cfg.name + ' - by ' + global.cfg.loader.name,
				'version': global.cfg.loader.version,
				'description': 'auto generated, don\'t change it, you should use project-config to change it and run \'gulp i\'',
				'dependencies': {}
			};

	var i = 0,
			l = bower.length;

	for(; i < l; i++){
		var o = global.cfg.loader.bower[bower[i]];

		//set variable on loader app
		global.cfg.loader[bower[i]] = true;

		//set to null if you don't want some lib
		if(!o){
			global.cfg.loader[bower[i]] = false;
			continue;
		}

		rCss = resolveLibs(o, ambient, libsToMin, rCss, 'css');

		rJs = resolveLibs(o, ambient, libsToMin, rJs, 'js');

		if(o.version !== ''){
			rBower.dependencies[bower[i]] = o.version;
		}
	}

	//horrible, I know
	global.cfg.varLibsToMin = libsToMin;
	global.cfg.varBower = rBower;
	global.cfg.varJs = rJs;
	global.cfg.varCss = rCss;

	cb();
});

function resolveLibs(item, ambient, libsToMin, collection, type){
	var lib;

	if(item[type + '-' + ambient]){
		lib = item[type + '-' + ambient].map(function(_item){
			return global.cfg.loader.folders.bower + '/' + _item;
		});
	}

	if(lib && lib.length > 0){

		if(ambient === 'prod' && item['generate-' + type]){

			var dev = item[type + '-dev'].map(function(_item){
				return global.cfg.loader.folders.bower + '/' + _item;
			});

			lib.forEach(function(element, pos){

				//verify if it exist
				if(utils.fileExist(element)){
					return;
				}

				var pathSrc  = element.lastIndexOf('/'),
						name     = element.substr(pathSrc + 1),
						pathDest = element.substr(0, pathSrc);

				libsToMin.push({dev: dev[pos], name: name, pa: pathDest, type: type});

			});

		}

		collection = collection.concat(lib);
	}

	return collection;
}
