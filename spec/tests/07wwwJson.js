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

describe("make www.json files - ", function(){

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

	it('(01) should get an item from each file', function(){
		cd('01');

		var w1 = 'www/app1/www.json',
				w2 = 'www/app2/www.json';

		rm('-rf', w1);
		rm('-rf', w2);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		var json2 = utils.readJsonFile(w2);

		expect(json1.length).toBe(1);
		expect(json2.length).toBe(1);

		expect(json1[0]).toBe('app1/index.html');
		expect(json2[0]).toBe('app2/index.html');
	});

	it('(02) should fail because there are a definition but there are not files', function(){
		cd('02');

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(1);

	});

	it('(04) should has three items - unique glob', function(){
		cd('04');

		var w1 = 'www/app1/www.json';

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(3);

	});

	it('(05) should has three items - independent', function(){
		cd('05');

		var w1 = 'www/app1/www.json';

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(3);

	});

	it('(07) should rename to css extension', function(){
		cd('07');

		var w1 = 'www/app1/www.json';

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(4);
		expect(json1[0]).toBe('app1/index1.css');
		expect(json1[1]).toBe('app1/index2.css');
		expect(json1[2]).toBe('app1/index3.css');
		expect(json1[3]).toBe('app1/index4.css');
	});

	it('(08) should rename to css extension - glob', function(){
		cd('08');

		var w1 = 'www/app1/www.json';

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(4);
		expect(json1[0]).toBe('app1/index1.css');
		expect(json1[1]).toBe('app1/index2.css');
		expect(json1[2]).toBe('app1/index3.css');
		expect(json1[3]).toBe('app1/index4.css');
	});

	it('(09) should ignore a file - glob', function(){
		cd('09');

		var w1 = 'www/app1/www.json';

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(3);
	});

	it('(10) should ignore file by attribute', function(){
		cd('10');

		var w1 = 'www/app1/www.json';

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(3);
	});

	it('(11) should fail because not recognice extension', function(){
		cd('11');

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(1);

	});

	it('(12) should ignore file by ignoreOnRelease on release mode', function(){
		cd('12');

		var w1 = 'www/app1/www.json';

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(2);
	});

	it('(13) should fail because file not found', function(){
		cd('13');

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(1);

	});
});