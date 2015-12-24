/**
 * Created by Crystian on 24/12/2015.
 */

(function(){
	'use strict';

	var utils    = require('../../shared/utils'),
			sprite   = require('gulp-sprite-generator'),
			imagemin = require('gulp-imagemin'),
			pngquant = require('imagemin-pngquant'),
			cache    = require('gulp-cache');

	function optimizeImages(ori, dest){
		return gulp.src(ori)
			.pipe(utils.debugeame())
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(dest));
	}

	function optimizeImagesClearCache(done){
		return cache.clearAll(done);
	}

	exports.optimizeImages = optimizeImages;
	exports.optimizeImagesClearCache = optimizeImagesClearCache;
}());