/**
 * Created by Crystian on 01/11/2015.
 */

require('shelljs/global');

describe("test the build", function()
{
	it('anda', function(){
		expect(1).toBe(1);
	});
	//it("npm install", function()
	//{
	//	rm('-rf', 'node_modules');
	//	expect(test('-d', 'node_modules')).toBe(false);
	//	expect(exec('npm install', {silent:true}).code).toBe(0);
	//	expect(test('-d', 'node_modules')).toBe(true);
	//});

	//it("gulp sass", function()
	//{
	//	rm('-rf', 'dist');
	//	expect(test('-d', 'dist')).toBe(false);
	//	expect(exec('gulp sass', {silent:true}).code).toBe(0);
	//	expect(test('-f', 'dist/main.css')).toBe(true);
	//});

	//it("gulp src", function()
	//{
	//	rm('-rf', 'dist');
	//	expect(test('-d', 'dist')).toBe(false);
	//	expect(exec('gulp src', {silent:true}).code).toBe(0);
	//	expect(test('-f', 'dist/all.js')).toBe(true);
	//});
});