/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/framework/utils'),
		fs = require('fs');

require('shelljs/global');

var testFolder = 'spec/fixture/04css',
		rootFwk = '../../../..',
		pathLoader = '/loader',
		cssLoader = '/css/loader.css',
		cssLoading = '/loading/1/loading.css'
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


	it('(01) should create css files', function(){
		cd('01');

		rm('-rf', rootFwk + pathLoader + cssLoader);
		rm('-rf', rootFwk + pathLoader + cssLoading);
		expect(test('-e', rootFwk + pathLoader + cssLoader)).toBe(false);
		expect(test('-e', rootFwk + pathLoader + cssLoading)).toBe(false);

		expect(exec('gulp makeCss --testMode', {silent:false}).code).toBe(0);

		//expect(test('-e', rootFwk + pathLoader + index)).toBe(true);
		//
		//var indexFile = cat(rootFwk + pathLoader + index);
		//expect(indexFile.indexOf('<!--comment for test, don\'t remove it-->')).not.toBe(-1);
	});



});