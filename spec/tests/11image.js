/**
 * Created by Crystian on 02/12/2015.
 */
(function(){
	'use strict';

	var utils = require('../../tasks/shared/utils'),
			fs    = require('fs-extra');

	var args = process.argv.slice(2).join(' ');
	require('shelljs/global');

	var testFolder  = 'spec/fixture/11build',
			rootFwk     = '../../../../',
			distFolder  = 'dist/',
			buildFolder = 'build/',
			funnyDog    = distFolder + 'img/funnydog.jpg',
			kitten      = distFolder + 'img/kitten.png',
			app1Png     = 'img/app.1.png',
			app2Png     = 'img/app.2.png',
			app21Png    = 'img/app.@2x.1.png',
			app22Png    = 'img/app.@2x.2.png',
			appCss      = 'www/app/app.css',
			otherCss    = 'www/app/other.css',
			appCssTemp  = buildFolder + '.tmp/app.css',
			appJson     = distFolder + 'app.json',
			app1Png1     = 'img/app1.1.png',
			app2Png1     = 'img/app1.2.png',
			app21Png1    = 'img/app1.@2x.1.png',
			app22Png1    = 'img/app1.@2x.2.png',
			appCss1      = 'www/app1/app.css',
			otherCss1    = 'www/app1/other.css',
			appCssTemp1  = buildFolder + '.tmp/app1.css',
			appJson1     = distFolder + 'app1.json',
			app1Png2     = 'img/app2.1.png',
			app2Png2     = 'img/app2.2.png',
			app21Png2    = 'img/app2.@2x.1.png',
			app22Png2    = 'img/app2.@2x.2.png',
			appCss2      = 'www/app2/app.css',
			otherCss2    = 'www/app2/other.css',
			appCssTemp2  = buildFolder + '.tmp/app2.css',
			appJson2     = distFolder + 'app2.json';

	describe('11image: check optimizer', function(){

		beforeEach(function(){
			cd(testFolder);
		});
		afterEach(function(){
			cd(rootFwk);
		});

		it('should optimize images', function(){
			cd('03');

			rm('-rf', distFolder);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp dist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(test('-e', funnyDog)).toBe(true);
			expect(test('-e', kitten)).toBe(true);

			expect(fs.statSync(funnyDog).size).toBeMoreLess(8210, 500);
			expect(fs.statSync(kitten).size).toBeMoreLess(34018, 100);

		});

	});

	describe('generate sprites', function(){

		beforeEach(function(){
			cd(testFolder);
		});
		afterEach(function(){
			cd(rootFwk);
		});

		/*
		 * generacion de sprite 1 y 2 apps: peso, existencia, css (rutas) ignores,	 solo carpeta sprite
		 */

		it('should create a sprite 1 app: release false', function(){
			cd('12');

			rm('-rf', distFolder);
			rm('-rf', buildFolder);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(test('-e', distFolder + app1Png)).toBe(true);
			expect(test('-e', distFolder + app2Png)).toBe(true);
			expect(test('-e', distFolder + app21Png)).toBe(true);
			expect(test('-e', distFolder + app22Png)).toBe(true);

			expect(fs.statSync(distFolder + app1Png).size).toBeMoreLess(53248, 5000);
			expect(fs.statSync(distFolder + app2Png).size).toBeMoreLess(63198, 6000);
			expect(fs.statSync(distFolder + app21Png).size).toBeMoreLess(192207, 20000);
			expect(fs.statSync(distFolder + app22Png).size).toBeMoreLess(235508, 20000);

			//app
			expect(cat(appCss)).toContain(app1Png);
			expect(cat(appCss)).not.toContain(app2Png);
			expect(cat(appCss)).toContain(app21Png);
			expect(cat(appCss)).not.toContain(app22Png);

			//other
			expect(cat(otherCss)).not.toContain(app1Png);
			expect(cat(otherCss)).toContain(app2Png);
			expect(cat(otherCss)).not.toContain(app21Png);
			expect(cat(otherCss)).toContain(app22Png);

			//concated on temp
			expect(cat(appCssTemp)).toContain(app1Png);
			expect(cat(appCssTemp)).toContain(app2Png);
			expect(cat(appCssTemp)).toContain(app21Png);
			expect(cat(appCssTemp)).toContain(app22Png);

			//on dist
			expect(cat(appJson)).toContain(app1Png);
			expect(cat(appJson)).toContain(app2Png);
			expect(cat(appJson)).toContain(app21Png);
			expect(cat(appJson)).toContain(app22Png);
		});

		it('should create a sprite 1 app: release true', function(){
			cd('13');

			rm('-rf', distFolder);
			rm('-rf', buildFolder);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(test('-e', distFolder + app1Png)).toBe(true);
			expect(test('-e', distFolder + app2Png)).toBe(true);
			expect(test('-e', distFolder + app21Png)).toBe(true);
			expect(test('-e', distFolder + app22Png)).toBe(true);

			expect(fs.statSync(distFolder + app1Png).size).toBeMoreLess(53248, 5000);
			expect(fs.statSync(distFolder + app2Png).size).toBeMoreLess(63198, 6000);
			expect(fs.statSync(distFolder + app21Png).size).toBeMoreLess(192207, 20000);
			expect(fs.statSync(distFolder + app22Png).size).toBeMoreLess(235508, 20000);

			//app
			expect(cat(appCss)).toContain(app1Png);
			expect(cat(appCss)).not.toContain(app2Png);
			expect(cat(appCss)).toContain(app21Png);
			expect(cat(appCss)).not.toContain(app22Png);

			//other
			expect(cat(otherCss)).not.toContain(app1Png);
			expect(cat(otherCss)).toContain(app2Png);
			expect(cat(otherCss)).not.toContain(app21Png);
			expect(cat(otherCss)).toContain(app22Png);

			//concated on temp
			expect(cat(appCssTemp)).toContain(app1Png);
			expect(cat(appCssTemp)).toContain(app2Png);
			expect(cat(appCssTemp)).toContain(app21Png);
			expect(cat(appCssTemp)).toContain(app22Png);

			//on dist
			expect(cat(appJson)).toContain(app1Png);
			expect(cat(appJson)).toContain(app2Png);
			expect(cat(appJson)).toContain(app21Png);
			expect(cat(appJson)).toContain(app22Png);
		});

		it('should create a sprite 2 apps: release false', function(){
			cd('14');

			rm('-rf', distFolder);
			rm('-rf', buildFolder);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(test('-e', distFolder + app1Png1)).toBe(true);
			expect(test('-e', distFolder + app2Png1)).toBe(true);
			expect(test('-e', distFolder + app21Png1)).toBe(true);
			expect(test('-e', distFolder + app22Png1)).toBe(true);

			//APP1
			expect(fs.statSync(distFolder + app1Png1).size).toBeMoreLess(53248, 5000);
			expect(fs.statSync(distFolder + app2Png1).size).toBeMoreLess(63198, 6000);
			expect(fs.statSync(distFolder + app21Png1).size).toBeMoreLess(192207, 20000);
			expect(fs.statSync(distFolder + app22Png1).size).toBeMoreLess(235508, 20000);

			//app
			expect(cat(appCss1)).toContain(app1Png1);
			expect(cat(appCss1)).not.toContain(app2Png1);
			expect(cat(appCss1)).toContain(app21Png1);
			expect(cat(appCss1)).not.toContain(app22Png1);

			//other
			expect(cat(otherCss1)).not.toContain(app1Png1);
			expect(cat(otherCss1)).toContain(app2Png1);
			expect(cat(otherCss1)).not.toContain(app21Png1);
			expect(cat(otherCss1)).toContain(app22Png1);

			//concated on temp
			expect(cat(appCssTemp1)).toContain(app1Png1);
			expect(cat(appCssTemp1)).toContain(app2Png1);
			expect(cat(appCssTemp1)).toContain(app21Png1);
			expect(cat(appCssTemp1)).toContain(app22Png1);

			//on dist
			expect(cat(appJson1)).toContain(app1Png1);
			expect(cat(appJson1)).toContain(app2Png1);
			expect(cat(appJson1)).toContain(app21Png1);
			expect(cat(appJson1)).toContain(app22Png1);

			//APP2
			expect(fs.statSync(distFolder + app1Png2).size).toBeMoreLess(18610, 2000);
			expect(fs.statSync(distFolder + app2Png2).size).toBeMoreLess(21009, 2000);
			expect(fs.statSync(distFolder + app21Png2).size).toBeMoreLess(39517, 4000);
			expect(fs.statSync(distFolder + app22Png2).size).toBeMoreLess(39451, 4000);

			//app
			expect(cat(appCss2)).toContain(app1Png2);
			expect(cat(appCss2)).not.toContain(app2Png2);
			expect(cat(appCss2)).toContain(app21Png2);
			expect(cat(appCss2)).not.toContain(app22Png2);

			//other
			expect(cat(otherCss2)).not.toContain(app1Png2);
			expect(cat(otherCss2)).toContain(app2Png2);
			expect(cat(otherCss2)).not.toContain(app21Png2);
			expect(cat(otherCss2)).toContain(app22Png2);

			//concated on temp
			expect(cat(appCssTemp2)).toContain(app1Png2);
			expect(cat(appCssTemp2)).toContain(app2Png2);
			expect(cat(appCssTemp2)).toContain(app21Png2);
			expect(cat(appCssTemp2)).toContain(app22Png2);

			//on dist
			expect(cat(appJson2)).toContain(app1Png2);
			expect(cat(appJson2)).toContain(app2Png2);
			expect(cat(appJson2)).toContain(app21Png2);
			expect(cat(appJson2)).toContain(app22Png2);
		});
	});

}());



