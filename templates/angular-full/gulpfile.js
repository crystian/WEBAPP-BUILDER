/**
 * Created by Crystian on 02/19/2015.
 */

var gulp = require('gulp'),
		requireDir = require('require-dir');

require('../../tasks/boot').boot({
	gulp: gulp,
	dirname: __dirname
});

requireDir('tasks', {recurse: true});
