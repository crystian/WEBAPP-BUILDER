/**
 * Created by Crystian on 02/19/2015.
 */

//REMEMBER!: All public TASKS ARE ON tasks.js

var gulp = require('gulp'),
	requireDir = require('require-dir'),
	extend = require('extend'),
	utils = require('../tasks/project/utils');

requireDir('./tasks');

try{
	var fileNameLocal = './project-config-local.json';

	//merge between default and specify:
	global.cfg = extend(true, {},
		require('../project-config.json'),
		require('./project-config.json'),
		utils.fileExist(fileNameLocal) && require(fileNameLocal)
	);

	global.cfg.pkg = require('./package.json');

} catch (e){
	//console.logRed('Do you run installer?, There are some problems with project-config*, check those please');
	console.logRed('Error: '+ e);
	utils.exit(1);
}

//validations always:
if (global.cfg.release && !global.cfg.oneRequest) {
	console.logRed('APP: Release with oneRequest on false, does not posible to build, change the values please');
	utils.exit(1);
}

if (global.cfg.compress && !global.cfg.loader.bower['lz-string']) {
	console.logRed('APP: Compress option active, but library lz-string not present');
	utils.exit(1);
}

//redefine:
//global.cfg.folders.cordovaFull = global.cfg.folders.app +'/'+ global.cfg.folders.cordova;
//global.cfg.folders.wwwFull = global.cfg.folders.app +'/'+ global.cfg.folders.www;
//global.cfg.folders.tempFull = global.cfg.folders.build +'/'+ global.cfg.folders.temp;
//global.cfg.folders.loaderDist = global.cfg.folders.loader +'/'+ global.cfg.folders.build;

//TASK ON tasks.js
