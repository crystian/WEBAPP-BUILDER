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
	dir = requireDir('./tasks');

//merge between default and specify:
global.cfg = merge(
	require('./gulp-config-default.json'),
	require('../gulp-config.json'),
	require('../gulp-config-local.json')
);

global.cfg.pkg = require('./package.json');


function merge(root){
	for ( var i = 1; i < arguments.length; i++ ){
		for ( var key in arguments[i] ){
			root[key] = arguments[i][key];
		}
	}
	return root;
}
