/**
 * Created by Crystian on 14/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder       = 'spec/fixture/08css',
		rootFwk          = '../../../..',
		indexCssOri = 'www/app1/indexCss.original.css',
		indexCss = 'www/app1/indexCss.css',
		indexSass = 'www/app1/indexSass',
		indexScss = 'www/app1/indexScss',
		indexLess = 'www/app1/indexLess',
		indexStyl = 'www/app1/indexStyl'
;

function createCssTest(){
	var cssTestContent =
		'body {'+
		'	color: #ff0;'+
		'}';

	cssTestContent.to(indexCss);
}

fdescribe("css", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});


	it('(01) should NOT create backup files', function(){
		cd('01');

		rm('-rf', indexCssOri);

		expect(test('-e', indexCssOri)).toBe(false);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexCssOri)).toBe(false);
	});

	it('(02) should create backup files', function(){
		cd('02');

		rm('-rf', indexCssOri);

		expect(test('-e', indexCssOri)).toBe(false);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexCssOri)).toBe(true);
	});

	it('(03) should create backup files and modificate the css', function(){
		cd('03');

		rm('-rf', indexCss);
		rm('-rf', indexCssOri);

		createCssTest();

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexCss);

		expect(indexCssContent).toContain('yellow');
	});

	it('(04) should do nothing, becasuse there an original file', function(){
		cd('04');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexCss);

		expect(indexCssContent).not.toContain('yellow');
	});

	it('(05) should support another filename (postfix)', function(){
		cd('05');

		var indexCssOther = 'www/app1/indexCss.other.css';
		rm('-rf', indexCssOther);

		createCssTest();

		expect(test('-e', indexCssOther)).toBe(false);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexCssOther)).toBe(true);
	});

	it('(06) should create css files', function(){
		cd('06');
		rm('-rf', indexSass +'.css');
		rm('-rf', indexScss +'.css');
		rm('-rf', indexLess +'.css');
		rm('-rf', indexStyl +'.css');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexSass +'.css')).toBe(true);
		expect(test('-e', indexScss +'.css')).toBe(true);
		expect(test('-e', indexLess +'.css')).toBe(true);
		expect(test('-e', indexStyl +'.css')).toBe(true);
	});

	it('(07) should works with css linter but with errors', function(){
		cd('07');
		rm('-rf', indexScss +'.css');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', indexScss +'.css')).toBe(true);
	});

	it('(08) should fail because use linterForce:true', function(){
		cd('08');
		rm('-rf', indexScss +'.css');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(1);

		expect(test('-e', indexScss +'.css')).toBe(false);
	});

	it('(09) should create css files (width css values)', function(){
		cd('09');
		rm('-rf', indexSass +'.css');
		rm('-rf', indexScss +'.css');
		rm('-rf', indexLess +'.css');
		rm('-rf', indexStyl +'.css');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexSassContent = cat(indexSass +'.css'),
				indexScssContent = cat(indexScss +'.css'),
				indexLessContent = cat(indexLess +'.css'),
				indexStylContent = cat(indexStyl +'.css');

		var keyword = 'color: #FF0;';
		expect(indexSassContent).toContain(keyword);
		expect(indexScssContent).toContain(keyword);
		expect(indexLessContent).toContain(keyword);
		expect(indexStylContent).toContain(keyword.toLowerCase());
	});

	it('(10) should perfix css (only chrome)', function(){
		cd('10');
		rm('-rf', indexSass +'.css');
		rm('-rf', indexScss +'.css');
		rm('-rf', indexLess +'.css');
		rm('-rf', indexStyl +'.css');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexSassContent = cat(indexSass +'.css'),
				indexScssContent = cat(indexScss +'.css'),
				indexLessContent = cat(indexLess +'.css'),
				indexStylContent = cat(indexStyl +'.css');

		var keyword = '-webkit-transform: rotateX(150deg);';
		expect(indexSassContent).toContain(keyword);
		expect(indexScssContent).toContain(keyword);
		expect(indexLessContent).toContain(keyword);
		expect(indexStylContent).toContain(keyword);

		var keywordNot = 'display: -ms-flexbox;';
		expect(indexSassContent).not.toContain(keywordNot);
		expect(indexScssContent).not.toContain(keywordNot);
		expect(indexLessContent).not.toContain(keywordNot);
		expect(indexStylContent).not.toContain(keywordNot);
	});

	it('(11) should NOT perfix css', function(){
		cd('11');
		rm('-rf', indexSass +'.css');
		rm('-rf', indexScss +'.css');
		rm('-rf', indexLess +'.css');
		rm('-rf', indexStyl +'.css');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexSassContent = cat(indexSass +'.css'),
				indexScssContent = cat(indexScss +'.css'),
				indexLessContent = cat(indexLess +'.css'),
				indexStylContent = cat(indexStyl +'.css');

		var keywordNot1 = '-webkit-transform: rotateX(150deg);';
		expect(indexSassContent).not.toContain(keywordNot1);
		expect(indexScssContent).not.toContain(keywordNot1);
		expect(indexLessContent).not.toContain(keywordNot1);
		expect(indexStylContent).not.toContain(keywordNot1);

		var keywordNot2 = 'display: -ms-flexbox;';
		expect(indexSassContent).not.toContain(keywordNot2);
		expect(indexScssContent).not.toContain(keywordNot2);
		expect(indexLessContent).not.toContain(keywordNot2);
		expect(indexStylContent).not.toContain(keywordNot2);
	});
});