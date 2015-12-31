/**
 * Created by Crystian on 02/19/2015.
 */

//REMEMBER!: All public TASKS ARE ON tasks.js
var gulp = require('gulp'),
		requireDir = require('require-dir');

require('../../tasks/boot').boot({
	gulp: gulp,
	dirname: __dirname
});
