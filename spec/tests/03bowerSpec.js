/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/framework/utils');
require('shelljs/global');

var testFolder = 'spec/fixture/03bower',
		rootFwk = '../../../..',
		bowerJson = '/bower.json',
		configJson = 'config.json'
		//pkgJsonContent = '{"name": "test 04","private": true,"dependencies": {}}',
		//configjsLocal = 'project-config-local.json',
		//configjs = '/loader/config.js';
;
describe("Bower dependencies and more - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});

	//BOOT
	it('(01) should stop because with compres lz-string is needed', function(){
		cd('01');
		expect(exec('gulp generatorBower --testMode', {silent:true}).code).toBe(1);
	});

	it('(02) should be platform == null', function(){
		cd('02');
		rm('-rf', rootFwk + bowerJson);
		expect(test('-e', rootFwk + bowerJson)).toBe(false);

		expect(exec('gulp generatorBower --testMode', {silent:true}).code).toBe(0);

		expect(test('-e', rootFwk + bowerJson)).toBe(true);
		var bowerFile = utils.readJsonFile(rootFwk + bowerJson);
		expect(bowerFile.dependencies.platform).toBeUndefined();
	});

	it('(03) should be platform with other version', function(){
		cd('03');
		rm('-rf', rootFwk + bowerJson);

		expect(exec('gulp generatorBower --testMode', {silent:true}).code).toBe(0);

		var bowerFile = utils.readJsonFile(rootFwk + bowerJson);
		expect(bowerFile.dependencies.platform).toBe('1.0.0');
	});

	it('(04) should be add other component', function(){
		cd('04');
		rm('-rf', rootFwk + bowerJson);

		expect(exec('gulp generatorBower --testMode', {silent:true}).code).toBe(0);

		var bowerFile = utils.readJsonFile(rootFwk + bowerJson);
		expect(bowerFile.dependencies.other).toBe('1.0.0');
	});

	fit('(05) should download resources with bower', function(){
		cd('05');

		rm('-rf', configJson);
		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);
		var bowerFolder = utils.readJsonFile(configJson).cfg.loader.folders.bower;

		expect(exec('gulp makeBower --testMode', {silent:false}).code).toBe(0);

		//rm('-rf', rootFwk +'/'+ bowerFolder);
		expect(test('-e', rootFwk +'/'+ bowerFolder)).toBe(true);
		//pkgJsonContent.to(pkgJson);
		//expect(test('-e', pkgJson)).toBe(true);
		//
		//
		//var bowerFile = utils.readFile(rootFwk + bowerJson);
		//expect(bowerFile.dependencies.other).toBe('1.0.0');
	});


});