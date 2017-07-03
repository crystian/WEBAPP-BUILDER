/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
    fs    = require('fs');

var args = process.argv.slice(2).join(' ');

require('shelljs/global');

var testFolder = 'spec/fixture/03_bower',
    rootFwk    = '../../../..',
    bowerJson  = '/bower.json',
    configJson = 'config.json';

describe("03_bower Bower dependencies and more", function(){

  beforeEach(function(){
    cd(testFolder);
  });
  afterEach(function(){
    cd(rootFwk);
  });

  //BOOT
  it('(01) should stop because with compres lz-string is needed', function(){
    cd('01');
    expect(exec('gulp generatorBower --testMode ' + args, {silent: 1}).code).toBe(2);
  });

  it('(02) should be fastclick == null', function(){
    cd('02');
    var pathBower = rootFwk + bowerJson;
    rm('-rf', pathBower);
    expect(test('-e', pathBower)).toBe(false);

    expect(exec('gulp _generatorBower --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', pathBower)).toBe(true);
    var bowerFile = utils.readJsonFile(pathBower);
    expect(bowerFile.dependencies.fastclick).toBeUndefined();
  });

  it('(03) should be platform with other version', function(){
    cd('03');
    var pathBower = rootFwk + bowerJson;
    rm('-rf', pathBower);

    expect(exec('gulp _generatorBower --testMode ' + args, {silent: 1}).code).toBe(0);

    var bowerFile = utils.readJsonFile(pathBower);
    expect(bowerFile.dependencies.platform).toBe('1.0.0');
  });

  it('(04) should be add other component', function(){
    cd('04');
    var pathBower = rootFwk + bowerJson;
    rm('-rf', pathBower);

    expect(exec('gulp _generatorBower --testMode ' + args, {silent: 1}).code).toBe(0);

    var bowerFile = utils.readJsonFile(pathBower);
    expect(bowerFile.dependencies.other).toBe('1.0.0');
  });

  it('(05) should download resources with bower', function(){
    cd('05');

    rm('-rf', configJson);
    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
    var bowerFolder = utils.readJsonFile(configJson).cfg.loader.folders.bower;

    var pathBowerFolder = rootFwk + '/' + bowerFolder;
    rm('-rf', pathBowerFolder);
    expect(test('-e', pathBowerFolder)).toBe(false);

    expect(exec('gulp _makeBower --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', pathBowerFolder)).toBe(true);
  });

  it('(06) should create a minificated version for js libs', function(){
    cd('06');

    rm('-rf', configJson);
    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
    var bowerFolder = utils.readJsonFile(configJson).cfg.loader.folders.bower;
    var pathBowerFolder = rootFwk + '/' + bowerFolder;
    rm('-rf', pathBowerFolder);

    expect(exec('gulp _makeBower --testMode ' + args, {silent: 1}).code).toBe(0);

    var platformMin = pathBowerFolder + '/platform/platform.min.js';
    expect(test('-e', platformMin)).toBe(true);

    //check minification
    expect(fs.statSync(platformMin).size).toBeMoreLess(12322, 50);

  });

  xit('(07) should create a minificated version for css libs', function(){
    cd('07');

    rm('-rf', configJson);
    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
    var bowerFolder     = utils.readJsonFile(configJson).cfg.loader.folders.bower,
        pathBowerFolder = rootFwk + '/' + bowerFolder;
    rm('-rf', pathBowerFolder);

    var bootstrapMin      = pathBowerFolder + '/bootstrap/dist/',
        bootstrapJs       = bootstrapMin + 'js/bootstrap.other.min.js',
        bootstrapNpm      = bootstrapMin + 'js/npm.other.min.js',
        bootstrapCss      = bootstrapMin + 'css/bootstrap.other.min.css',
        bootstrapCssTheme = bootstrapMin + 'css/bootstrap-theme.other.min.css';

    expect(exec('gulp _makeBower --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', bootstrapJs)).toBe(true);
    expect(test('-e', bootstrapNpm)).toBe(true);
    expect(test('-e', bootstrapCss)).toBe(true);
    expect(test('-e', bootstrapCssTheme)).toBe(true);

    //check size of minification
    expect(fs.statSync(bootstrapJs).size).toBeMoreLess(36691, 50);
    expect(fs.statSync(bootstrapNpm).size).toBeMoreLess(369, 5);
    expect(fs.statSync(bootstrapCss).size).toBeMoreLess(117771, 5000);
    expect(fs.statSync(bootstrapCssTheme).size).toBeMoreLess(20010, 1000);
  });
});
