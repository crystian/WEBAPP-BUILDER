/**
 * Created by Crystian on 10/16/2014.
 *
 * Loader para languages gym y otras, hecho en varias madrugadas, habra valido la pena?
 */

//HELP & TIPS:
//environment variables, you can read follow this:
//var env = process.env.NODE_ENV;
//to see arguments: gutil.env.
//https://github.com/mikestreety/gulp/blob/master/gulpfile.js

var gulp = require('gulp'),
	requireDir = require('require-dir'),
	gutil = require('gulp-util'),
	dir = requireDir('./tasks');


if(gutil.env.first){
	console.log('* Running first time, making folder and other stuffs, after that, run "gulp i"');
	global.cfg = require('./gulp-config-default.json');

	process.exit(1);
} else {
	//merge between default and specify:
	global.cfg = merge(
		require('./gulp-config-default.json'),
		require('../gulp-config.json'),
		require('../gulp-config-local.json')
	);
}


global.cfg.pkg = require('./package.json');

//TASK ON tasks.js

//be careful, no funciona con hijos, solo con parents directos
function merge(root){
	for ( var i = 1; i < arguments.length; i++ ){
		for ( var key in arguments[i] ){
			root[key] = arguments[i][key];
		}
	}
	return root;
}
