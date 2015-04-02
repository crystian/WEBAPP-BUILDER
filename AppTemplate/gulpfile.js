/**
 * Created by Crystian on 02/19/2015.
 */

var gulp = require('gulp'),
	requireDir = require('require-dir'),
	extend = require('extend'),
	gutil = require('gulp-util');

require('./LOADER/tasks/commons');
requireDir('./tasks');

//merge between default and specify:
try{
	global.cfg = extend(true, {},
		require('./LOADER/project-config.json'),
		require('./project-config.json'),
		require('./project-config-local.json')
	);

	//shortcut to simplify
	global.cfg.folders = global.cfg.app.folders;

	global.cfg.pkg = require('./package.json');

} catch (e){
	console.log('Do you run installer?, There are some problems with gulp-config*, check those please');
	process.exit(1);
}


//redefine:
//global.cfg.folders.cordovaFull = global.cfg.folders.app +'/'+ global.cfg.folders.cordova;
//global.cfg.folders.wwwFull = global.cfg.folders.app +'/'+ global.cfg.folders.www;
//global.cfg.folders.tempFull = global.cfg.folders.build +'/'+ global.cfg.folders.temp;
//global.cfg.folders.loaderDist = global.cfg.folders.loader +'/'+ global.cfg.folders.build;

//TASK ON tasks.js
