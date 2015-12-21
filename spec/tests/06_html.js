/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs');

var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder       = 'spec/fixture/06_html',
		rootFwk          = '../../../..',
		pathLoader       = '/loader',
		index            = '/index.html',
		indexCordova     = '/index-cordova.html',
		configJson       = 'config.json',
		indexFile        = rootFwk + pathLoader + index,
		indexFileCordova = rootFwk + pathLoader + indexCordova;

xdescribe("Index template to index - ", function(){

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

		expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);
		var build             = utils.readJsonFile(configJson).cfg.app.folders.build,
				indexFileCompiled = build + index;

		expect(test('-e', indexFileCompiled)).toBe(true);
	});

	it('(02) should minificate index.html DIST', function(){
		cd('02');

		rm('-rf', indexFile);
		expect(test('-e', indexFile)).toBe(false);

		expect(exec('gulp buildLoaderDist --testMode ' + args, {silent: 1}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.app.folders.build,
				indexFileCompiled = build + index;

		expect(test('-e', indexFileCompiled)).toBe(true);

		expect(fs.statSync(indexFileCompiled).size).toBeMoreLess(67040,50);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('.testLoader');
		expect(indexFileCompiledContent).toContain('_loaderCfg');
		expect(indexFileCompiledContent).not.toContain('<!--comment for test, do not remove it-->');
		expect(indexFileCompiledContent.indexOf('<!--')).toBe(0);//header
		expect(indexFileCompiledContent).toContain('oneRequest:1');
		expect(indexFileCompiledContent).not.toContain('if(true){return;}');
	});

	it('(02) should minificate index.html', function(){
		cd('02');
		var wwwIndex = 'www/index.html';

		rm('-rf', indexFile);
		rm('-rf', wwwIndex);
		expect(test('-e', indexFile)).toBe(false);
		expect(test('-e', wwwIndex)).toBe(false);

		expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', wwwIndex)).toBe(true);

		expect(fs.statSync(wwwIndex).size).toBeMoreLess(156821,50);

		var indexFileCompiledContent = cat(wwwIndex);

		expect(indexFileCompiledContent).toContain('.testLoader');
		expect(indexFileCompiledContent).toContain('_loaderCfg');
		expect(indexFileCompiledContent).toContain('<!--comment for test, do not remove it-->');
		expect(indexFileCompiledContent.indexOf('<!--')).toBe(0);//header
		expect(indexFileCompiledContent).toContain('"oneRequest": false');
		expect(indexFileCompiledContent).toContain('if(true){return;}');
	});

	xit('(03) should non-minificate index.html', function(){
		cd('03');

		rm('-rf', indexFile);
		expect(test('-e', indexFile)).toBe(false);

		expect(exec('gulp buildLoaderDist --testMode ' + args, {silent: 0}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.app.folders.build,
				indexFileCompiled = build + index;

		expect(test('-e', indexFileCompiled)).toBe(true);

		expect(fs.statSync(indexFileCompiled).size).toBeMoreLess(156820, 100);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('.testLoader');
		expect(indexFileCompiledContent).toContain('_loaderCfg');
		expect(indexFileCompiledContent).toContain('<!--comment for test, do not remove it-->');
		expect(indexFileCompiledContent.indexOf('<!--')).toBe(0);//header
		//expect(indexFileCompiledContent).toContain('"oneRequest": true');
		expect(indexFileCompiledContent).toContain('if(true){return;}');
	});

	it('(04) should minificate index-cordova.html', function(){
		cd('04');

		rm('-rf', indexFileCordova);
		expect(test('-e', indexFileCordova)).toBe(false);

		expect(exec('gulp buildLoaderDist --testMode ' + args, {silent: 1}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.app.folders.build,
				indexFileCompiled = build + indexCordova;

		expect(test('-e', indexFileCompiled)).toBe(true);

		expect(fs.statSync(indexFileCompiled).size).toBeMoreLess(67040,50);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('isCordovaDevice:1');
	});

	it('(05) should non-minificate index-cordova.html', function(){
		cd('05');

		rm('-rf', indexFileCordova);
		expect(test('-e', indexFileCordova)).toBe(false);

		expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.app.folders.build,
				indexFileCompiled = build + indexCordova;

		expect(test('-e', indexFileCompiled)).toBe(true);

		expect(fs.statSync(indexFileCompiled).size).toBeMoreLess(156819,50);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('"isCordovaDevice": true');
	});


});