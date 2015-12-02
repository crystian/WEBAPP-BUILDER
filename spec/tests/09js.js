/**
 * Created by Crystian on 02/12/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder  = 'spec/fixture/09js',
		rootFwk     = '../../../..',
		indexOri    = 'www/app1/index.original.js',
		indexJs     = 'www/app1/index',
		indexCoffee = 'www/app1/indexCoffee',
		indexTs     = 'www/app1/indexTs',
		keyNotOverw = 'not overwritten'
	;

function createFileTest(){
	var testContent =
				'(function(){\n' +
				'function publicMethod(m){\n' +
				'		console.log("m", m);\n' +
				'	}\n' +
				'	return {\n' +
				'		method: publicMethod\n' +
				'	};\n' +
				'}());';

	testContent.to(indexJs + '.js');
}

describe("preprocessors (js)", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});


	it('(01) should NOT create backup files', function(){
		cd('01');

		rm('-rf', indexOri);

		expect(test('-e', indexOri)).toBe(false);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexOri)).toBe(false);
	});

	it('(02) should create backup files', function(){
		cd('02');

		rm('-rf', indexOri);
		rm('-rf', indexJs + '.js');

		createFileTest();

		expect(test('-e', indexOri)).toBe(false);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexOri)).toBe(true);
	});

	it('(03) should create backup files and modificate the js', function(){
		cd('03');

		rm('-rf', indexOri);
		rm('-rf', indexJs + '.js');

		createFileTest();

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexContent = cat(indexJs + '.js');

		expect(indexContent).toContain('methodReplaced');

		expect(test('-e', indexOri)).toBe(true);
	});

	it('(03) should replace 2 times same replaces', function(){
		cd('03');

		rm('-rf', indexOri);
		rm('-rf', indexJs + '.js');

		createFileTest();

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexContent = cat(indexJs + '.js');

		expect(utils.occurrences(indexContent, 'methodReplaced')).toBe(2);
	});

	it('(04) should do nothing, because there an original file', function(){
		cd('04');

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexContent = cat(indexJs + '.js');

		expect(indexContent).not.toContain('methodReplaced');
	});

	it('(05) should support another filename (postfix)', function(){
		cd('05');

		var indexOther = 'www/app1/index.other.js';
		rm('-rf', indexOther);

		createFileTest();

		expect(test('-e', indexOther)).toBe(false);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexOther)).toBe(true);
	});

	it('(06) should create js files', function(){
		cd('06');
		var ext = '.js';

		rm('-rf', indexCoffee + ext);
		rm('-rf', indexTs + ext);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexCoffee + ext)).toBe(true);
		expect(test('-e', indexTs + ext)).toBe(true);
	});

	it('(07) should works with js linter but with errors', function(){
		cd('07');

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexJs + '.js')).toBe(true);
	});

	it('(08) should fail because use linterForce:true', function(){
		cd('08');

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(1);
	});

	it('(09) should create files (width values)', function(){
		cd('09');
		var ext = '.js';

		rm('-rf', indexCoffee + ext);
		rm('-rf', indexTs + ext);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCoffeeContent = cat(indexCoffee + ext),
				indexTsContent = cat(indexTs + ext);

		var keyword = 'var publicMethod;';
		expect(indexCoffeeContent).toContain(keyword);
		expect(indexTsContent).toContain(keyword);
	});

	it('(12) generate min files', function(){
		cd('12');
		var ext = '.min.js';

		rm('-rf', indexCoffee + ext);
		rm('-rf', indexTs + ext);
		rm('-rf', indexJs + ext);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexCoffee + ext)).toBe(true);
		expect(test('-e', indexTs + ext)).toBe(true);
		expect(test('-e', indexJs + ext)).toBe(true);

		var file = fs.statSync(indexCoffee + ext);
		expect(file.size).toBe(74);

		file = fs.statSync(indexTs + ext);
		expect(file.size).toBe(396);

		file = fs.statSync(indexJs + ext);
		expect(file.size).toBe(65);
	});

	it('(13) generate min files with other extension', function(){
		cd('13');
		var ext = '.other.js';

		rm('-rf', indexCoffee + ext);
		rm('-rf', indexTs + ext);
		rm('-rf', indexJs + ext);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexCoffee + ext)).toBe(true);
		expect(test('-e', indexTs + ext)).toBe(true);
		expect(test('-e', indexJs + ext)).toBe(true);

		var file = fs.statSync(indexJs + ext);
		expect(file.size).toBe(65);
	});

	it('(14) should not replace pre min (not release or not generateMin)', function(){
		cd('14');
		var ext = '.js';

		rm('-rf', indexCoffee + ext);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexCoffee + ext)).not.toContain('methodReplaced');
		expect(cat(indexTs + ext)).not.toContain('methodReplaced');
	});
});