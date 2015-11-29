/**
 * Created by Crystian on 01/11/2015.
 */
var cheerio = require('cheerio');
var args = process.argv.slice(2).join(' ');
require('shelljs/global');

var testFolder = 'spec/fixture/04Lbase',
		rootFwk = '../../../..',
		pathLoader = '/loader',
		index = '/index.html';

describe("Index template to index - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});


	it('(01) should create a copy', function(){
		cd('01');
		var indexFile = rootFwk + pathLoader + index;

		rm('-rf', indexFile);
		expect(test('-e', indexFile)).toBe(false);

		expect(exec('gulp _makeIndex --testMode '+ args, {silent:1}).code).toBe(0);

		expect(test('-e', indexFile)).toBe(true);
	});

	it('(01) should modificate metadata', function(){
		cd('01');

		expect(exec('gulp _makeIndex --testMode '+ args, {silent:1}).code).toBe(0);

		var indexContent = cat(rootFwk +'/'+ pathLoader +'/'+ index);
		$ = cheerio.load(indexContent);

		expect($('#viewport').attr('content')).toBe('Test1');
		expect($('#contentSecurity').attr('content')).toBe('Test2');
		expect($('#pageTitle').html()).toBe('Test3');
		expect($('#pageDescription').attr('content')).toBe('Test4');
		expect($('#pageKeyword').attr('content')).toBe('Test5');
		expect($('#pageAuthor').attr('content')).toBe('Test6');
		expect($('#noscript').html()).toBe('Test7');
	});

	it('(02) should replace quote on contentSecurity', function(){
		cd('02');

		expect(exec('gulp _makeIndex --testMode '+ args, {silent:1}).code).toBe(0);

		var indexContent = cat(rootFwk +'/'+ pathLoader +'/'+ index);
		$ = cheerio.load(indexContent);

		expect($('#contentSecurity').attr('content')).toBe('Test2 apos: \'');
	});

	it('(03) should inject content (prod)', function(){
		cd('03');

		expect(exec('gulp _makeBase --testMode '+ args, {silent:1}).code).toBe(0);

		var indexContent = cat(rootFwk +'/'+ pathLoader +'/'+ index);
		$ = cheerio.load(indexContent);

		expect($('.spinner').length).toBe(1);
		expect($('link').length).toBe(4);
		expect($('script').length).toBe(22);
		expect(indexContent).toContain('platform.min.js');
	});

	it('(04) should inject content (dev)', function(){
		cd('04');

		expect(exec('gulp _makeBase --testMode '+ args, {silent:1}).code).toBe(0);

		var indexContent = cat(rootFwk +'/'+ pathLoader +'/'+ index);
		$ = cheerio.load(indexContent);

		expect($('.spinner').length).toBe(1);
		expect($('link').length).toBe(4);
		expect($('script').length).toBe(23);
		expect(indexContent).toContain('platform.js');
	});

});