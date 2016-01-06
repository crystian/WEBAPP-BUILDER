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

describe("09js: preprocessors (js)", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});


	it('(01) should NOT create backup files', function(){
		cd('01');

		expect(test('-e', indexOri)).toBe(false);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexOri)).toBe(false);
	});

	it('(02) should create backup files', function(){
		cd('02');

		rm('-rf', indexOri);

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

		expect(cat(indexJs + '.js')).toContain('methodReplaced');

		expect(test('-e', indexOri)).toBe(true);
	});

	it('(03) should replace 2 times same replaces', function(){
		cd('03');

		rm('-rf', indexOri);
		rm('-rf', indexJs + '.js');

		createFileTest();

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.occurrences(cat(indexJs + '.js'), 'methodReplaced')).toBe(2);
	});

	it('(04) should do nothing, because there an original file', function(){
		cd('04');

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexJs + '.js')).not.toContain('methodReplaced');
	});

	it('(05) should support another filename (postfix)', function(){
		cd('05');

		var indexOther = 'www/app1/index.other.js';
		rm('-rf', indexOther);

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

		var keyword = 'var publicMethod;';
		expect(cat(indexCoffee + ext)).toContain(keyword);
		expect(cat(indexTs + ext)).toContain(keyword);
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

		expect(fs.statSync(indexCoffee + ext).size).toBeMoreLess(74,4);
		expect(fs.statSync(indexTs + ext).size).toBeMoreLess(396,5);
		expect(fs.statSync(indexJs + ext).size).toBeMoreLess(65,4);
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

		expect(fs.statSync(indexJs + ext).size).toBeMoreLess(65,4);
	});

	it('(14) should replace pre min', function(){
		cd('14');
		var ext = '.js';

		rm('-rf', indexTs + ext);

		expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTs + ext)).toContain('methodReplaced');
	});

	it('(26) should not replace pre min', function(){
		cd('26');
		var ext = '.js';

		rm('-rf', indexTs + ext);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTs + ext)).not.toContain('methodReplaced');
	});

	it('(15) should replace pre min (regular expr)', function(){
		cd('15');
		var ext = '.js';

		rm('-rf', indexTs + ext);

		expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTs + ext)).toContain('MethodReplaced');
	});

	it('(27) should not replace pre min (regular expr)', function(){
		cd('27');
		var file = indexTs + '.js';

		rm('-rf', file);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(file)).not.toContain('MethodReplaced');
	});

	it('(28) should replace pre prepro', function(){
		cd('28');
		var indexTsJs = indexTs + '.js';

		rm('-rf', indexTsJs);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTsJs)).toContain('MethodReplaced');
	});

	it('(29) should replace post prepro', function(){
		cd('29');
		var indexTsJs = indexTs + '.js';

		rm('-rf', indexTsJs);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTsJs)).toContain('var OtherGreeter');
	});

	it('(16) should replace post min', function(){
		cd('16');
		var indexJsMin = indexTs + '.min.js';

		rm('-rf', indexJsMin);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexJsMin)).toContain('var methodReplaced;');

		expect(fs.statSync(indexJsMin).size).toBeMoreLess(398,5);
	});

	it('(17) should minify file', function(){
		cd('17');
		var indexJsMin = indexTs + '.min.js';

		rm('-rf', indexJsMin);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexJsMin)).toContain('button.onclick=function');

		expect(fs.statSync(indexJsMin).size).toBeMoreLess(396,5);
	});

	it('(18) should minify file because it is a dist', function(){
		cd('18');
		var indexJsMin = indexTs + '.js';

		rm('-rf', indexJsMin);

		expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexJsMin)).toContain('button.onclick=function');

		expect(fs.statSync(indexJsMin).size).toBeMoreLess(396,5);
	});

	it('(19) should not process overwrite files - min', function(){
		cd('19');
		var ext = '.min.js';

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTs + ext)).toContain(keyNotOverw);
		expect(cat(indexCoffee + ext)).toContain(keyNotOverw);

		expect(fs.statSync(indexTs + ext).size).toBe(15);
	});

	it('(20) should not process overwrited files', function(){
		cd('20');
		var ext = '.js';

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTs + ext)).toContain(keyNotOverw);
		expect(cat(indexCoffee + ext)).toContain(keyNotOverw);
	});

	it('(21) should not process minificated file', function(){
		cd('21');
		var ext = '.js';

		rm('-rf', indexTs + ext);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexJs + ext)).toContain(keyNotOverw);
	});

	it('(22) should overwriteOnRelease without release', function(){
		cd('22');

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTs + '.js')).toContain(keyNotOverw);

	});

	it('(23) should overwriteOnRelease with release', function(){
		cd('23');
		var indexTsJs = indexTs + '.js';

		rm('-rf', indexTsJs);
		keyNotOverw.to(indexTsJs);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTsJs)).not.toContain(keyNotOverw);

	});

	it('(30) should not remove code for production (not release)', function(){
		cd('30');
		var indexTsJs = indexTs + '.js',
				keyword   = 'alert("remove me on production")';

		rm('-rf', indexTsJs);

		expect(cat(indexTs + '.ts')).toContain(keyword);

		expect(exec('gulp js --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTsJs)).toContain(keyword);

		expect(fs.statSync(indexTsJs).size).toBeMoreLess(687,5);
	});

	it('(31) should remove code for production (release)', function(){
		cd('31');
		var indexTsJs = indexTs + '.js',
				keyword   = 'alert("remove me on production")';

		rm('-rf', indexTsJs);

		expect(cat(indexTs + '.ts')).toContain(keyword);

		expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(cat(indexTsJs)).not.toContain(keyword);

		expect(fs.statSync(indexTsJs).size).toBeMoreLess(396,5);
	});

	it('(90) complex case 1', function(){
		cd('90');
		var indexJsPrePost = indexJs + 'PrePostPreprocess';

		rm('-rf', indexTs + '*');
		rm('-rf', indexCoffee + '*');
		rm('-rf', indexJs + '*');

		cp('-f', 'www/app1/ori/*', 'www/app1');

		expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(0);

		//first app:
		expect(cat(indexTs + '.original.ts')).toContain('var greeter = new publicMethod.Greeter("world");'); //should not change it
		expect(cat(indexTs + '.original.ts')).not.toContain('//ORIGINAL FILE'); //should not get it
		expect(cat(indexTs + '2.original.ts')).toContain('var greeter = new publicMethod.Greeter("world");'); //should not change it
		expect(cat(indexTs + '2.original.ts')).toContain('//ORIGINAL FILE'); //should not change it
		expect(cat(indexTs + '2.ts')).toContain('module MethodReplaced'); //replaced
		expect(cat(indexTs + '2.js')).toContain('var MethodReplaced'); //with replace

		expect(cat(indexCoffee + '.original.coffee')).toContain('publicMethod = (m)');
		expect(cat(indexCoffee + '.coffee')).toContain('MethodReplaced = (m)');
		expect(cat(indexCoffee + '.js')).toContain('{Method2Replaced;');

		expect(fs.statSync(indexTs + '2.js').size).toBeMoreLess(404,5);

		expect(fs.statSync(indexCoffee + '.js').size).toBeMoreLess(90,4);

		//complex
		expect(test('-e', indexJsPrePost + '.js')).toBe(true);
		expect(test('-e', indexJsPrePost + '.bbb.ts')).toBe(true);//backup
		expect(cat(indexJsPrePost + '.js')).toContain('public4Method');

		expect(test('-e', indexJs + '.js')).not.toBe(true);
		expect(test('-e', indexJs + '.bb.coffee')).toBe(true);//original backup with other extension
		expect(cat(indexJs + '.bb.coffee')).toContain('publicMethod');
		expect(test('-e', indexJs + '.mm.js')).toBe(true);//minificated with other extension
		expect(cat(indexJs + '.mm.js')).toContain('public6Method');

		expect(fs.statSync(indexJs + '.mm.js').size).toBeMoreLess(100,5);

		//second app:
		expect(cat('www/app2/index.min.js')).toContain(keyNotOverw);
	});


});