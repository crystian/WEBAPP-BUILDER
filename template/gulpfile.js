/**
 * Created by Crystian on 02/19/2015.
 */

var gulp = require('gulp'),
	requireDir = require('require-dir'),
	extend = require('extend'),
	gutil = require('gulp-util'),
	utils = require('../tasks/project/utils.js');

require('time-require');
require('../tasks/project/shared.js');
requireDir('./tasks');

//merge between default and specify:
try{
	var fileNameLocal = './project-config-local.json';

	global.cfg = extend(true, {},
		require('../project-config.json'),
		utils.fileExist(fileNameLocal) && require(fileNameLocal),
		require('./project-config.json')
	);

	global.cfg.appRoot = __dirname;
	//global.cfg.appCode = shared.getDirectoryName(__dirname);
	//console.logRed(global.cfg.appCode);
	global.cfg.pkg = require('./package.json');

} catch (e){
	console.log('Do you run installer?, There are some problems with gulp-config*, check those please');
	utils.exit(1);
}

//TASK ON tasks.js
