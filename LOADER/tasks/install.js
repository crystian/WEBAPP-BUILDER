//
///**
//* Created by Crystian on 15/02/02.
//*/
//
//var gulp = require('gulp'),
//	debug = require('gulp-debug'),
//	uglify = require('gulp-uglify'),
//	inject = require('gulp-inject'),
//	replace = require('gulp-replace'),
//	fs = require('fs');
//
////install
//gulp.task('i', function() {
//	var bower = global.cfg.bower,
//		ambient = 'prod',
//		rJs = [],
//		rCss = [],
//		rBower = {
//			'name':global.cfg.name + ' - by Power Loader',
//			'version' : global.cfg.version,
//			'description' : 'auto generated, don\'t change it, you should use gulp-config to change it and run \'gulp i\'',
//			'dependencies':{}
//		};
//
//	var i = 0,
//		l = bower.length;
//
//	for (; i < l; i++) {
//		var o = bower[i],
//			js = [],
//			css = [];
//
//		if(o['js-'+ ambient]){
//			js = o['js-'+ ambient].map(function (item) {
//				return './vendors/'+item;
//			});
//		}
//
//		if(o['css-'+ ambient]){
//			css = o['css-'+ ambient].map(function (item) {
//				return './vendors/'+item;
//			});
//		}
//
//		if (js && js.length > 0) {
//
//			if(ambient==='prod' && o['generate-js']){
//
//
//				var jsDev = o['js-dev'].map(function (item) {
//					return './vendors/'+item;
//				});
//
//				gulp.src(jsDev)
//					.pipe(uglify())
//					.pipe(gulp.dest(js));
//
//			}
//
//
//			rJs = rJs.concat(js);
//		}
//
//		if (css && css.length > 0) {
//			rCss = rCss.concat(css);
//		}
//
//		if (o.version !== '') {
//			rBower.dependencies[o.name] = o.version;
//		}
//
//	}
//
//	//update bower.json file
//	fs.writeFile('bower.json', JSON.stringify(rBower, null, '\t'), function (err) {
//		if (err) throw err;
//		console.log('Bower.json generated');
//	});
//
//	//replace references on index.html
//	gulp.src(global.cfg.folders.www +'/index.html')
//		.pipe(inject(gulp.src(rJs, {read: false}), {name: 'bower', relative:'true'}))
//		.pipe(inject(gulp.src(rCss, {read: false}), {name: 'bower', relative:'true'}))
//		.pipe(gulp.dest(global.cfg.folders.www));
//});
//
//gulp.task('in', function() {
//	var config = global.cfg.folders.www + '/loader/';
//
//	gulp.src(config +'/config.js')
//		.pipe(debug({verbose: true}))
//		.pipe(replace(/(_loaderCfg\.appName\W+= \')(.+)(\'\;)/, '$1'+global.cfg.name+'$3'))
//		.pipe(replace(/(_loaderCfg\.loaderVersion\W+= \')(.+)(\'\;)/, '$1'+global.cfg.pkg.version+'$3'))
//		.pipe(replace(/(_loaderCfg\.gaId\W+= \')(.+)(\'\;)/, '$1'+global.cfg.gaId+'$3'))
//		.pipe(replace(/(_loaderCfg\.appName\W+= \')(.+)(\'\;)/, '$1'+global.cfg.appName+'$3'))
//		.pipe(replace(/(_loaderCfg\.appId\W+= \')(.+)(\'\;)/, '$1'+global.cfg.appId+'$3'))
//		.pipe(replace(/(_loaderCfg\.appInstaller\W+= \')(.+)(\'\;)/, '$1'+global.cfg.appInstaller+'$3'))
//		.pipe(replace(/(.*\/\/compatibilityFirst)(.|\n)*(\/\/ENDcompatibilityFirst)/, '$1'+global.cfg.compatibilityFirst+'$3'))
//		.pipe(replace(/(.*_loaderCfg\.matrix = )(.|\n)*(;\/\/)/, '$1'+JSON.stringify(global.cfg.compatibilityMatrix,null,'\t')+'$3'))
//		.pipe(replace(/(incompatibleByFeatures : \')(.*)(\',\n)/, '$1'+global.cfg.textIncompatibleByFeatures+'$3'))
//		.pipe(replace(/(incompatibleByDiag : \')(.*)(\',\n)/, '$1'+global.cfg.textIncompatibleByDiag+'$3'))
//		.pipe(replace(/(semiIncompatible : \')(.*)(\',\n)/, '$1'+global.cfg.textSemiIncompatible+'$3'))
//		.pipe(replace(/(faqLink : \')(.*)(\',\n)/, '$1'+global.cfg.textFaqLink+'$3'))
//		.pipe(replace(/(errorRequestFile : \')(.*)(\',\n)/, '$1'+global.cfg.textErrorRequestFile+'$3'))
//		.pipe(replace(/(errorTimeoutServer : \')(.*)(\'\n)/, '$1'+global.cfg.textErrorTimeoutServer+'$3'))
//		.pipe(gulp.dest(config));
//});
