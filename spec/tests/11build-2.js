/**
 * Created by Crystian on 02/12/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder  = 'spec/fixture/11build',
		rootFwk     = '../../../..',
		buildFolder = 'build/',
		wwwIndex    = 'www/index.html',
		index       = buildFolder + 'index.html',
		cssFile       = 'www/app2/app2.css',
		wwwJson       = 'www/app2/www.json';

describe('app.json generation', function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});

	it('should create several files on www files with debug', function(){
		cd('02');

		rm('-rf', buildFolder);
		rm('-rf', wwwIndex);
		rm('-rf', cssFile);
		rm('-rf', wwwJson);

		expect(test('-e', buildFolder)).toBe(false);
		expect(test('-e', wwwIndex)).toBe(false);
		expect(test('-e', cssFile)).toBe(false);
		expect(test('-e', wwwJson)).toBe(false);

		expect(exec('gulp buildFull --testMode --debug', {silent: 1}).code).toBe(0);

		//into the www
		expect(test('-e', cssFile)).toBe(true);
		expect(test('-e', wwwJson)).toBe(true);
		expect(test('-e', wwwIndex)).toBe(true);

		expect(cat(wwwIndex)).toContain('"oneRequest": false');

		//into the build
		expect(test('-e', buildFolder)).toBe(true);
		expect(test('-e', index)).toBe(true);
		expect(test('-e', buildFolder +'temp')).toBe(true);
		expect(test('-e', buildFolder +'temp/-compiledLoader.css')).toBe(true);
		expect(test('-e', buildFolder +'temp/-compiledLoader.js')).toBe(true);
		expect(test('-e', buildFolder +'temp/app2.css')).toBe(false);
		expect(test('-e', buildFolder +'temp/app2.js')).toBe(false);
		expect(test('-e', buildFolder +'temp/app2.html')).toBe(false);

		expect(cat(index)).toContain('"oneRequest": false');
	});

	it('should create several files on www files WITHOUT debug', function(){
		cd('02');

		rm('-rf', buildFolder);
		rm('-rf', wwwIndex);
		rm('-rf', cssFile);
		rm('-rf', wwwJson);

		expect(test('-e', buildFolder)).toBe(false);
		expect(test('-e', wwwIndex)).toBe(false);
		expect(test('-e', cssFile)).toBe(false);
		expect(test('-e', wwwJson)).toBe(false);

		expect(exec('gulp buildFull --testMode', {silent: 1}).code).toBe(0);

		//into the www
		expect(test('-e', cssFile)).toBe(true);
		expect(test('-e', wwwJson)).toBe(true);
		expect(test('-e', wwwIndex)).toBe(true);

		expect(cat(wwwIndex)).toContain('"oneRequest": false');

		//into the build
		expect(test('-e', buildFolder)).toBe(true);
		expect(test('-e', index)).toBe(true);
		expect(test('-e', buildFolder +'temp')).toBe(false);

		expect(cat(index)).toContain('"oneRequest": false');
	});

	it('should create several files on BUILD files with debug', function(){
		cd('02');

		rm('-rf', buildFolder);
		rm('-rf', wwwIndex);
		rm('-rf', cssFile);
		rm('-rf', wwwJson);

		expect(test('-e', buildFolder)).toBe(false);
		expect(test('-e', wwwIndex)).toBe(false);
		expect(test('-e', cssFile)).toBe(false);
		expect(test('-e', wwwJson)).toBe(false);

		expect(exec('gulp buildFullDist --testMode --debug', {silent: 1}).code).toBe(0);

		//into the www
		expect(test('-e', cssFile)).toBe(true);
		expect(test('-e', wwwJson)).toBe(true);
		expect(test('-e', wwwIndex)).toBe(false);

		//into the build
		expect(test('-e', buildFolder)).toBe(true);
		expect(test('-e', index)).toBe(true);
		expect(test('-e', buildFolder +'app.json')).toBe(true);
		expect(test('-e', buildFolder +'app2.json')).toBe(true);
		expect(test('-e', buildFolder +'temp')).toBe(true);
		expect(test('-e', buildFolder +'temp/-compiledLoader.css')).toBe(true);
		expect(test('-e', buildFolder +'temp/-compiledLoader.js')).toBe(true);
		expect(test('-e', buildFolder +'temp/app.css')).toBe(true);
		expect(test('-e', buildFolder +'temp/app.js')).toBe(true);
		expect(test('-e', buildFolder +'temp/app.html')).toBe(true);
		expect(test('-e', buildFolder +'temp/app2.css')).toBe(true);
		expect(test('-e', buildFolder +'temp/app2.js')).toBe(true);
		expect(test('-e', buildFolder +'temp/app2.html')).toBe(true);

		expect(cat(index)).toContain('oneRequest:1');
	});

	it('should create several files on BUILD files WITHOUT debug', function(){
		cd('02');

		rm('-rf', buildFolder);
		rm('-rf', wwwIndex);
		rm('-rf', cssFile);
		rm('-rf', wwwJson);

		expect(test('-e', buildFolder)).toBe(false);
		expect(test('-e', wwwIndex)).toBe(false);
		expect(test('-e', cssFile)).toBe(false);
		expect(test('-e', wwwJson)).toBe(false);

		expect(exec('gulp buildFullDist --testMode', {silent: 1}).code).toBe(0);

		//into the www
		expect(test('-e', cssFile)).toBe(true);
		expect(test('-e', wwwJson)).toBe(true);
		expect(test('-e', wwwIndex)).toBe(false);

		//into the build
		expect(test('-e', buildFolder)).toBe(true);
		expect(test('-e', index)).toBe(true);
		expect(test('-e', buildFolder +'app.json')).toBe(true);
		expect(test('-e', buildFolder +'app2.json')).toBe(true);
		expect(test('-e', buildFolder +'temp')).toBe(false);

		expect(cat(index)).toContain('oneRequest:1');
	});

	it('should create several files on BUILD files WITHOUT debug', function(){
		cd('02');

		rm('-rf', buildFolder);
		expect(test('-e', buildFolder)).toBe(false);

		expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', buildFolder)).toBe(true);
		expect(test('-e', index)).toBe(true);
		expect(test('-e', buildFolder +'app.json')).toBe(true);
		expect(test('-e', buildFolder +'app2.json')).toBe(true);

		expect(cat(index)).toContain('oneRequest:1');

		expect(fs.statSync(buildFolder +'app.json').size).toBeMoreLess(813,10);
	});


});