/**
 * Created by Crystian on 01/11/2015.
 */

//var fs = require('fs');

require('shelljs/global');

function readFile(f){
	return eval('('+cat(f)+')');
}

function saveFile(f, c){
	return JSON.stringify(c, null,'\t').to(f);
}

function createPkgJson(){
	return pkgJsonContent.to(pkgJson);
}

var pkgJson = 'package.json',
		pkgJsonContent = '{"name": "test 04","private": true,"dependencies": {}}',
		testFolder = 'templates/test/boot';

describe("Full test for the build system of framework (fuaaa) - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd('../../../../');
	});

	it('should send the gulp', function(){
		cd('01');
		expect(exec('gulp nothing', {silent:true}).code).toBe(1);
	});

	it("should fill gitVersion field", function(){
		cd('02');
		createPkgJson();

		expect(exec('gulp nothing', {silent:true}).code).toBe(0);

		var pkg = readFile(pkgJson);
		expect(pkg.gitVersion).toBeDefined();
	});

	it("should fail with incompatible parameters (release-compress)", function(){
		cd('03');
		expect(exec('gulp nothing', {silent:true}).code).toBe(1);
	});

	it("should fail with incompatible parameters (compress-lz-string)", function(){
		cd('04');
		expect(exec('gulp nothing', {silent:true}).code).toBe(1);
	});

	//CONFIG
	it("should not have the name attribute", function(){
		cd('05');
		createPkgJson();

		expect(exec('gulp nothing', {silent:true}).code).toBe(0);
	});

//TODO hacer la prueba sin el local del fwk


	//it("npm install", function()
	//{
	//	rm('-rf', 'node_modules');
	//	expect(test('-d', 'node_modules')).toBe(false);
	//	expect(exec('npm install', {silent:true}).code).toBe(0);
	//	expect(test('-d', 'node_modules')).toBe(true);
	//});

	//it("gulp nothing", function(){
	//	//rm('-rf', 'dist');
	//	//expect(test('-d', 'dist')).toBe(false);
	//	expect(exec('gulp nothing', {silent:true}).code).toBe(0);
	//	//expect(test('-f', 'dist/main.css')).toBe(true);
	//});

	//it("gulp src", function()
	//{
	//	rm('-rf', 'dist');
	//	expect(test('-d', 'dist')).toBe(false);
	//	expect(exec('gulp src', {silent:true}).code).toBe(0);
	//	expect(test('-f', 'dist/all.js')).toBe(true);
	//});
});