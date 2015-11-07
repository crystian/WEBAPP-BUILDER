/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/framework/utils'),
		fs    = require('fs');

require('shelljs/global');

var testFolder  = 'spec/fixture/02css',
		rootFwk     = '../../../..',
		cssTestFile = '/css/test',
		pathCssTest = 'loader'+ cssTestFile,
		cssFile = rootFwk +'/'+pathCssTest +'.css'
	;

//create and remove a css test file
function createCssTest(){
	var cssTestContent =
			'//This file is just for test, don\'t use it\n\n'+
			'.test{\n'+
			'		animation: parallel .5s 100ms infinite alternate both;\n'+
			'		transform: translateY(0);\n'+
			'		border: 0px;\n'+
			'}';

	cssTestContent.to(pathCssTest +'.scss');
}

function removeCssTest(){
	rm(pathCssTest +'.*');
}

describe("CSS generation - ", function(){

	beforeEach(function(){
		createCssTest();
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
		removeCssTest();
	});

	it('(01) should create css files', function(){
		cd('01');

		expect(test('-e', cssFile)).toBe(false);

		expect(exec('gulp makeCss --testMode', {silent: true}).code).toBe(0);

		expect(test('-e', cssFile)).toBe(true);
	});

	it('(02) should do the autoprefixer', function(){
		cd('02');

		expect(exec('gulp makeConfig --testMode', {silent: true}).code).toBe(0);
		expect(exec('gulp makeCss --testMode', {silent: true}).code).toBe(0);

		var testFile = cat(cssFile);
		expect(testFile).toContain('webkit');
		expect(testFile).toContain('border: 0;');
	});

	it('(03) should do the autoprefixer - without change', function(){
		cd('03');

		expect(exec('gulp makeConfig --testMode', {silent: true}).code).toBe(0);
		expect(exec('gulp makeCss --testMode', {silent: true}).code).toBe(0);

		var testFile = cat(cssFile);
		expect(testFile).not.toContain('webkit');
	});


});