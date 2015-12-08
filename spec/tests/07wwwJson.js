/**
 * Created by Crystian on 14/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder = 'spec/fixture/07wwwJson',
		rootFwk    = '../../../..',
		w1         = 'www/app1/www.json',
		w2         = 'www/app2/www.json',
		appPath    = 'www/app1/',
		indexCss   = 'www/app1/indexCss',
		indexSass  = 'www/app1/indexSass',
		indexScss  = 'www/app1/indexScss',
		indexLess  = 'www/app1/indexLess',
		indexStyl  = 'www/app1/indexStyl'
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

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(w1).length).toBe(3);

	});

	it('(05) should has three items - independent', function(){
		cd('05');

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(w1).length).toBe(3);

	});

	it('(07) should detect 5 files', function(){
		cd('07');

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

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(4);
		expect(json1[0]).toBe('app1/index1.css');
		expect(json1[1]).toBe('app1/index2.css');
		expect(json1[2]).toBe('app1/index3.css');
		expect(json1[3]).toBe('app1/index4.css');
	});

	it('(03) should rename to css extension - glob - release = false', function(){
		cd('03');

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

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(w1).length).toBe(3);
	});

	it('(10) should ignore file by attribute', function(){
		cd('10');

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(w1).length).toBe(3);
	});

	it('(12) should ignore file by ignoreOnRelease on release mode', function(){
		cd('12');

		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(w1).length).toBe(2);
	});

	it('(13) should fail because file not found', function(){
		cd('13');

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(1);

	});

	it('(14) should works with a complex case', function(){
		cd('14');

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(w1).length).toBe(4);

		expect(utils.readJsonFile(w2).length).toBe(5);
	});

	it('(15) should put min file', function(){
		cd('15');
		rm('-rf', w1);
		rm('-rf', 'www/app1/index.min.css');

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(w1).length).toBe(1);

		expect(utils.readJsonFile(w1)).toContain('app1/index.min.css');
	});

	it('(16) should fail for incompatible opions', function(){
		cd('16');

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(1);
	});

	it('(17) should fail because there is not a minificate version with option "minificated"', function(){
		cd('17');
		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(1);
	});

	it('(18) should fail because there is not a normal version with option "minificated"', function(){
		cd('18');
		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(1);
	});

	it('(19) should make backup on minificated and use it as base', function(){
		cd('19');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 0}).code).toBe(0);

		expect(test('-e', w1)).toBe(true);
		expect(test('-e', appPath +'/index.min.original.css')).toBe(true);
		expect(test('-e', appPath +'/index.original.css')).toBe(true);
	});

	it('(20) should put 1 item. Release: true, minificated: true, generateMin: false, force: false', function(){
		cd('20');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		expect(json1.length).toBe(1);
		expect(json1[0]).toBe('app1/index.min.css');
	});

	it('(21) should put 1 item. Release: true, minificated: false, generateMin: true, force: false', function(){
		cd('21');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		expect(json1.length).toBe(1);
		expect(json1[0]).toBe('app1/index.min.css');
	});

	it('(22) should put 1 item. Release: true, minificated: false, generateMin: false, force: false', function(){
		cd('22');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		//yes there are 2 items, css and min.css, because there are "differents" files
		expect(json1.length).toBe(2);
		expect(json1[0]).toBe('app1/index.css');
		expect(json1[1]).toBe('app1/index.min.css');
	});

	it('(23) should put 1 item. Release: false, minificated: false, generateMin: false, force: false', function(){
		cd('23');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		//yes there are 2 items, css and min.css, because there are "differents" files
		expect(json1.length).toBe(2);
		expect(json1[0]).toBe('app1/index.css');
		expect(json1[1]).toBe('app1/index.min.css');
	});

	it('(24) should put 1 item. Release: false, minificated: true, generateMin: false, force: false', function(){
		cd('24');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		expect(json1.length).toBe(1);
		expect(json1[0]).toBe('app1/index.css');
	});

	it('(25) should put 1 item. Release: false, minificated: true, generateMin: false, force: true', function(){
		cd('25');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		expect(json1.length).toBe(1);
		expect(json1[0]).toBe('app1/index.min.css');
	});

	it('(26) should put 1 item. Release: false, minificated: false, generateMin: true, force: false', function(){
		cd('26');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		expect(json1.length).toBe(1);
		expect(json1[0]).toBe('app1/index.css');
	});

	it('(27) should put 1 item. Release: false, minificated: false, generateMin: true, force: true', function(){
		cd('27');

		rm('-rf', appPath +'/*original*');
		rm('-rf', w1);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);
		expect(json1.length).toBe(1);
		expect(json1[0]).toBe('app1/index.min.css');
	});

	it('(90) complex case 1', function(){
		cd('90');

		rm('-rf', indexCss + '*');
		rm('-rf', indexSass + '*');
		rm('-rf', indexScss + '*');
		rm('-rf', indexLess + '*');
		rm('-rf', indexStyl + '*');

		cp('-f', appPath +'/ori/*', appPath);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(5);
		expect(json1[0]).toBe('app1/indexCss.mini.css');
		expect(json1[1]).toBe('app1/indexLess.mini.css');
		expect(json1[2]).toBe('app1/indexSass.mini.css');
		expect(json1[3]).toBe('app1/indexScss.mini.css');
		expect(json1[4]).toBe('app1/indexStyl.mini.css');
	});

	it('(91) complex case 2', function(){
		cd('91');

		rm('-rf', indexCss + '*');
		rm('-rf', indexSass + '*');
		rm('-rf', indexScss + '*');
		rm('-rf', indexLess + '*');
		rm('-rf', indexStyl + '*');

		cp('-f', appPath +'/ori/*', appPath);

		expect(exec('gulp makeWwwJson --testMode ' + args, {silent: 1}).code).toBe(0);

		var json1 = utils.readJsonFile(w1);

		expect(json1.length).toBe(5);
		expect(json1[0]).toBe('app1/indexCss.min.css');
		expect(json1[1]).toBe('app1/indexLess.min.css');
		expect(json1[2]).toBe('app1/indexSass.css');
		expect(json1[3]).toBe('app1/indexScss.css');
		expect(json1[4]).toBe('app1/indexStyl.css');

	});

});