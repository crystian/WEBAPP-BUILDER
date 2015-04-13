/**
 * Created by Crystian on 10/16/2014.
 * Migrado de grunt, creado el 9/7/2013
 *
 * Loader para languages gym y otras, hecho en varias madrugadas, habra valido la pena?
 */

//REMEMBER!: All public TASKS ARE ON tasks.js

var gulp = require('gulp'),
	requireDir = require('require-dir'),
	extend = require('extend'),
	_ = require('lodash'),
	utils = require('./tasks/project/utils.js');

//require('time-require');
requireDir('./tasks');


try{
	var fileNameLocal = 'project-config-local.json',
		fileNameConfig = 'project-config.json';

	//merge between default and specify:
	global.cfg = _.merge(
		require('./'+ fileNameConfig),
		utils.fileExist('./'+ fileNameLocal) && require('./'+ fileNameLocal)
	);

	//get appName
	var appName = global.cfg.appCode,
		fileApp = './'+ appName +'/'+ fileNameConfig,
		fileAppLocal = './'+ appName +'/'+ fileNameLocal;

	//merge between default and app:
	global.cfg = _.merge(
		global.cfg,
		utils.fileExist(fileApp) && require(fileApp),
		utils.fileExist(fileAppLocal) && require(fileAppLocal)
	);

	global.cfg.appCode = appName;//force template app

	global.cfg.pkg = require('./package.json');

	global.cfg.appRoot = __dirname + '\\' + global.cfg.appCode;

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
