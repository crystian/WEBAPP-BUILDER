/**
 * Created by Crystian on 02/12/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder  = 'spec/fixture/11loader',
		rootFwk     = '../../../..',
		buildFolder = 'build',
		wwwIndex    = 'www/index.html',
		index       = buildFolder + '/index.html';

fdescribe('check basic commands for build', function(){

	describe('from project', function(){

		beforeEach(function(){
			cd(testFolder);
		});
		afterEach(function(){
			cd(rootFwk);
		});

		it('should create build folder and index.html', function(){
			cd('01');

			rm('-rf', buildFolder);
			rm('-rf', wwwIndex);
			expect(test('-e', buildFolder)).toBe(false);
			expect(test('-e', wwwIndex)).toBe(false);

			expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', buildFolder)).toBe(true);
			expect(test('-e', wwwIndex)).toBe(true);

			var ind = cat(wwwIndex);
			expect(ind.indexOf('"oneRequest": false')).toBeGreaterThan(0);
		});

		it('should fail because it is project', function(){
			cd('01');

			expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);
			expect(exec('gulp serveLoader --testMode ' + args, {silent: 1}).code).toBe(1);

		});

	});

	describe('from root', function(){

		it('should create index and has oneRequest:1', function(){
			rm('-rf', buildFolder);
			expect(test('-e', buildFolder)).toBe(false);

			expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);
			rm('-rf', 'config.json');

			expect(test('-e', buildFolder)).toBe(true);

			var ind = cat(index);
			expect(ind.indexOf('oneRequest:1')).toBeGreaterThan(0);
		});

		it('should fail because it is from root', function(){
			rm('-rf', buildFolder);
			expect(test('-e', buildFolder)).toBe(false);

			expect(exec('gulp buildProject --testMode ' + args, {silent: 1}).code).toBe(1);
		});

		it('should fail because it is root', function(){
			expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);
			expect(exec('gulp serveLoader --testMode ' + args, {silent: 1}).code).toBe(1);

			rm('-rf', buildFolder);
			rm('-rf', 'config.json');
		});

		it('should fail because it is not project', function(){

			expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);
			expect(exec('gulp serveProject --testMode ' + args, {silent: 1}).code).toBe(1);

		});
	});

	describe("from template", function(){

		it('buildLoader', function(){

			rm('-rf', buildFolder);
			expect(test('-e', buildFolder)).toBe(false);

			cd('templates/test');

			expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);

			expect(test('-e', buildFolder)).toBe(false);

			cd('../../');

			expect(test('-e', buildFolder)).toBe(true);

			var ind = cat(index);
			expect(ind.indexOf('oneRequest:1')).toBeGreaterThan(0);
		});

		it('should fail because it is template', function(){

			cd('templates/test');

			expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);
			expect(exec('gulp serveProject --testMode ' + args, {silent: 1}).code).toBe(1);

			cd('../../');
		});

	});

});