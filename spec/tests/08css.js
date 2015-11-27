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
		indexSass = 'www/app1/indexSass.sass'
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

	it('(06) ', function(){
		cd('06');

		expect(exec('gulp css --testMode ' + args, {silent: 0}).code).toBe(0);

		//expect(test('-e', indexSass)).toBe(true);
	});


});