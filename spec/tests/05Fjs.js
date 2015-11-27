/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs'),
		args  = process.argv.slice(2).join(' ');

require('shelljs/global');

var testFolder          = 'spec/fixture/05Fjs',
		rootFwk             = '../../../..',
		configJson          = 'config.json',
		compileLoaderJsName = '-compiledloader.js';

describe("JS mechanics - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});

	it('(01) should create compile loader', function(){
		cd('01');

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
		var temp            = utils.readJsonFile(configJson).cfg.loader.folders.temp,
				compileLoaderJs = rootFwk + '/' + temp + '/' + compileLoaderJsName;

		rm('-rf', compileLoaderJs);
		expect(test('-e', compileLoaderJs)).toBe(false);

		expect(exec('gulp _buildJs --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', compileLoaderJs)).toBe(true);

		var file = fs.statSync(compileLoaderJs);
		expect(file.size).toBeGreaterThan(105000);
	});

	it('(02) should create compile loader - minificated', function(){
		cd('02');

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
		var temp            = utils.readJsonFile(configJson).cfg.loader.folders.temp,
				compileLoaderJs = rootFwk + '/' + temp + '/' + compileLoaderJsName;

		rm('-rf', compileLoaderJs);
		expect(test('-e', compileLoaderJs)).toBe(false);

		expect(exec('gulp _buildJs --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', compileLoaderJs)).toBe(true);

		var file = fs.statSync(compileLoaderJs);
		expect(file.size).toBeLessThan(50000);
	});

	it('(03) should jshint validate the code', function(){
		cd('03');

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
		var temp            = utils.readJsonFile(configJson).cfg.loader.folders.temp,
				compileLoaderJs = rootFwk + '/' + temp + '/' + compileLoaderJsName;

		rm('-rf', compileLoaderJs);
		expect(test('-e', compileLoaderJs)).toBe(false);

		expect(exec('gulp _buildJs --testMode --forceError ' + args, {silent: 1}).code).toBe(1);

		expect(test('-e', compileLoaderJs)).toBe(false);
	});

});