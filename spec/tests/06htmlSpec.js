/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join();
require('shelljs/global');

var testFolder = 'spec/fixture/06html',
		rootFwk    = '../../../..',
		pathLoader = '/loader',
		index      = '/index.html',
		indexCordova      = '/index-cordova.html',
		configJson = 'config.json',
		indexFile  = rootFwk + pathLoader + index,
		indexFileCordova  = rootFwk + pathLoader + indexCordova;

describe("Index template to index - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});


	it('(01) should create index.html', function(){
		cd('01');

		rm('-rf', indexFile);
		expect(test('-e', indexFile)).toBe(false);

		expect(exec('gulp makeHtmlFinal --testMode ' + args, {silent: true}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.loader.folders.build,
				indexFileCompiled = rootFwk + '/' + build + index;

		expect(test('-e', indexFileCompiled)).toBe(true);
	});

	it('(02) should minificate index.html', function(){
		cd('02');

		rm('-rf', indexFile);
		expect(test('-e', indexFile)).toBe(false);

		expect(exec('gulp makeHtmlFinal --testMode ' + args, {silent: true}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.loader.folders.build,
				indexFileCompiled = rootFwk + '/' + build + index;

		expect(test('-e', indexFileCompiled)).toBe(true);

		var file = fs.statSync(indexFileCompiled);
		expect(file.size).toBeLessThan(66000);
		expect(file.size).toBeGreaterThan(65000);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('.testLoader');
		expect(indexFileCompiledContent).toContain('_loaderCfg');
		expect(indexFileCompiledContent).not.toContain('<!--comment for test, don\'t remove it-->');
		expect(indexFileCompiledContent.indexOf('<!--')).toBe(0);//header
		expect(indexFileCompiledContent).toContain('oneRequest:1');
		expect(indexFileCompiledContent).not.toContain('if(true){return;}');
	});

	it('(03) should non-minificate index.html', function(){
		cd('03');

		rm('-rf', indexFile);
		expect(test('-e', indexFile)).toBe(false);

		expect(exec('gulp makeHtmlFinal --testMode ' + args, {silent: true}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.loader.folders.build,
				indexFileCompiled = rootFwk + '/' + build + index;

		expect(test('-e', indexFileCompiled)).toBe(true);

		var file = fs.statSync(indexFileCompiled);
		expect(file.size).toBeLessThan(156000);
		expect(file.size).toBeGreaterThan(155000);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('.testLoader');
		expect(indexFileCompiledContent).toContain('_loaderCfg');
		expect(indexFileCompiledContent).toContain('<!--comment for test, don\'t remove it-->');
		expect(indexFileCompiledContent.indexOf('<!--')).toBe(0);//header
		expect(indexFileCompiledContent).toContain('"oneRequest": true');
		expect(indexFileCompiledContent).toContain('if(true){return;}');
	});

	it('(04) should minificate index-cordova.html', function(){
		cd('04');

		rm('-rf', indexFileCordova);
		expect(test('-e', indexFileCordova)).toBe(false);

		expect(exec('gulp makeHtmlFinal --testMode ' + args, {silent: true}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.loader.folders.build,
				indexFileCompiled = rootFwk + '/' + build + indexCordova;

		expect(test('-e', indexFileCompiled)).toBe(true);

		var file = fs.statSync(indexFileCompiled);
		expect(file.size).toBeLessThan(66000);
		expect(file.size).toBeGreaterThan(65000);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('isCordovaDevice:1');
	});

	it('(05) should non-minificate index-cordova.html', function(){
		cd('05');

		rm('-rf', indexFileCordova);
		expect(test('-e', indexFileCordova)).toBe(false);

		expect(exec('gulp makeHtmlFinal --testMode ' + args, {silent: true}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.loader.folders.build,
				indexFileCompiled = rootFwk + '/' + build + indexCordova;

		expect(test('-e', indexFileCompiled)).toBe(true);

		var file = fs.statSync(indexFileCompiled);
		expect(file.size).toBeLessThan(156000);
		expect(file.size).toBeGreaterThan(155000);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('"isCordovaDevice": true');
	});


});