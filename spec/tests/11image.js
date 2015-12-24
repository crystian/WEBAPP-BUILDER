/**
 * Created by Crystian on 02/12/2015.
 */
(function(){
	'use strict';

	var utils = require('../../tasks/shared/utils'),
			fs    = require('fs-extra');

	var args = process.argv.slice(2).join(' ');
	require('shelljs/global');

	var testFolder = 'spec/fixture/11build',
			rootFwk    = '../../../../',
			distFolder = 'dist',
			funnyDog   = distFolder + '/img/funnydog.jpg',
			kitten     = distFolder + '/img/kitten.png';

	describe('check optimizer', function(){

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

			expect(fs.statSync(funnyDog).size).toBeMoreLess(13296, 100);
			expect(fs.statSync(kitten).size).toBeMoreLess(34018, 100);

		});


	});

}());



