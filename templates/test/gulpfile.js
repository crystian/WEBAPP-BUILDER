/**
 * Created by Crystian on 02/19/2015.
 */

/**
	this file/folder is only for unit test!
 */
var gulp = require('gulp'),
		requireDir = require('require-dir');

require('../../tasks/boot.js').boot({
	gulp: gulp,
	dirname: __dirname
});

requireDir('tasks', {recurse: true});
