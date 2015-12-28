/**
 * Created by Crystian on 24/12/2015.
 */

(function(){
	'use strict';

	var utils           = require('../../shared/utils'),
			sprite          = require('gulp-sprite-generator'),
			imagemin        = require('gulp-imagemin'),
			pngquant        = require('imagemin-pngquant'),
			gm              = require('gulp-gm'),
			_               = require('lodash'),
			cache           = require('gulp-cache');

	function optimizeImages(ori, dest, _config){
		var config = _.extend({
			pngLevel: 3,
			jpgLevel: 70,
			progressive: true
		}, _config);

		return gulp.src(ori)
			.pipe(utils.debugeame())
			.pipe(gm(function(gmfile){ //JPG
				gmfile.quality(config.jpgLevel);
				return gmfile;
			}))
			.pipe(imagemin({ //PNG
				progressive: config.progressive,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(dest))
	}

	function optimizeImagesClearCache(done){
		return cache.clearAll(done);
	}

	exports.optimizeImages = optimizeImages;
	exports.optimizeImagesClearCache = optimizeImagesClearCache;
}());