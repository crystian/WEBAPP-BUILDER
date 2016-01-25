/**
 * Created by Crystian on 01/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
    fs    = require('fs');

var args = process.argv.slice(2).join(' ');

require('shelljs/global');

var testFolder  = 'spec/fixture/02_css',
    rootFwk     = '../../../..',
    cssTestFile = '/css/test',
    pathCssTest = 'loader' + cssTestFile,
    cssFile     = rootFwk + '/' + pathCssTest + '.css',
    configJson  = 'config.json'
  ;

//create and remove a css test file
function createCssTest(){
  var cssTestContent =
        '//This file is just for test, don\'t use it\n\n' +
        '.test{\n' +
        '		animation: parallel .5s 100ms infinite alternate both;\n' +
        '		transform: translateY(0);\n' +
        '		border: 0px;\n' +
        '}';

  cssTestContent.to(pathCssTest + '.scss');
}

function removeCssTest(){
  rm(pathCssTest + '.*');
}

describe("02_css: CSS generation", function(){

  beforeEach(function(){
    createCssTest();
    cd(testFolder);
  });
  afterEach(function(){
    cd(rootFwk);
    removeCssTest();
  });

  it('(01) should create css files', function(){
    cd('01');

    expect(test('-e', cssFile)).toBe(false);

    expect(exec('gulp _makeCss --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', cssFile)).toBe(true);
  });

  it('(02) should do the autoprefixer', function(){
    cd('02');

    expect(exec('gulp _makeCss --testMode ' + args, {silent: 1}).code).toBe(0);

    var testFile = cat(cssFile);
    expect(testFile).toContain('webkit');
    expect(testFile).toContain('border: 0;');
  });

  it('(02) should do not minificated', function(){
    cd('02');

    expect(exec('gulp _makeCss --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(fs.statSync(cssFile).size).toBeMoreLess(225, 5);
  });

  it('(03) should do minificated', function(){
    cd('03');

    expect(exec('gulp _makeCss --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(fs.statSync(cssFile).size).toBeMoreLess(181, 5);
  });

  it('(04) should do the autoprefixer - without change', function(){
    cd('04');

    expect(exec('gulp _makeCss --testMode ' + args, {silent: 1}).code).toBe(0);

    var testFile = cat(cssFile);
    expect(testFile).not.toContain('webkit');
  });

  it('(05) should make the compile version - without minimize', function(){
    cd('05');

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
    var temp             = utils.readJsonFile(configJson).cfg.app.folders.temp,
        compileLoaderCSS = utils.readJsonFile(configJson).cfg.app.folders.build + temp + '/-compiledLoader.css';

    rm('-rf', compileLoaderCSS);
    expect(test('-e', compileLoaderCSS)).toBe(false);

    expect(exec('gulp _buildCss --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', compileLoaderCSS)).toBe(true);

    expect(fs.statSync(compileLoaderCSS).size).toBeMoreLess(3783, 10);
  });

  it('(06) should make the compile version - with minimize', function(){
    cd('06');

    expect(exec('gulp _makeConfig --testMode ' + args, {silent: 1}).code).toBe(0);
    var temp             = utils.readJsonFile(configJson).cfg.app.folders.temp,
        compileLoaderCSS = utils.readJsonFile(configJson).cfg.app.folders.build + temp + '/-compiledLoader.css';

    rm('-rf', compileLoaderCSS);
    expect(test('-e', compileLoaderCSS)).toBe(false);

    expect(exec('gulp _buildCss --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', compileLoaderCSS)).toBe(true);

    expect(fs.statSync(compileLoaderCSS).size).toBeMoreLess(2824, 40);
  });


});
