/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/framework/utils'),
		fs = require('fs');

require('shelljs/global');

var testFolder = 'spec/fixture/04base',
		rootFwk = '../../../..',
		pathLoader = '/loader',
		index = '/index.html'
		//bowerJson = '/bower.json',
		//configJson = 'config.json'
		//configjsLocal = 'project-config-local.json',
		//configjs = '/loader/config.js';
;
fdescribe("Base (index) - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});

	//BOOT
	it('(01) should inject snippets on index.html', function(){
		cd('01');

		rm('-rf', rootFwk + pathLoader + index);
		expect(test('-e', rootFwk + pathLoader + index)).toBe(false);

		expect(exec('gulp makeBase --testMode', {silent:false}).code).toBe(0);

		expect(test('-e', rootFwk + pathLoader + index)).toBe(true);

		var indexFile = cat(rootFwk + pathLoader + index);
		expect(indexFile.indexOf('<!--comment for test, don\'t remove it-->')).not.toBe(-1);
	});

});