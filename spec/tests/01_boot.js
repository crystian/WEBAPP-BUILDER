/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
    args  = process.argv.slice(2).join(' ');

require('shelljs/global');

//detail report by default, you can use "dots"
if(process.argv.indexOf('--dots') === -1){
  var SpecReporter = require('jasmine-spec-reporter');
  jasmine.getEnv().addReporter(new SpecReporter());   // add jasmine-spec-reporter
}

//fail on firt failure
if(process.argv.indexOf('--breakOnFail') !== -1){
  var failFast = require('jasmine-fail-fast');
  jasmine.getEnv().addReporter(failFast.init());
}

var testFolder     = 'spec/fixture/01_boot',
    rootFwk        = '../../../../',
    pkgJson        = 'package.json',
    pkgJsonContent = '{"name": "test 01-02","private": true,"dependencies": {}}',
    configjsLocal  = 'project-config-local.json',
    configjs       = 'loader/config.js',
    configJson     = 'config.json';

describe("01_boot: Boot test for the build system of framework (fuaaa)", function(){

  beforeEach(function(){
    cd(testFolder);
  });
  afterEach(function(){
    cd(rootFwk);
  });

  //BOOT
  it('(01) should send the gulp', function(){
    cd('01');
    expect(exec('gulp nothing ' + args, {silent: 1}).code).toBe(2);
  });

  it("(02) should fill gitVersion field", function(){
    cd('02');

    rm('-rf', pkgJson);
    expect(test('-e', pkgJson)).toBe(false);
    pkgJsonContent.to(pkgJson);
    expect(test('-e', pkgJson)).toBe(true);

    expect(exec('gulp nothing', {silent: 1}).code).toBe(0);

    var pkg = utils.readJsonFile(pkgJson);
    expect(pkg.gitVersion).toBeDefined();
  });

  it("(04) should fail with incompatible parameters (compress-lz-string)", function(){
    cd('04');
    expect(exec('gulp nothing ' + args, {silent: 1}).code).toBe(2);
  });

  //CONFIG
  it("(03) should made release", function(){
    cd('03');

    expect(exec('gulp _makeConfig --testMode --release ' + args, {silent: 1}).code).toBe(0);

    var readJsonFile = utils.readJsonFile(configJson);
    expect(readJsonFile.release).toBe(true);
    expect(readJsonFile.cfg.loader.release).toBe(true);
  });

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

  it("(05) should put the default name and version", function(){
    cd('05');
    expect(test('-e', rootFwk + configjs)).toBe(true);

    var pathConfigLocal = rootFwk + configjsLocal;
    var hasLocal = test('-e', pathConfigLocal);

    if(hasLocal){
      mv(pathConfigLocal, pathConfigLocal + '.removed');
    }

    rm('-rf', configJson);

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

    var jsonFile = utils.readJsonFile(configJson);
    expect(jsonFile.name).toBe('WEBAPP-BUILDER-APP');
    expect(jsonFile.version).toBe('0.0.0');

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

    var jsonFile = utils.readJsonFile(configJson);
    expect(jsonFile.name).toBe('from fwk local');
    expect(jsonFile.version).toBe('0.0.0');
    expect(jsonFile.cfg.ip).toBe('127.0.0.1');

    if(!hasLocal){
      rm(pathConfigLocal);
    }
  });

  it("(06) should has the attribute name from APP config", function(){
    cd('06');
    rm('-rf', configJson);

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

    var jsonFile = utils.readJsonFile(configJson);
    expect(jsonFile.name).toBe('test 01-06');
    expect(jsonFile.version).toBe('1.0.1');
    expect(jsonFile.cfg.ip).toBe('test 01-06 config');
  });

  it("(07) should has the attribute name from APP config LOCAL", function(){
    cd('07');
    expect(test('-e', configjsLocal)).toBe(true);
    rm('-rf', configJson);

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

    var jsonFile = utils.readJsonFile(configJson);
    expect(jsonFile.name).toBe('test 01-07');
    expect(jsonFile.version).toBe('1.1.1');
    expect(jsonFile.cfg.ip).toBe('test 01-07 config local');
  });

  it("(08) should has the platform component", function(){
    cd('08');

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(2);
  });

  it("(09) should has the es6-promise component", function(){
    cd('09');

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(2);
  });

  it("(10) contentEditable & release = false", function(){
    cd('10');
    var projectConfig = 'project-config.json';
    rm('-rf', projectConfig);
    expect(test('-e', projectConfig)).toBe(false);
    '{"contentEditable":true,"app":{"release":false}}'.to(projectConfig);
    expect(test('-e', projectConfig)).toBe(true);

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

    var jsonFile = utils.readJsonFile(configJson);
    expect(jsonFile.release).toBe(false);
    expect(jsonFile.contentEditable).toBe(true);
  });

  it("(11) contentEditable & release = true", function(){
    cd('10');
    var projectConfig = 'project-config.json';
    rm('-rf', projectConfig);
    expect(test('-e', projectConfig)).toBe(false);
    '{"contentEditable":true,"app":{"release":true}}'.to(projectConfig);
    expect(test('-e', projectConfig)).toBe(true);

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

    var jsonFile = utils.readJsonFile(configJson);
    expect(jsonFile.release).toBe(true);
    expect(jsonFile.contentEditable).toBeUndefined();
  });

  it("(11) contentEditable = false & release = false", function(){
    cd('10');
    var projectConfig = 'project-config.json';
    rm('-rf', projectConfig);
    expect(test('-e', projectConfig)).toBe(false);
    '{"contentEditable":false,"app":{"release":false}}'.to(projectConfig);
    expect(test('-e', projectConfig)).toBe(true);

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);

    var jsonFile = utils.readJsonFile(configJson);
    expect(jsonFile.release).toBe(false);
    expect(jsonFile.contentEditable).toBeUndefined();
  });
});