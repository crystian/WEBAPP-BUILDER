/**
 * Created by Crystian on 25/12/2015.
 */
(function(){
	'use strict';

	var utils = require('../../tasks/shared/utils'),
			fs    = require('fs-extra');

	var args = process.argv.slice(2).join(' ');
	require('shelljs/global');

	var testFolder  = 'spec/fixture/11build',
			rootFwk     = '../../../../',
			buildFolder = 'build/',
			buildDist   = 'dist/',
			tempFolder  = '.tmp/',
			distFolder  = 'dist/',
			distAppJson = distFolder + 'app.json',
			distIndex   = distFolder + 'index.html',
			appCss      = 'www/app/app.css',
			otherCss    = 'www/app/other.css',
			wwwJson     = 'www/app/www.json';


	describe('11complex: check some complex cases', function(){

		beforeEach(function(){
			cd(testFolder);
		});
		afterEach(function(){
			cd(rootFwk);
		});

		xit('(04) should include "minificated" files without minify', function(){
			cd('04');
			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp dist --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(fs.statSync(distIndex).size).toBeMoreLess(156826, 1000);
			expect(fs.statSync(distAppJson).size).toBeMoreLess(1287503, 10000);
		});

		it('(05) should include "minificated" files', function(){
			cd('05');
			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp dist --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(fs.statSync(distIndex).size).toBeMoreLess(67043, 1000);
			expect(fs.statSync(distAppJson).size).toBeMoreLess(182823, 10000);
		});

		xit('(06) should include "minificated" files because use forceUseMin (over release:false)', function(){
			cd('06');
			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp dist --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(fs.statSync(distIndex).size).toBeMoreLess(156826, 1000);
			expect(fs.statSync(distAppJson).size).toBeMoreLess(184018, 10000);
		});

		it('(07) should not create scss on build process', function(){
			cd('07');

			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			rm('-rf', appCss);
			rm('-rf', wwwJson);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);
			expect(test('-e', appCss)).toBe(false);

			expect(exec('gulp buildProject --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', appCss)).toBe(false);
			expect(test('-e', otherCss)).toBe(true);
		});

		it('(08) should not create scss on dist process (without css file)', function(){
			cd('08');

			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			rm('-rf', wwwJson);
			rm('-rf', appCss);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);
			expect(test('-e', appCss)).toBe(false);

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', appCss)).toBe(false);
			expect(test('-e', otherCss)).toBe(true);
		});

		it('(08) should not include css on dist process (with css created)', function(){
			cd('08');
			var cssFile = '#fromAppScss {\n' +
				'	background-color: red;\n' +
				'}';

			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			rm('-rf', wwwJson);
			rm('-rf', otherCss);
			cssFile.to(appCss);

			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);
			expect(test('-e', wwwJson)).toBe(false);
			expect(test('-e', otherCss)).toBe(false);
			expect(test('-e', appCss)).toBe(true);//should exist

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', appCss)).toBe(true);//should exist
			expect(test('-e', otherCss)).toBe(true);

			expect(cat(appCss)).toContain('#fromAppScss');
			expect(cat(buildFolder + tempFolder + 'app.css')).not.toContain('#fromAppScss');
			expect(cat(buildDist + 'app.json')).not.toContain('#fromAppScss');
		});

		it('(10) should include on process because not is release', function(){
			cd('10');

			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			rm('-rf', wwwJson);
			rm('-rf', otherCss);
			rm('-rf', appCss);

			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);
			expect(test('-e', wwwJson)).toBe(false);
			expect(test('-e', otherCss)).toBe(false);
			expect(test('-e', appCss)).toBe(false);

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', appCss)).toBe(false);//should exist
			expect(test('-e', otherCss)).toBe(true);
		});

		it('(10) should not include css because is release and it was set ignoreOnRelease = true', function(){
			cd('10');
			var cssFile = '#fromAppScss {\n' +
				'	background-color: red;\n' +
				'}';

			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			rm('-rf', wwwJson);
			rm('-rf', otherCss);
			cssFile.to(appCss);

			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);
			expect(test('-e', wwwJson)).toBe(false);
			expect(test('-e', otherCss)).toBe(false);
			expect(test('-e', appCss)).toBe(true);//should exist

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', appCss)).toBe(true);//should exist
			expect(test('-e', otherCss)).toBe(true);

			expect(cat(appCss)).toContain('#fromAppScss');
			expect(cat(buildFolder + tempFolder + 'app.css')).not.toContain('#fromAppScss');
			expect(cat(buildDist + 'app.json')).not.toContain('#fromAppScss');
		});

		it('(10) should generate manifest cache', function(){
			cd('10');

			rm('-rf', distFolder);

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			var manifestFile = 'dist/test 11-10.cache';
			expect(test('-e', manifestFile)).toBe(true);
			expect(cat(manifestFile)).toContain('app.json');

		});

		it('(13) should generate manifest cache with values', function(){
			cd('13');

			rm('-rf', distFolder);

			expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

			var manifestFile = 'dist/othername.cache';
			expect(test('-e', manifestFile)).toBe(true);
			expect(cat(manifestFile)).toContain('prefer-online');
			expect(cat(manifestFile)).toContain('test1');
			expect(cat(manifestFile)).toContain('test2');
			expect(cat(manifestFile)).toContain('app.json');
			expect(cat(manifestFile)).not.toContain('app.1.png');
			expect(cat(manifestFile)).not.toContain('hash');

		});
	});



}());



