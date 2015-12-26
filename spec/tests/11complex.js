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
			tempFolder  = 'temp/',
			distFolder  = 'dist/',
			distAppJson = distFolder + 'app.json',
			distIndex   = distFolder + 'index.html';

	describe('check some complex cases', function(){

		beforeEach(function(){
			cd(testFolder);
		});
		afterEach(function(){
			cd(rootFwk);
		});

		it('should include "minificated" files without minify', function(){
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

		it('should include "minificated" files', function(){
			cd('05');
			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp dist --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(fs.statSync(distIndex).size).toBeMoreLess(67043, 1000);
			expect(fs.statSync(distAppJson).size).toBeMoreLess(184018, 1000);
		});

		it('should include "minificated" files because use forceUseMin (over release:false)', function(){
			cd('06');
			rm('-rf', buildFolder);
			rm('-rf', distFolder);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', distFolder)).toBe(false);

			expect(exec('gulp dist --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', distFolder)).toBe(true);
			expect(fs.statSync(distIndex).size).toBeMoreLess(156826, 1000);
			expect(fs.statSync(distAppJson).size).toBeMoreLess(184018, 1000);
		});

	});

}());



