/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/framework/utils'),
		fs = require('fs');

require('shelljs/global');

var testFolder = 'spec/fixture/03bower',
		rootFwk = '../../../..',
		bowerJson = '/bower.json',
		configJson = 'config.json';

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
		var pathBower = rootFwk + bowerJson;
		rm('-rf', pathBower);
		expect(test('-e', pathBower)).toBe(false);

		expect(exec('gulp generatorBower --testMode', {silent:true}).code).toBe(0);

		expect(test('-e', pathBower)).toBe(true);
		var bowerFile = utils.readJsonFile(pathBower);
		expect(bowerFile.dependencies.platform).toBeUndefined();
	});

	it('(03) should be platform with other version', function(){
		cd('03');
		var pathBower = rootFwk + bowerJson;
		rm('-rf', pathBower);

		expect(exec('gulp generatorBower --testMode', {silent:true}).code).toBe(0);

		var bowerFile = utils.readJsonFile(pathBower);
		expect(bowerFile.dependencies.platform).toBe('1.0.0');
	});

	it('(04) should be add other component', function(){
		cd('04');
		var pathBower = rootFwk + bowerJson;
		rm('-rf', pathBower);

		expect(exec('gulp generatorBower --testMode', {silent:true}).code).toBe(0);

		var bowerFile = utils.readJsonFile(pathBower);
		expect(bowerFile.dependencies.other).toBe('1.0.0');
	});

	it('(05) should download resources with bower', function(){
		cd('05');

		rm('-rf', configJson);
		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);
		var bowerFolder = utils.readJsonFile(configJson).cfg.loader.folders.bower;

		var pathBowerFolder = rootFwk +'/'+ bowerFolder;
		rm('-rf', pathBowerFolder);
		expect(test('-e', pathBowerFolder)).toBe(false);

		expect(exec('gulp makeBower --testMode', {silent:true}).code).toBe(0);

		expect(test('-e', pathBowerFolder)).toBe(true);
	});

	it('(06) should create a minificated version for libs', function(){
		cd('06');

		rm('-rf', configJson);
		expect(exec('gulp makeConfig --testMode', {silent:true}).code).toBe(0);
		var bowerFolder = utils.readJsonFile(configJson).cfg.loader.folders.bower;
		var pathBowerFolder = rootFwk +'/'+ bowerFolder;
		rm('-rf', pathBowerFolder);

		expect(exec('gulp makeBower --testMode', {silent:true}).code).toBe(0);

		var platformMin = pathBowerFolder +'/platform/platform.min.js';
		expect(test('-e', platformMin)).toBe(true);

		//check minification
		var file = fs.statSync(platformMin);
		expect(file.size).toBeGreaterThan(12000);
		expect(file.size).toBeLessThan(14000);

	});


});