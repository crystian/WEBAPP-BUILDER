/**
 * Created by Crystian on 29/12/2015.
 *
 * just for some framework
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

		var rootFolderTpl = '../';
		if(global.cfg.app.folders.template){
			rootFolderTpl += global.cfg.app.folders.template + global.cfg.app.folders.www;
		}

		return stream
			.pipe(utils.debugeame())
			.pipe(strip({safe: false, block: false}))
			.pipe(htmlmin(htmlminOptions))
			.pipe(templateCache({
				standalone: true,
				root: rootFolderTpl
			}));
	}

	exports.ngTemplate = ngTemplate;

}());