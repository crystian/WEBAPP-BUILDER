/**
 * Created by Crystian on 24/12/2015.
 */

(function(){
	'use strict';

	var utils    = require('../../shared/utils'),
			imagemin = require('gulp-imagemin'),
			pngquant = require('imagemin-pngquant'),
			gm       = require('gulp-gm'),
			_        = require('lodash'),
			gutil    = require('gulp-util'),
			sprite   = require('gulp-sprite-generator'),
			cache    = require('gulp-cache');

	function optimizeImages(ori, dest, _config){
		var config = _.extend({
			pngLevel: 3,
			jpgLevel: 70,
			progressive: true
		}, _config);

		return gulp.src(ori)
			.pipe(utils.debugme())
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

	function genSprite(stream, appName){
		var imgFolder = 'img';

		var spriteOutput = stream
			.pipe(sprite({
				baseUrl: './',
				spriteSheetName: appName + '.png',
				spriteSheetPath: imgFolder,
				padding: 1,
				algorithm: 'binary-tree',
				//isRetina: false,
				//engine: 'gm',
				verbose: !!gutil.env.debug,
				groupBy: [
					function(image){
						//if (gutil.env.debug) {
						//	console.dir(image);
						//}

						//getting number of sprite folder
						var num   = /(sprite)(.)(\/)/.exec(image.url),
								group = 1;

						if(num !== null && num.length > 0){
							group = num[2];
						}

						return '' + group;
					}
				],
				engineOpts: {
					imagemagick: false
				}
			}));

		spriteOutput.img.pipe(gulp.dest(global.cfg.app.folders.dist + '/' + imgFolder));

		return spriteOutput.css;
	}

	exports.optimizeImages = optimizeImages;
	exports.optimizeImagesClearCache = optimizeImagesClearCache;
	exports.genSprite = genSprite;
}());