/**
 * Created by Crystian on 02/12/2015.
 */

var utils = require('../../tasks/shared/utils'),
    fs    = require('fs');

var args = process.argv.slice(2).join(' ');

require('shelljs/global');

var testFolder  = 'spec/fixture/10html',
    rootFwk     = '../../../..',
    indexOri    = 'www/app1/index.original.html',
    index       = 'www/app1/index',
    indexJade   = 'www/app1/indexJade',
    keyNotOverw = 'not overwritten'
  ;

function createFileTest(){
  var testContent =
        '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '	<meta charset="UTF-8">\n' +
        '	<title>test</title>\n' +
        '</head>\n' +
        '<body>\n' +
        '	body\n' +
        '</body>\n' +
        '</html>';
  testContent.to(index + '.html');
}

describe("10html: preprocessors (html)", function(){

  beforeEach(function(){
    cd(testFolder);
  });
  afterEach(function(){
    cd(rootFwk);
  });

  it('(01) should NOT create backup files', function(){
    cd('01');

    expect(test('-e', indexOri)).toBe(false);

    expect(exec('gulp html --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexOri)).toBe(false);
  });

  it('(02) should create backup files', function(){
    cd('02');

    rm('-rf', indexOri);

    expect(test('-e', indexOri)).toBe(false);

    expect(exec('gulp html --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexOri)).toBe(true);
  });

  it('(03) should create backup files and modificate the html', function(){
    cd('03');

    rm('-rf', indexOri);
    rm('-rf', index + '.html');

    createFileTest();

    expect(exec('gulp html --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(index + '.html')).toContain('charset="UTF-16"');

    expect(test('-e', indexOri)).toBe(true);
  });

  it('(04) should do nothing, because there an original file', function(){
    cd('04');

    expect(exec('gulp html --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(index + '.html')).not.toContain('charset="UTF-16"');
  });

  it('(06) should create html files', function(){
    cd('06');
    var indexHtml = index + '.html';

    rm('-rf', indexHtml);

    expect(exec('gulp html --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexHtml)).toBe(true);
  });

  it('(09) should create files (width values)', function(){
    cd('09');
    var indexHtml = index + '.html';
    rm('-rf', indexHtml);

    expect(exec('gulp html --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexHtml)).toContain('<!DOCTYPE html>');
  });

  it('(12) generate min files', function(){
    cd('12');
    var ext = '.min.html';

    rm('-rf', index + ext);
    rm('-rf', indexJade + ext);

    expect(exec('gulp html --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', index + ext)).toBe(true);
    expect(test('-e', indexJade + ext)).toBe(true);

    expect(fs.statSync(index + ext).size).toBeMoreLess(286, 5);
    expect(fs.statSync(indexJade + ext).size).toBeMoreLess(364, 5);
  });

  it('(30) should not remove code for production (not release)', function(){
    cd('30');
    var indexJadeHtml = indexJade + '.html',
        keyword       = 'remove me on production';

    rm('-rf', indexJadeHtml);

    expect(cat(indexJade + '.jade')).toContain(keyword);

    expect(exec('gulp html --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexJadeHtml)).toContain(keyword);

    expect(fs.statSync(indexJadeHtml).size).toBeMoreLess(572, 6);
  });

  it('(31) should remove code for production (release)', function(){
    cd('31');
    var indexJadeHtml = indexJade + '.html',
        keyword       = 'remove me on production';

    rm('-rf', indexJadeHtml);

    expect(cat(indexJade + '.jade')).toContain(keyword);

    expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexJadeHtml)).not.toContain(keyword);

    expect(fs.statSync(indexJadeHtml).size).toBeMoreLess(363, 5);
  })

});