
/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	//del	= require('del'),
	//gutil = require('gulp-util'),
	fs = require('fs');

gulp.task('install', function() {
	var bower = global.cfg.bower;
	bower.name = 'Power Loader';
	bower.version = global.cfg.version;
	bower.description = 'auto generated, don\'t change it, you should use gulp-config to change it and run \'gulp i\'';

	fs.writeFile('bower.json', JSON.stringify(bower, null, '\t'), function (err) {
		if (err) throw err;
		console.log('Bower.json generated');
	});
});


