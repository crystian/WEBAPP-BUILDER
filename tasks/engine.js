/**
 * Created by Crystian on 3/16/2015.
 */

var gulp = require('gulp'),
	shared = require('./shared'),
	extend = require('extend'),
//gif = require('gulp-if'),
//htmlreplace = require('gulp-html-replace'),
//htmlmin = require('gulp-htmlmin'),
//concat = require('gulp-concat'),
//minifycss = require('gulp-minify-css'),
//rename = require('gulp-rename'),
//streamqueue =require('streamqueue'),
//merge =require('merge-stream'),
//jshint = require('gulp-jshint'),
//replace = require('gulp-replace'),
//header = require('gulp-header'),
//footer = require('gulp-footer'),
//strip = require('gulp-strip-comments'),
//runSequence = require('run-sequence'),
//clean = require('gulp-clean'),
	fs = require('fs-extra'),
	debug = require('gulp-debug'),
	gutil = require('gulp-util');


gulp.task('a', [], function () {
	var files = require('../www/app.json');

	doMagic(files);

});

function doMagic(files){
	'use strict';

	var fileDefault = {
			'file': 'file.css',
			'active': 'true',	//it will eval this field
			'path': 'www',			//it can be a statement, and it will be evaluated
			'source': null,			//file for preprocessor, automaticaly determine with one will be use
			//'min': 'file.min.css',//file name final for minificated file, just use it if you want another name, by default is 'min.'+ext
			'linter': true,			//if you want to lint, will not apply for libraries
			'minificate': true,		//minificated or ofuscate > min
			'overwrite': true,		//specially for libs, just make it once
			'replaces': {
				'pre': [			//pre minificated
					//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
				],
				'post': [			//post minificated
					//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
				]
			}
		};

	var i = 0,
		l = files.length;

	for (; i < l; i++) {
		var file = extend(true, {}, fileDefault, files[i]);

		//1 is active? you can send an expression
		if(!eval(file.active)){continue;}

		//2 do you want to minificate/obfuscate?, which name?
		if (file.minificate) {
			file.min = file.min || shared.setExtensionMinFile(file.file, 'min');
		}

		//3 getting the path, you can send an expression
		try{
			//if fail, it is a string
			file.path = eval(file.path);
		} catch (e){}

		//4 overwrite? if it is minificate version, just validate this file, otherwise check the normal version
		//this is util for Libs with out min version!
		if(!file.overwrite){
			//validate if exit, if exist return don't process nothing
			var p = file.path + '/';
			p += (file.minificate) ? file.min : file.file;

			if(fs.existsSync(p)){
				console.log('File found, don\'t overwrite ('+ p +')');
				continue;
			}
		}

		//5 replaces previously to minimisation
		var pre = file.replaces.pre;
		if(pre.length > 0){
			var iPre = 0,
				lPre = pre.length;

			for (; iPre < lPre; iPre++) {
				var replacePair = pre[iPre];
				if(!replacePair || replacePair.length !== 2){
					console.logRed('Replace pair not correct format, check it, it should be two items: 0 = value searched, 1 = replace, elements found: '+ replacePair.length);
					//todo salir con error!
					return;
				}

				console.logGreen('PRE key: "'+ replacePair[0] +'" value: "'+ replacePair[1] +'"');
			}
		}





		//* replaces posterity to minimisation
		var post = file.replaces.post;
		if(post.length > 0){
			var iPost = 0,
				lPost = post.length;

			for (; iPost < lPost; iPost++) {
				var replacePairPost = post[iPost];
				if(!replacePairPost || replacePairPost.length !== 2){
					console.logRed('Replace pair not correct format, check it, it should be two items: 0 = value searched, 1 = replace, elements found: '+ replacePairPost.length);
					//todo salir con error!
					return;
				}

				console.logGreen('POST key: "'+ replacePairPost[0] +'" value: "'+ replacePairPost[1] +'"');
			}
		}

		console.log('f ',file.file, file.path);
/*
flujo:
	active
	min name
	path
	overwrite
	replace-pre

	css:
		sass
	prefijos
	linter
	minifacte

	replace-post
	concat
	save
*/
		//
		//switch (type) {
		//	case 'css': console.log('CSS');
		//
		//		//specify for css like a preprocessors
		//		if(file.source!==null){
		//			console.log('SASS');
		//		}
		//
		//		if (file.minificate) {
		//
		//			console.log(file.min);
		//
		//
		//		}
		//
		//
		//		break;
		//	case 'js': console.log('JS');
		//		break;
		//	case 'html': console.log('HTML');
		//		break;
		//}


		//console.log('FILE');
		//console.dir(file);

	}

}