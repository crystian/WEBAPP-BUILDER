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
	gutil = require('gulp-util');

requireDir('./tasks');


//merge between default and specify:
try{
	global.cfg = merge(
		require('./gulp-config-master.json'),
		require('../gulp-config.json'),
		require('../gulp-config-local.json')
	);
} catch (e){
	console.log('Do you run installer?, There are some problems with gulp-config*, check those please');
	process.exit(1);
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
