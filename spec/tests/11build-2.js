/**
 * Created by Crystian on 02/12/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder  = 'spec/fixture/11build',
		rootFwk     = '../../../..',
		buildFolder = 'build',
		wwwIndex    = 'www/index.html',
		index       = buildFolder + '/index.html',
		cssFile       = 'www/app2/app2.css',
		wwwJson       = 'www/app2/www.json';

fdescribe('app.json generation', function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});

	it('should ', function(){
		cd('02');

		rm('-rf', buildFolder);
		rm('-rf', wwwIndex);
		rm('-rf', cssFile);
		rm('-rf', wwwJson);
		expect(test('-e', buildFolder)).toBe(false);
		expect(test('-e', wwwIndex)).toBe(false);
		expect(test('-e', cssFile)).toBe(false);
		expect(test('-e', wwwJson)).toBe(false);

		expect(exec('gulp buildFull --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', buildFolder)).toBe(true);
		expect(test('-e', wwwIndex)).toBe(true);
		expect(test('-e', cssFile)).toBe(true);
		expect(test('-e', wwwJson)).toBe(true);

		//var ind = cat(wwwIndex);
		//expect(ind.indexOf('"oneRequest": false')).toBeGreaterThan(0);
	});


});