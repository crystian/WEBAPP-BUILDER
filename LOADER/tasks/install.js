
/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	uglify = require('gulp-uglify'),
	inject = require('gulp-inject'),
	fs = require('fs');

//install
gulp.task('i', function() {
	var bower = global.cfg.bower,
		ambient = 'prod',
		rJs = [],
		rCss = [],
		rBower = {
			'name':global.cfg.name + ' - by Power Loader',
			'version' : global.cfg.version,
			'description' : 'auto generated, don\'t change it, you should use gulp-config to change it and run \'gulp i\'',
			'dependencies':{}
		};

	var i = 0,
		l = bower.length;

	for (; i < l; i++) {
		var o = bower[i],
			js = [],
			css = [];

		if(o['js-'+ ambient]){
			js = o['js-'+ ambient].map(function (item) {
				return './vendors/'+item;
			});
		}

		if(o['css-'+ ambient]){
			css = o['css-'+ ambient].map(function (item) {
				return './vendors/'+item;
			});
		}

		if (js && js.length > 0) {

			if(ambient==='prod' && o['generate-js']){


				var jsDev = o['js-dev'].map(function (item) {
					return './vendors/'+item;
				});

				gulp.src(jsDev)
					.pipe(uglify())
					.pipe(gulp.dest(js));

			}


			rJs = rJs.concat(js);
		}

		if (css && css.length > 0) {
			rCss = rCss.concat(css);
		}

		if (o.version !== '') {
			rBower.dependencies[o.name] = o.version;
		}

	}

	//update bower.json file
	fs.writeFile('bower.json', JSON.stringify(rBower, null, '\t'), function (err) {
		if (err) throw err;
		console.log('Bower.json generated');
	});

	//replace references on index.html
	gulp.src('./www/index.html')
		.pipe(inject(gulp.src(rJs, {read: false}), {name: 'bower', relative:'true'}))
		.pipe(inject(gulp.src(rCss, {read: false}), {name: 'bower', relative:'true'}))
		.pipe(gulp.dest('./www'));
});
