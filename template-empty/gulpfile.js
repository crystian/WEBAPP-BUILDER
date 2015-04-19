/**
 * Created by Crystian on 02/19/2015.
 */

var gulp = require('gulp'),
	requireDir = require('require-dir'),
	_ = require('lodash'),
	gutil = require('gulp-util'),
	folderRoot = '..',
	utils = require(folderRoot +'/tasks/project/utils.js');

//require('time-require');
require(folderRoot +'/tasks/project/shared.js');
require(folderRoot +'/tasks/project/project.js');
requireDir('./tasks');

try{

	var projectNameFile = 'project-active.json',
		projectConfigFile = 'project-config.json',
		projectConfigLocalFile = 'project-config-local.json';

	if(!utils.fileExist(folderRoot +'/'+ projectNameFile)){
		console.logRed(projectNameFile +' not found, where is that???, you can make it with only this content: {"projectCode": "app"}');
		utils.exit(1);
	}

	var projectCode = require(folderRoot +'/'+ projectNameFile).projectCode;
	//merge between default and specify:
	global.cfg = _.merge({},
		require(folderRoot +'/'+ projectConfigFile),
		utils.fileExist(projectConfigLocalFile) && require(folderRoot +'/'+ projectConfigLocalFile),
		utils.fileExist(projectConfigFile) && require('./'+ projectConfigFile),
		utils.fileExist(projectConfigLocalFile) && require('./'+ projectConfigLocalFile)
	);

	global.cfg.projectCode = projectCode;
	global.cfg.appRoot = __dirname;
	global.cfg.folderRoot = folderRoot;

	global.cfg.pkg = require('./package.json');

} catch (e){
	console.log('Do you run installer?, There are some problems with project-config*, check those please');
	gutil.env.debug && console.logRed(e);
	utils.exit(1);
}


//TASK ON tasks.js


if (global.cfg.release && !global.cfg.compress) {
	console.logRed('LOADER: if it is a release, it would be compressed');
	utils.exit(1);
}

if (global.cfg.compress && !global.cfg.loader.bower['lz-string']) {
	console.logRed('LOADER: Compress option active, but library lz-string not present');
	utils.exit(1);
}
