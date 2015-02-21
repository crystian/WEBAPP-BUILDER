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


//REMEMBER!: THE TASKS ARE ON tasks.js


var gulp = require('gulp'),
	requireDir = require('require-dir'),
	extend = require('extend'),
	chalk = require('chalk'),
	gutil = require('gulp-util');

requireDir('./tasks');

//merge between default and specify:
try{
	global.cfg = extend(true, {},
		require('./gulp-config.json'),
		require('../gulp-config.json'),
		require('../gulp-config-local.json')
	);


	global.cfg.folders = global.cfg.loader.folders;

} catch (e){
	console.logRed('Do you run installer?, There are some problems with gulp-config*, check those please');
	process.exit(1);
}

//validations always:
if (global.cfg.loader.release && !global.cfg.loader.oneRequest) {
	console.logRed('oneRequest on false, does not posible to build, change value');
	process.exit(1);
}

if (global.cfg.compress && !global.cfg.loader.bower['lz-string']) {
	console.logRed('Compress option active, but library lz-string not present');
	process.exit(1);
}


global.cfg.pkg = require('./package.json');
global.cfg.loader.withApp = !!(gutil.env.withapp);

