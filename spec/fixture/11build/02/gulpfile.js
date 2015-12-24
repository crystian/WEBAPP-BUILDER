/**
 * Created by Crystian on 02/19/2015.
 */

//REMEMBER!: All public TASKS ARE ON tasks.js
var gulp = require('gulp'),
		fs = require('fs-extra');

require('../../../../tasks/boot.js').boot({
	gulp: gulp,
	dirname: __dirname
});

gulp.task('hookPreBuildLoader', function () {
	console.log('01');
	fs.mkdirsSync('test/01');
});

gulp.task('hookPostBuildLoader', function () {
	console.log('02');
	fs.mkdirsSync('test/02');
});

gulp.task('hookPreDistLoader', function () {
	console.log('03');
	fs.mkdirsSync('test/03');
});

gulp.task('hookPostDistLoader', function () {
	console.log('04');
	fs.mkdirsSync('test/04');
});

gulp.task('hookPreBuildProject', function () {
	console.log('05');
	fs.mkdirsSync('test/05');
});

gulp.task('hookPostBuildProject', function () {
	console.log('06');
	fs.mkdirsSync('test/06');
});

gulp.task('hookPreDistProject', function () {
	console.log('07');
	fs.mkdirsSync('test/07');
});

gulp.task('hookPostDistProject', function () {
	console.log('08');
	fs.mkdirsSync('test/08');
});