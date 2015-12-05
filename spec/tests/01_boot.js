/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils');
var args = process.argv.slice(2).join(' ');
require('shelljs/global');


var testFolder     = 'spec/fixture/01_boot',
		rootFwk        = '../../../../',
		pkgJson        = 'package.json',
		pkgJsonContent = '{"name": "test 01-02","private": true,"dependencies": {}}',
		configjsLocal  = 'project-config-local.json',
		configjs       = 'loader/config.js',
		configJson     = 'config.json';

xdescribe("Boot test for the build system of framework (fuaaa) - ", function(){

	beforeEach(function(){
		cd(testFolder);
	});
	afterEach(function(){
		cd(rootFwk);
	});

	//BOOT
	it('(01) should send the gulp', function(){
		cd('01');
		expect(exec('gulp nothing ' + args, {silent: 1}).code).toBe(1);
	});

	it("(02) should fill gitVersion field", function(){
		cd('02');

		rm('-rf', pkgJson);
		expect(test('-e', pkgJson)).toBe(false);
		pkgJsonContent.to(pkgJson);
		expect(test('-e', pkgJson)).toBe(true);

		expect(exec('gulp nothing ' + args, {silent: 1}).code).toBe(0);

		var pkg = utils.readJsonFile(pkgJson);
		expect(pkg.gitVersion).toBeDefined();
	});

	it("(04) should fail with incompatible parameters (compress-lz-string)", function(){
		cd('04');
		expect(exec('gulp nothing ' + args, {silent: 1}).code).toBe(1);
	});


	//CONFIG
	it("(05) should be create the config.js file on loader folder", function(){
		cd('05');
		var pathConfig = rootFwk + configjs;
		rm('-rf', pathConfig);
		expect(test('-e', pathConfig)).toBe(false);

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', pathConfig)).toBe(true);
	});

	it("(05) should create json config to test it", function(){
		cd('05');
		rm('-rf', configJson);
		expect(test('-e', configJson)).toBe(false);

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(test('-e', configJson)).toBe(true);
	});

	it("(05) should has the attribute name from FWK config", function(){
		cd('05');
		expect(test('-e', rootFwk + configjs)).toBe(true);

		var pathConfigLocal = rootFwk + configjsLocal;
		var hasLocal = test('-e', pathConfigLocal);

		if(hasLocal){
			mv(pathConfigLocal, pathConfigLocal + '.removed');
		}

		rm('-rf', configJson);

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(configJson).name).toBe('app name');

		if(hasLocal){
			mv(pathConfigLocal + '.removed', pathConfigLocal);
		}
	});

	it("(05) should has the attribute name from FWK config LOCAL", function(){
		cd('05');
		expect(test('-e', rootFwk + configjs)).toBe(true);

		var pathConfigLocal = rootFwk + configjsLocal;
		var hasLocal = test('-e', pathConfigLocal);

		if(!hasLocal){
			utils.saveFile(pathConfigLocal, {app: {'name': 'from fwk local'}});
		}

		rm('-rf', configJson);

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(configJson).name).toBe('from fwk local');

		if(!hasLocal){
			rm(pathConfigLocal);
		}
	});

	it("(06) should has the attribute name from APP config", function(){
		cd('06');
		rm('-rf', configJson);

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(configJson).name).toBe('test 01-06 config');
	});

	it("(07) should has the attribute name from APP config LOCAL", function(){
		cd('07');
		expect(test('-e', configjsLocal)).toBe(true);
		rm('-rf', configJson);

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

		expect(utils.readJsonFile(configJson).name).toBe('test 01-07 config local');
	});

	it("(08) should has the platform component", function(){
		cd('08');

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(1);
	});

	it("(09) should has the es6-promise component", function(){
		cd('09');

		expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(1);
	});
});