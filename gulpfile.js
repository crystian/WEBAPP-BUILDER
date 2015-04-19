/**
 * Created by Crystian on 10/16/2014.
 * Migrado de grunt, creado el 9/7/2013
 *
 * Loader para languages gym y otras, hecho en varias madrugadas, habra valido la pena?
 */

//REMEMBER!: All public TASKS ARE ON tasks.js

var gutil = require('gulp-util'),
	gulp = require('gulp'),
	requireDir = require('require-dir'),
	extend = require('extend'),
	_ = require('lodash'),
	utils = require('./tasks/project/utils.js');

//require('time-require');
requireDir('./tasks');

try{
	var projectConfigFile = 'project-config.json',
		projectConfigLocalFile = 'project-config-local.json';

	//first argument, second one by default
	var projectCode = gutil.env.projectCode || 'template-ng';

	var	fileConfig = require('./'+ projectConfigFile),
		fileApp = projectCode +'/'+ projectConfigFile,
		fileAppLocal = projectCode +'/'+ projectConfigLocalFile;

	//merge between default and specify:
	global.cfg = _.merge({},
		fileConfig,
		utils.fileExist(projectConfigLocalFile) && require('./'+ projectConfigLocalFile),
		utils.fileExist(fileApp) && require('./'+ fileApp),
		utils.fileExist(fileAppLocal) && require('./'+ fileAppLocal)
	);

	global.cfg.projectCode = projectCode;

	global.cfg.pkg = require('./package.json');

	global.cfg.appRoot = __dirname + '\\' + global.cfg.projectCode;

} catch (e){
	//console.logRed('Do you run installer?, There are some problems with project-config*, check those please');
	console.logRed('Error: '+ e);
	utils.exit(1);
}

if (global.cfg.release && !global.cfg.compress) {
	console.logRed('LOADER: if it is a release, it would be compressed');
	utils.exit(1);
}

if (global.cfg.compress && !global.cfg.loader.bower['lz-string']) {
	console.logRed('LOADER: Compress option active, but library lz-string not present');
	utils.exit(1);
}
