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
	gutil = require('gulp-util');

requireDir('./tasks');

try{
	//merge between default and specify:
	global.cfg = require('./project-config.json');

	//shortcut to simplify
	global.cfg.folders = global.cfg.loader.folders;

	global.cfg.pkg = require('./package.json');

} catch (e){
	console.logRed('Do you run installer?, There are some problems with project-config*, check those please');
	process.exit(1);
}

//validations always:
if (global.cfg.loader.release && !global.cfg.oneRequest) {
	console.logRed('release with oneRequest on false, does not posible to build, change the values please');
	process.exit(1);
}

if (global.cfg.compress && !global.cfg.loader.bower['lz-string']) {
	console.logRed('Compress option active, but library lz-string not present');
	process.exit(1);
}
