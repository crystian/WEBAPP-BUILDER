/**
 * Created by Crystian on 14/11/2015.
 */

var utils = require('../../tasks/shared/utils'),
    fs    = require('fs');

var args = process.argv.slice(2).join(' ');

require('shelljs/global');

var testFolder  = 'spec/fixture/08css',
    rootFwk     = '../../../..',
    indexCssOri = 'www/app1/indexCss.original.css',
    indexCss    = 'www/app1/indexCss',
    indexSass   = 'www/app1/indexSass',
    indexScss   = 'www/app1/indexScss',
    indexLess   = 'www/app1/indexLess',
    indexStyl   = 'www/app1/indexStyl',
    keyNotOverw = 'not overwritten';

function createCssTest(){
  var cssTestContent =
        'body {' +
        '	color: #ff0;' +
        '}';

  cssTestContent.to(indexCss + '.css');
}

describe("08css: preprocessors (css)", function(){

  beforeEach(function(){
    cd(testFolder);
  });
  afterEach(function(){
    cd(rootFwk);
  });


  it('(01) should NOT create backup files', function(){
    cd('01');

    rm('-rf', indexCssOri);

    expect(test('-e', indexCssOri)).toBe(false);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexCssOri)).toBe(false);
  });

  it('(02) should create backup files', function(){
    cd('02');

    rm('-rf', indexCssOri);

    expect(test('-e', indexCssOri)).toBe(false);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexCssOri)).toBe(true);
  });

  it('(03) should create backup files and modificate the css', function(){
    cd('03');

    var indexCssCss = indexCss + '.css';
    rm('-rf', indexCssCss);
    rm('-rf', indexCssOri);

    createCssTest();

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexCssCss)).toContain('yellow');

    expect(test('-e', indexCssOri)).toBe(true);
  });

  it('(04) should do nothing, because there an original file', function(){
    cd('04');

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexCss + '.css')).not.toContain('yellow');
  });

  it('(05) should support another filename (postfix)', function(){
    cd('05');

    var indexCssOther = 'www/app1/indexCss.other.css';
    rm('-rf', indexCssOther);

    createCssTest();

    expect(test('-e', indexCssOther)).toBe(false);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexCssOther)).toBe(true);
  });

  it('(06) should create css files', function(){
    cd('06');
    var ext = '.css';

    rm('-rf', indexSass + ext);
    rm('-rf', indexScss + ext);
    rm('-rf', indexLess + ext);
    rm('-rf', indexStyl + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexSass + ext)).toBe(true);
    expect(test('-e', indexScss + ext)).toBe(true);
    expect(test('-e', indexLess + ext)).toBe(true);
    expect(test('-e', indexStyl + ext)).toBe(true);
  });

  it('(07) should works with css linter but with errors', function(){
    cd('07');
    rm('-rf', indexScss + '.css');

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexScss + '.css')).toBe(true);
  });

  it('(08) should fail because use linterForce:true', function(){
    cd('08');
    rm('-rf', indexScss + '.css');

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(1);

    expect(test('-e', indexScss + '.css')).toBe(false);
  });

  it('(09) should create css files (width css values)', function(){
    cd('09');
    var ext = '.css';

    rm('-rf', indexSass + ext);
    rm('-rf', indexScss + ext);
    rm('-rf', indexLess + ext);
    rm('-rf', indexStyl + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    var keyword = 'color: #FF0;';
    expect(cat(indexSass + ext)).toContain(keyword);
    expect(cat(indexScss + ext)).toContain(keyword);
    expect(cat(indexLess + ext)).toContain(keyword);
    expect(cat(indexStyl + ext)).toContain(keyword.toLowerCase());
  });

  it('(10) should perfix css (only chrome)', function(){
    cd('10');
    var ext = '.css';

    rm('-rf', indexSass + ext);
    rm('-rf', indexScss + ext);
    rm('-rf', indexLess + ext);
    rm('-rf', indexStyl + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    var indexSassContent = cat(indexSass + ext),
        indexScssContent = cat(indexScss + ext),
        indexLessContent = cat(indexLess + ext),
        indexStylContent = cat(indexStyl + ext);

    var keyword = '-webkit-transform: rotateX(150deg);';
    expect(indexSassContent).toContain(keyword);
    expect(indexScssContent).toContain(keyword);
    expect(indexLessContent).toContain(keyword);
    expect(indexStylContent).toContain(keyword);

    var keyNotOverwNot = 'display: -ms-flexbox;';
    expect(indexSassContent).not.toContain(keyNotOverwNot);
    expect(indexScssContent).not.toContain(keyNotOverwNot);
    expect(indexLessContent).not.toContain(keyNotOverwNot);
    expect(indexStylContent).not.toContain(keyNotOverwNot);
  });

  it('(11) should NOT perfix css', function(){
    cd('11');
    var ext = '.css';

    rm('-rf', indexSass + ext);
    rm('-rf', indexScss + ext);
    rm('-rf', indexLess + ext);
    rm('-rf', indexStyl + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    var indexSassContent = cat(indexSass + ext),
        indexScssContent = cat(indexScss + ext),
        indexLessContent = cat(indexLess + ext),
        indexStylContent = cat(indexStyl + ext);

    var keyNotOverwNot1 = '-webkit-transform: rotateX(150deg);';
    expect(indexSassContent).not.toContain(keyNotOverwNot1);
    expect(indexScssContent).not.toContain(keyNotOverwNot1);
    expect(indexLessContent).not.toContain(keyNotOverwNot1);
    expect(indexStylContent).not.toContain(keyNotOverwNot1);

    var keyNotOverwNot2 = 'display: -ms-flexbox;';
    expect(indexSassContent).not.toContain(keyNotOverwNot2);
    expect(indexScssContent).not.toContain(keyNotOverwNot2);
    expect(indexLessContent).not.toContain(keyNotOverwNot2);
    expect(indexStylContent).not.toContain(keyNotOverwNot2);
  });

  it('(12) generate min files', function(){
    cd('12');
    var ext = '.min.css';

    rm('-rf', indexSass + ext);
    rm('-rf', indexScss + ext);
    rm('-rf', indexLess + ext);
    rm('-rf', indexStyl + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexSass + ext)).toBe(true);
    expect(test('-e', indexScss + ext)).toBe(true);
    expect(test('-e', indexLess + ext)).toBe(true);
    expect(test('-e', indexStyl + ext)).toBe(true);

    expect(fs.statSync(indexSass + ext).size).toBeMoreLess(237, 5);
  });

  it('(13) generate min files with other extension', function(){
    cd('13');
    var ext = '.other.css';

    rm('-rf', indexSass + ext);
    rm('-rf', indexScss + ext);
    rm('-rf', indexLess + ext);
    rm('-rf', indexStyl + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(test('-e', indexSass + ext)).toBe(true);
    expect(test('-e', indexScss + ext)).toBe(true);
    expect(test('-e', indexLess + ext)).toBe(true);
    expect(test('-e', indexStyl + ext)).toBe(true);

    expect(fs.statSync(indexSass + ext).size).toBeMoreLess(237, 5);
  });

  it('(14) should replace pre min', function(){
    cd('14');
    var ext = '.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLess + ext).toLowerCase()).toContain('#00f');
  });

  it('(26) should not replace pre min', function(){
    cd('26');
    var ext = '.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLess + ext)).not.toContain('#00F');
  });

  it('(15) should replace pre min (regular expr)', function(){
    cd('15');
    var ext = '.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLess + ext)).toContain('border:50em');
  });

  it('(27) should not replace pre min (regular expr)', function(){
    cd('27');
    var ext = '.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLess + ext)).toContain('border: 0px');
  });

  it('(28) should replace pre prepro', function(){
    cd('28');
    var ext = '.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLess + ext)).toContain('border: 50em;');
    expect(cat(indexLess + ext)).not.toContain('border: 14px;');
  });

  it('(29) should replace post prepro', function(){
    cd('29');
    var indexLessCss = indexLess + '.css';

    rm('-rf', indexLessCss);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLessCss)).toContain('other-value');

    expect(utils.occurrences(cat(indexLessCss), 'other-value')).toBe(4);
  });

  it('(30) should replace pre prepro dist', function(){
    cd('30');
    var ext = '.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLess + ext)).not.toContain('border: 50em;');
    expect(cat(indexLess + ext)).toContain('border:14px');
  });

  it('(31) should replace post prepro dist', function(){
    cd('31');
    var ext = '.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLess + ext)).not.toContain('border: 50em;');
    expect(cat(indexLess + ext)).toContain('border:100%');
  });

  it('(16) should replace post min', function(){
    cd('16');
    var ext = '.min.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexLess + ext)).toContain('border:50em');

    expect(fs.statSync(indexLess + ext).size).toBeMoreLess(240, 5);
  });

  it('(17) should minify file', function(){
    cd('17');
    var ext = '.min.css';

    rm('-rf', indexLess + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexCss + ext)).toContain('border:0}');

    expect(fs.statSync(indexCss + ext).size).toBeMoreLess(237, 5);
  });

  it('(18) should minify file because it is dist', function(){
    cd('18');
    var ext = '.css';

    rm('-rf', indexSass + ext);

    expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexSass + ext)).toContain('border:0}');

    expect(fs.statSync(indexSass + ext).size).toBeMoreLess(237, 5);
  });

  it('(18) should no minify file because it is not dist (release)', function(){
    cd('18');
    var ext = '.css';

    rm('-rf', indexSass + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexSass + ext)).toContain('border: 0px');

    expect(fs.statSync(indexSass + ext).size).toBeMoreLess(315, 5);
  });

  it('(19) should not process overwrite files - min', function(){
    cd('19');
    var ext = '.min.css';

    rm('-rf', indexScss + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexSass + ext)).toContain(keyNotOverw);
    expect(cat(indexLess + ext)).toContain(keyNotOverw);
    expect(cat(indexStyl + ext)).toContain(keyNotOverw);

    expect(cat(indexScss + ext).toLowerCase()).toContain('color:#ff0');

    expect(fs.statSync(indexScss + ext).size).toBeMoreLess(237, 5);
  });

  it('(20) should not process overwrited files', function(){
    cd('20');
    var ext = '.css';

    rm('-rf', indexScss + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexSass + ext)).toContain(keyNotOverw);
    expect(cat(indexLess + ext)).toContain(keyNotOverw);
    expect(cat(indexStyl + ext)).toContain(keyNotOverw);

    expect(cat(indexScss + ext)).toContain('color: #FF0');
  });

  it('(21) should not process minificated file', function(){
    cd('21');
    var ext = '.css';

    rm('-rf', indexScss + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexCss + ext)).toContain(keyNotOverw);

  });

  it('(22) should overwriteOnRelease without release', function(){
    cd('22');
    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexScss + '.css')).toContain(keyNotOverw);

  });

  it('(23) should overwriteOnRelease with release', function(){
    cd('23');
    var ext = '.css';

    rm('-rf', indexScss + ext);
    keyNotOverw.to(indexScss + ext);

    expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

    expect(cat(indexScss + ext)).not.toContain(keyNotOverw);

  });

  it('(90) complex case 1', function(){
    cd('90');

    rm('-rf', indexSass + '*');
    rm('-rf', indexScss + '*');
    rm('-rf', indexLess + '*');
    rm('-rf', indexStyl + '*');

    cp('-f', 'www/app1/ori/*', 'www/app1');

    expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(0);

    //first app:
    expect(cat(indexScss + '.original.scss')).toContain('$primaryColor: #FF0'); //should not change it
    expect(cat(indexScss + '.scss')).toContain('$primaryColor: #00F;');
    expect(cat(indexScss + '.css').toLowerCase()).toContain('color:#00f');

    expect(cat(indexLess + '.original.less')).toContain('@primaryColor: #FF0');
    expect(cat(indexLess + '.less')).toContain('@primaryColor: #00F;');
    expect(cat(indexLess + '.css').toLowerCase()).toContain('color:#00f');

    expect(fs.statSync(indexScss + '.css').size).toBeMoreLess(237, 5);

    expect(fs.statSync(indexLess + '.css').size).toBeMoreLess(237, 5);

    //complex
    expect(test('-e', indexCss + '.css')).toBe(true);
    expect(test('-e', indexCss + '.b.css')).toBe(true);//original backup with other extension
    expect(test('-e', indexCss + '.m.css')).toBe(true);//minificated with other extension

    expect(fs.statSync(indexCss + '.m.css').size).toBeMoreLess(237, 5);

    expect(cat(indexCss + '.css')).toContain('color: yellow;');//replace: original
    expect(cat(indexCss + '.m.css')).toContain('color:blue;');//replace: pre & post min
    expect(cat(indexCss + '.b.css').toLowerCase()).toContain('color: #ff0;');//original value

    //second app:
    expect(test('-e', 'www/app2/indexSass.css')).toBe(false);//should not exist
    expect(cat('www/app2/indexCss.css')).toContain(keyNotOverw);
  });


});