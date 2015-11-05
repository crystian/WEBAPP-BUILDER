/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/framework/utils');
require('shelljs/global');

var testFolder = 'spec/fixture/01boot',
		rootFwk = '../../../..',
		pkgJson = 'package.json',
		pkgJsonContent = '{"name": "test 04","private": true,"dependencies": {}}',
		configjsLocal = 'project-config-local.json',
		configjs = '/loader/config.js',
		configJson = 'config.json';

describe("Full test for the build system of framework (fuaaa) - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});

	//BOOT
	it('(01) should send the gulp', function(){
		cd('01');
		expect(exec('gulp nothing', {silent:true}).code).toBe(1);
	});

	it("(02) should fill gitVersion field", function(){
		cd('02');

		rm('-rf', pkgJson);
		expect(test('-e', pkgJson)).toBe(false);
		pkgJsonContent.to(pkgJson);
		expect(test('-e', pkgJson)).toBe(true);

		expect(exec('gulp nothing', {silent:true}).code).toBe(0);

		var pkg = utils.readJsonFile(pkgJson);
		expect(pkg.gitVersion).toBeDefined();
	});

	it("(04) should fail with incompatible parameters (compress-lz-string)", function(){
		cd('04');
		expect(exec('gulp nothing', {silent:true}).code).toBe(1);
	});


	//CONFIG
	it("(05) should be create the config.js file on loader folder", function(){
		cd('05');
		rm('-rf', rootFwk + configjs);
		expect(test('-e', rootFwk + configjs)).toBe(false);

		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);

		expect(test('-e', rootFwk + configjs)).toBe(true);
	});

	it("(05) should create json config to test it", function(){
		cd('05');
		rm('-rf', configJson);
		expect(test('-e', configJson)).toBe(false);

		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);

		expect(test('-e', configJson)).toBe(true);
	});

	it("(05) should has the attribute name from FWK config", function(){
		cd('05');
		expect(test('-e', rootFwk + configjs)).toBe(true);

		var hasLocal = test('-e', rootFwk +'/'+ configjsLocal);

		if(hasLocal){
			mv(rootFwk +'/'+ configjsLocal, rootFwk + '/'+ configjsLocal +'.removed');
		}

		rm('-rf', configJson);

		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);

		expect(utils.readJsonFile(configJson).name).toBe('app name');

		if(hasLocal){
			mv(rootFwk + '/'+ configjsLocal +'.removed', rootFwk +'/'+ configjsLocal);
		}
	});

	it("(05) should has the attribute name from FWK config LOCAL", function(){
		cd('05');
		expect(test('-e', rootFwk + configjs)).toBe(true);

		var hasLocal = test('-e', rootFwk +'/'+ configjsLocal);

		if(!hasLocal){
			utils.saveFile(rootFwk +'/'+ configjsLocal, {'name': 'from fwk local'});
		}

		rm('-rf', configJson);

		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);

		expect(utils.readJsonFile(configJson).name).toBe('from fwk local');

		if(!hasLocal){
			rm(rootFwk +'/'+ configjsLocal);
		}
	});


	it("(06) should has the attribute name from APP config", function(){
		cd('06');
		rm('-rf', configJson);

		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);

		expect(utils.readJsonFile(configJson).name).toBe('test 06 config');
	});

	it("(07) should has the attribute name from APP config LOCAL", function(){
		cd('07');
		expect(test('-e', configjsLocal)).toBe(true);
		rm('-rf', configJson);

		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);

		expect(utils.readJsonFile(configJson).name).toBe('test 07 config local');
	});
});