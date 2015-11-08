/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
		fs = require('fs');

var args = process.argv.slice(2).join();

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
		expect(exec('gulp generatorBower --testMode '+ args, {silent:true}).code).toBe(1);
	});

	it('(02) should be fastclick == null', function(){
		cd('02');
		var pathBower = rootFwk + bowerJson;
		rm('-rf', pathBower);
		expect(test('-e', pathBower)).toBe(false);

		expect(exec('gulp generatorBower --testMode '+ args, {silent:true}).code).toBe(0);

		expect(test('-e', pathBower)).toBe(true);
		var bowerFile = utils.readJsonFile(pathBower);
		expect(bowerFile.dependencies.fastclick).toBeUndefined();
	});

	it('(03) should be platform with other version', function(){
		cd('03');
		var pathBower = rootFwk + bowerJson;
		rm('-rf', pathBower);

		expect(exec('gulp generatorBower --testMode '+ args, {silent:true}).code).toBe(0);

		var bowerFile = utils.readJsonFile(pathBower);
		expect(bowerFile.dependencies.platform).toBe('1.0.0');
	});

	it('(04) should be add other component', function(){
		cd('04');
		var pathBower = rootFwk + bowerJson;
		rm('-rf', pathBower);

		expect(exec('gulp generatorBower --testMode '+ args, {silent:true}).code).toBe(0);

		var bowerFile = utils.readJsonFile(pathBower);
		expect(bowerFile.dependencies.other).toBe('1.0.0');
	});

	it('(05) should download resources with bower', function(){
		cd('05');

		rm('-rf', configJson);
		expect(exec('gulp makeConfig --testMode '+ args, {silent:true}).code).toBe(0);
		var bowerFolder = utils.readJsonFile(configJson).cfg.loader.folders.bower;

		var pathBowerFolder = rootFwk +'/'+ bowerFolder;
		rm('-rf', pathBowerFolder);
		expect(test('-e', pathBowerFolder)).toBe(false);

		expect(exec('gulp makeBower --testMode '+ args, {silent:true}).code).toBe(0);

		expect(test('-e', pathBowerFolder)).toBe(true);
	});

	it('(06) should create a minificated version for js libs', function(){
		cd('06');

		rm('-rf', configJson);
		expect(exec('gulp makeConfig --testMode '+ args, {silent:true}).code).toBe(0);
		var bowerFolder = utils.readJsonFile(configJson).cfg.loader.folders.bower;
		var pathBowerFolder = rootFwk +'/'+ bowerFolder;
		rm('-rf', pathBowerFolder);

		expect(exec('gulp makeBower --testMode '+ args, {silent:true}).code).toBe(0);

		var platformMin = pathBowerFolder +'/platform/platform.min.js';
		expect(test('-e', platformMin)).toBe(true);

		//check minification
		var file = fs.statSync(platformMin);
		expect(file.size).toBeGreaterThan(12000);
		expect(file.size).toBeLessThan(14000);

	});

	it('(07) should create a minificated version for css libs', function(){
		cd('07');

		rm('-rf', configJson);
		expect(exec('gulp makeConfig --testMode '+ args, {silent:true}).code).toBe(0);
		var bowerFolder = utils.readJsonFile(configJson).cfg.loader.folders.bower,
				pathBowerFolder = rootFwk +'/'+ bowerFolder;
		rm('-rf', pathBowerFolder);

		var bootstrapMin = pathBowerFolder +'/bootstrap/dist/',
				bootstrapJs = bootstrapMin + 'js/bootstrap.other.min.js',
				bootstrapNpm = bootstrapMin + 'js/npm.other.min.js',
				bootstrapCss = bootstrapMin + 'css/bootstrap.other.min.css',
				bootstrapCssTheme = bootstrapMin + 'css/bootstrap-theme.other.min.css';

		expect(exec('gulp makeBower --testMode '+ args, {silent:true}).code).toBe(0);

		expect(test('-e', bootstrapJs)).toBe(true);
		expect(test('-e', bootstrapNpm)).toBe(true);
		expect(test('-e', bootstrapCss)).toBe(true);
		expect(test('-e', bootstrapCssTheme)).toBe(true);

		//check size of minification
		expect(fs.statSync(bootstrapJs).size).toBeLessThan(40000);
		expect(fs.statSync(bootstrapNpm).size).toBeLessThan(400);
		expect(fs.statSync(bootstrapCss).size).toBeLessThan(190000);
		expect(fs.statSync(bootstrapCssTheme).size).toBeLessThan(24000);
	});
});