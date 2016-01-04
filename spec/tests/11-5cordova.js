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
			distFolder  = 'dist/',
			cordovaWww  = 'cordova/www/',
			dummyFolder = cordovaWww + 'dummy',
			testFile    = cordovaWww + 'testfile.js',
			indexFile   = cordovaWww + 'index.html';

	describe('11-5cordova: check some complex cases', function(){

		beforeEach(function(){
			cd(testFolder);
		});
		afterEach(function(){
			cd(rootFwk);
		});

		it('(15) should clear www folder', function(){
			cd('15');
			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);

			mkdir('-p', dummyFolder);
			'file'.to(testFile);

			expect(exec('gulp removeCordovaWww --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', dummyFolder)).toBe(false);
			expect(test('-e', testFile)).toBe(false);
		});

		it('(16) should not clear www folder, because it is not a cordova project', function(){
			cd('16');
			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp removeCordovaWww --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', testFile)).toBe(true);
		});

		fit('(15) should copy on cordova folder', function(){
			cd('15');
			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(0);
			expect(exec('gulp copyCordovaWww --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(test('-e', indexFile)).toBe(true);
			expect(cat(indexFile)).toContain('"active": true'); //cordova
			expect(cat(indexFile)).toContain('"active": false'); //appCache
			expect(cat(indexFile)).toContain('"isDevice": true');
		});


		it('(16) should fail because it is not a cordova project', function(){
			cd('16');

			expect(exec('gulp copyCordovaWww --testMode ' + args, {silent: 1}).code).toBe(2);
		});


	});


}());



