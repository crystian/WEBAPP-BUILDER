/**
 * Created by Crystian on 02/19/2015.
 */

var gulp = require('gulp'),
	requireDir = require('require-dir'),
	_ = require('lodash'),
	gutil = require('gulp-util'),
	utils = require('../tasks/project/utils.js');

//require('time-require');
require('../tasks/project/shared.js');
require('../tasks/project/project.js');
requireDir('./tasks');

//merge between default and specify:
try{
	var fileNameLocal = 'project-config-local.json',
		fileNameConfig = 'project-config.json';

	global.cfg = _.merge({},
		require('../'+ fileNameConfig),
		require('./'+ fileNameConfig),
		utils.fileExist(fileNameLocal) && require('./'+ fileNameLocal)
	);
	//console.log(global.cfg);
	global.cfg.appRoot = __dirname;

	global.cfg.pkg = require('./package.json');

} catch (e){
	console.log('Do you run installer?, There are some problems with gulp-config*, check those please');
	utils.exit(1);
}

//TASK ON tasks.js
