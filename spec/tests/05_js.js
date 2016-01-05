/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs'),
		args  = process.argv.slice(2).join(' ');

require('shelljs/global');

var testFolder          = 'spec/fixture/05_js',
		rootFwk             = '../../../..',
		configJson          = 'config.json',
		compileLoaderJsName = '-compiledLoader.js';

describe("05_js: JS mechanics", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});

	it('(01) should create compile loader', function(){
		cd('01');

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
		var temp            = utils.readJsonFile(configJson).cfg.app.folders.temp,
				compileLoaderJs = utils.readJsonFile(configJson).cfg.app.folders.build + temp + compileLoaderJsName;

		rm('-rf', compileLoaderJs);
		expect(test('-e', compileLoaderJs)).toBe(false);

		expect(exec('gulp _buildJs --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', compileLoaderJs)).toBe(true);

		//mac: 107629, windows: 109083, whatt?
		expect(fs.statSync(compileLoaderJs).size).toBeMoreLess(108000, 5000);
	});

	it('(02) should create compile loader - minificated', function(){
		cd('02');

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
		var temp            = utils.readJsonFile(configJson).cfg.app.folders.temp,
				compileLoaderJs = utils.readJsonFile(configJson).cfg.app.folders.build + temp + compileLoaderJsName;

		rm('-rf', compileLoaderJs);
		expect(test('-e', compileLoaderJs)).toBe(false);

		expect(exec('gulp _buildJs --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', compileLoaderJs)).toBe(true);

		expect(fs.statSync(compileLoaderJs).size).toBeMoreLess(50110,1000);
	});

	it('(03) should jshint validate the code', function(){
		cd('03');

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
		var temp            = utils.readJsonFile(configJson).cfg.app.folders.temp,
				compileLoaderJs = utils.readJsonFile(configJson).cfg.app.folders.build + temp + compileLoaderJsName;

		rm('-rf', compileLoaderJs);
		expect(test('-e', compileLoaderJs)).toBe(false);

		expect(exec('gulp _buildJs --testMode --forceError ' + args, {silent: 1}).code).toBe(1);

		expect(test('-e', compileLoaderJs)).toBe(false);
	});

});