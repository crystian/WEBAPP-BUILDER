/**
 * Created by Crystian on 29/12/2015.
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
			buildFolder = 'dist',
			templateJs = 'www/app/templates.js';

	describe('check customs actions', function(){

		beforeEach(function(){
			cd(testFolder);
		});
		afterEach(function(){
			cd(rootFwk);
		});

		it('should do ngTemplate', function(){
			cd('11');

			rm('-rf', distFolder);
			rm('-rf', buildFolder);
			rm('-rf', templateJs);
			expect(test('-e', templateJs)).toBe(false);

			expect(exec('gulp buildProjectDist --testMode '+ args, {silent: 1}).code).toBe(0);

			expect(test('-e', templateJs)).toBe(true);
			expect(cat(templateJs)).toContain('www/app/page/page.tpl.html');
			expect(cat(templateJs)).toContain('angular.module("templates", []).run(["$templateCache",');
			expect(fs.statSync(templateJs).size).toBeMoreLess(431, 5);
		});

	});

}());



