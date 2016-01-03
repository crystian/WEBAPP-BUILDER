/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs    = require('fs-extra');

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

xdescribe("06_html: Index template to index - ", function(){

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

		expect(fs.statSync(indexFileCompiled).size).toBeMoreLess(66819,1000);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('.testLoader');
		expect(indexFileCompiledContent).toContain('_loaderCfg');
		expect(indexFileCompiledContent).not.toContain('<!--comment for test, do not remove it-->');
		expect(indexFileCompiledContent.indexOf('<!--')).toBe(0);//header
		expect(indexFileCompiledContent).toContain('isDist:!0');
		expect(indexFileCompiledContent).not.toContain('if(true){return;}');
	});

	it('(06) should non-minificate index.html', function(){
		cd('06');
		var wwwIndex = 'www/index.html';

		rm('-rf', indexFile);
		rm('-rf', wwwIndex);
		expect(test('-e', indexFile)).toBe(false);
		expect(test('-e', wwwIndex)).toBe(false);

		expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', wwwIndex)).toBe(true);

		expect(fs.statSync(wwwIndex).size).toBeMoreLess(156660,10000);

		var indexFileCompiledContent = cat(wwwIndex);

		expect(indexFileCompiledContent).toContain('.testLoader');
		expect(indexFileCompiledContent).toContain('_loaderCfg');
		expect(indexFileCompiledContent).toContain('<!--comment for test, do not remove it-->');
		expect(indexFileCompiledContent.indexOf('<!--')).toBe(0);//header
		expect(indexFileCompiledContent).toContain('"isDist": false');
		expect(indexFileCompiledContent).toContain('if(true){return;}');
	});

	it('(03) should minificate index.html', function(){
		cd('03');

		rm('-rf', indexFile);
		expect(test('-e', indexFile)).toBe(false);

		expect(exec('gulp buildLoaderDist --testMode ' + args, {silent: 1}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.app.folders.build,
				indexFileCompiled = build + index;

		expect(test('-e', indexFileCompiled)).toBe(true);

		expect(fs.statSync(indexFileCompiled).size).toBeMoreLess(66819, 1000);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('.testLoader');
		expect(indexFileCompiledContent).toContain('_loaderCfg');
		expect(indexFileCompiledContent).not.toContain('<!--comment for test, do not remove it-->');
		expect(indexFileCompiledContent.indexOf('<!--')).toBe(0);//header
		expect(indexFileCompiledContent).toContain('isDist:!0');
		expect(indexFileCompiledContent).not.toContain('if(true){return;}');
	});

	it('(04) should minificate index-cordova.html', function(){
		cd('04');

		rm('-rf', indexFileCordova);
		expect(test('-e', indexFileCordova)).toBe(false);

		expect(exec('gulp buildLoaderDist --testMode ' + args, {silent: 1}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.app.folders.build,
				indexFileCompiled = build + indexCordova;

		expect(test('-e', indexFileCompiled)).toBe(true);

		expect(fs.statSync(indexFileCompiled).size).toBeMoreLess(66818,1000);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('cordova:{isDevice:1');
	});

	it('(05) should non-minificate index-cordova.html', function(){
		cd('05');

		rm('-rf', indexFileCordova);
		expect(test('-e', indexFileCordova)).toBe(false);

		expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);

		var build             = utils.readJsonFile(configJson).cfg.app.folders.build,
				indexFileCompiled = build + indexCordova;

		expect(test('-e', indexFileCompiled)).toBe(true);

		expect(fs.statSync(indexFileCompiled).size).toBeMoreLess(156660,10000);

		var indexFileCompiledContent = cat(indexFileCompiled);

		expect(indexFileCompiledContent).toContain('"isDevice": true');
	});


});