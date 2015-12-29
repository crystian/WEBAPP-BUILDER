/**
 * Created by Crystian on 29/12/2015.
 */

(function(){
	'use strict';

	var templateCache = require('gulp-angular-templatecache'),
			htmlmin       = require('gulp-htmlmin'),
			strip         = require('gulp-strip-comments'),
			utils         = require('./utils');

	function ngTemplate(stream){
		var htmlminOptions = {
			collapseWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true
		};

		return stream
			.pipe(utils.debugeame())
			.pipe(strip({safe: false, block: false}))
			.pipe(htmlmin(htmlminOptions))
			.pipe(templateCache({
				standalone: true,
				root: '../' + global.cfg.app.folders.template + global.cfg.app.folders.www
			}));
	}

	exports.ngTemplate = ngTemplate;

}());