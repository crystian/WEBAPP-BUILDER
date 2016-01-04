/**
 * Created by Crystian on 02/12/2015.
 */
(function(){
	'use strict';

	var utils     = require('../../tasks/shared/utils'),
			fs        = require('fs-extra');

	var args = process.argv.slice(2).join(' ');
	require('shelljs/global');

	var testFolder          = 'spec/fixture/11build',
			rootFwk             = '../../../../';

	describe('11-1hooks: check hooks for build', function(){

		beforeEach(function(){
			cd(testFolder);
		});
		afterEach(function(){
			cd(rootFwk);
		});

		it('(02) should use pre and post build hook on loader', function(){
			cd('02');
			var testFolder2 = 'test';
			rm('-rf', testFolder2);
			expect(test('-e', testFolder2)).toBe(false);

			expect(exec('gulp full --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', testFolder2)).toBe(true);
			expect(test('-e', testFolder2+'/01')).toBe(true);
			expect(test('-e', testFolder2+'/02')).toBe(true);
			expect(test('-e', testFolder2+'/03')).toBe(false);
			expect(test('-e', testFolder2+'/04')).toBe(false);
			expect(test('-e', testFolder2+'/05')).toBe(true);
			expect(test('-e', testFolder2+'/06')).toBe(true);
			expect(test('-e', testFolder2+'/07')).toBe(false);
			expect(test('-e', testFolder2+'/08')).toBe(false);
		});


		it('(02) should use pre and post dist hook on loader', function(){
			cd('02');
			var testFolder2 = 'test';
			rm('-rf', testFolder2);
			expect(test('-e', testFolder2)).toBe(false);

			expect(exec('gulp dist --testMode --debug', {silent: 1}).code).toBe(0);

			expect(test('-e', testFolder2)).toBe(true);
			expect(test('-e', testFolder2+'/01')).toBe(false);
			expect(test('-e', testFolder2+'/02')).toBe(false);
			expect(test('-e', testFolder2+'/03')).toBe(true);
			expect(test('-e', testFolder2+'/04')).toBe(true);
			expect(test('-e', testFolder2+'/05')).toBe(false);
			expect(test('-e', testFolder2+'/06')).toBe(false);
			expect(test('-e', testFolder2+'/07')).toBe(true);
			expect(test('-e', testFolder2+'/08')).toBe(true);
		});


	});

}());



