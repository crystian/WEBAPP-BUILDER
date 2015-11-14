/**
 * Created by Crystian on 14/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder       = 'spec/fixture/07wwwJson',
		rootFwk          = '../../../..'
		//pathLoader       = '/loader',
		//index            = '/index.html',
		//indexCordova     = '/index-cordova.html',
		//configJson       = 'config.json',
		//indexFile        = rootFwk + pathLoader + index,
		//indexFileCordova = rootFwk + pathLoader + indexCordova;
;

fdescribe("make www.json files - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});


	it('(01) should create www.json', function(){
		cd('01');

		var w1 = 'www/app1/www.json',
				w2 = 'www/app2/www.json';

		rm('-rf', w1);
		rm('-rf', w2);

		expect(test('-e', w1)).toBe(false);
		expect(test('-e', w2)).toBe(false);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', w1)).toBe(true);
		expect(test('-e', w2)).toBe(true);
	});

	fit('(01) should create index.html', function(){
		cd('01');

		var w1 = 'www/app1/www.json',
				w2 = 'www/app2/www.json';

		rm('-rf', w1);
		rm('-rf', w2);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 0}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		var json2 = utils.readJsonFile(w2);

		expect(json1.length).toBeGreaterThan(0);
		expect(json2.length).toBeGreaterThan(0);
	});

});