///**
// * Created by Crystian on 3/28/2015.
// */
//
//var gulp = require('gulp'),
//	webserver = require('gulp-webserver'),
//	gif = require('gulp-if'),
//	commons = require('../commons'),
//	exec = require('child_process').exec,
//	utils = require('./utils.js'),
//	fs = require('fs-extra'),
//	gutil = require('gulp-util');
//
//
//exports.copyLoader = function(cb){
//	var pathSrc = global.cfg.folderRoot +'/'+ global.cfg.loader.folders.build,
//		pathDest = global.cfg.folders.build;
//
//	fs.copySync(pathSrc +'/'+ global.cfg.loader.filesDest.index, pathDest +'/'+ global.cfg.loader.filesDest.index);
//
//	if (global.cfg.cordova) {
//		fs.copySync(pathSrc +'/'+global.cfg.loader.filesDest.indexCordova, pathDest +'/'+ global.cfg.loader.filesDest.indexCordova);
//	}
//
//	cb();
//};