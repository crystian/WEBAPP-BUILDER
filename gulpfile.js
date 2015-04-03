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
	utils = require('./tasks/project/utils.js');

requireDir('./tasks');

try{
	var fileNameLocal = './project-config-local.json';

	//merge between default and specify:
	global.cfg = extend(true, {},
		require('./project-config.json'),
		utils.fileExist(fileNameLocal) && require(fileNameLocal)
	);

	global.cfg.pkg = require('./package.json');

} catch (e){
	//console.logRed('Do you run installer?, There are some problems with project-config*, check those please');
	console.logRed('Error: '+ e);
	process.exit(1);
}

//validations always:
if (global.cfg.loader.release && !global.cfg.oneRequest) {
	console.logRed('LOADER: release with oneRequest on false, does not posible to build, change the values please');
	process.exit(1);
}

if (global.cfg.compress && !global.cfg.loader.bower['lz-string']) {
	console.logRed('LOADER: Compress option active, but library lz-string not present');
	process.exit(1);
}
