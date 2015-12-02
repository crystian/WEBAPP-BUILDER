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
		keyNotOverw = 'not overwritten'
	;

function createCssTest(){
	var cssTestContent =
				'body {' +
				'	color: #ff0;' +
				'}';

	cssTestContent.to(indexCss + '.css');
}

describe("preprocessors (css)", function(){

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

		rm('-rf', indexCss + '.css');
		rm('-rf', indexCssOri);

		createCssTest();

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexCss + '.css');

		expect(indexCssContent).toContain('yellow');

		expect(test('-e', indexCssOri)).toBe(true);
	});

	it('(04) should do nothing, because there an original file', function(){
		cd('04');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexCss + '.css');

		expect(indexCssContent).not.toContain('yellow');
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

		expect(test('-e', indexSass + '.css')).toBe(true);
		expect(test('-e', indexScss + '.css')).toBe(true);
		expect(test('-e', indexLess + '.css')).toBe(true);
		expect(test('-e', indexStyl + '.css')).toBe(true);
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

		var indexSassContent = cat(indexSass + '.css'),
				indexScssContent = cat(indexScss + '.css'),
				indexLessContent = cat(indexLess + '.css'),
				indexStylContent = cat(indexStyl + '.css');

		var keyword = 'color: #FF0;';
		expect(indexSassContent).toContain(keyword);
		expect(indexScssContent).toContain(keyword);
		expect(indexLessContent).toContain(keyword);
		expect(indexStylContent).toContain(keyword.toLowerCase());
	});

	it('(10) should perfix css (only chrome)', function(){
		cd('10');
		var ext = '.css';

		rm('-rf', indexSass + ext);
		rm('-rf', indexScss + ext);
		rm('-rf', indexLess + ext);
		rm('-rf', indexStyl + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexSassContent = cat(indexSass + '.css'),
				indexScssContent = cat(indexScss + '.css'),
				indexLessContent = cat(indexLess + '.css'),
				indexStylContent = cat(indexStyl + '.css');

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

		var indexSassContent = cat(indexSass + '.css'),
				indexScssContent = cat(indexScss + '.css'),
				indexLessContent = cat(indexLess + '.css'),
				indexStylContent = cat(indexStyl + '.css');

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

		var file = fs.statSync(indexSass + ext);
		expect(file.size).toBe(237);
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

		var file = fs.statSync(indexSass + ext);
		expect(file.size).toBe(237);
	});

	it('(14)should not replace pre min (not release or not generateMin)', function(){
		cd('14');
		var ext = '.css';

		rm('-rf', indexLess + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexLess + ext);

		expect(indexCssContent).not.toContain('yellow');
	});

	it('(15) should replace pre min (regular expr)', function(){
		cd('15');
		var ext = '.css';

		rm('-rf', indexLess + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexLess + ext);

		expect(indexCssContent).toContain('border:50em');
	});

	it('(16) should replace post min', function(){
		cd('16');
		var ext = '.min.css';

		rm('-rf', indexLess + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexLess + ext);

		expect(indexCssContent).toContain('border:50em');

		var file = fs.statSync(indexLess + ext);
		expect(file.size).toBe(240);
	});

	it('(17) should minify css file', function(){
		cd('17');
		var ext = '.min.css';

		rm('-rf', indexLess + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexCss + ext);

		expect(indexCssContent).toContain('border:0}');

		var file = fs.statSync(indexCss + ext);
		expect(file.size).toBe(237);
	});

	it('(18) should minify css file because it is a release', function(){
		cd('18');
		var ext = '.css';

		rm('-rf', indexSass + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexSass + ext);

		expect(indexCssContent).toContain('border:0}');

		var file = fs.statSync(indexSass + ext);
		expect(file.size).toBe(237);
	});

	it('(19) should not process overwrite files - min', function(){
		cd('19');
		var ext = '.min.css';

		rm('-rf', indexScss + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexSassContent = cat(indexSass + ext),
				indexScssContent = cat(indexScss + ext),
				indexLessContent = cat(indexLess + ext),
				indexStylContent = cat(indexStyl + ext);

		expect(indexSassContent).toContain(keyNotOverw);
		expect(indexLessContent).toContain(keyNotOverw);
		expect(indexStylContent).toContain(keyNotOverw);

		expect(indexScssContent).toContain('color:#FF0');

		var file = fs.statSync(indexScss + ext);
		expect(file.size).toBe(237);
	});

	it('(20) should not process overwrite files', function(){
		cd('20');
		var ext = '.css';

		rm('-rf', indexScss + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexSassContent = cat(indexSass + ext),
				indexScssContent = cat(indexScss + ext),
				indexLessContent = cat(indexLess + ext),
				indexStylContent = cat(indexStyl + ext);

		expect(indexSassContent).toContain(keyNotOverw);
		expect(indexLessContent).toContain(keyNotOverw);
		expect(indexStylContent).toContain(keyNotOverw);

		expect(indexScssContent).toContain('color:#FF0');
	});

	it('(21) should not process minificated file', function(){
		cd('21');
		var ext = '.css';

		rm('-rf', indexScss + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexCss + ext);

		expect(indexCssContent).toContain(keyNotOverw);

	});

	it('(22) should overwriteOnRelease without release', function(){
		cd('22');
		var ext = '.css';

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexScss + ext);

		expect(indexCssContent).toContain(keyNotOverw);

	});

	it('(23) should overwriteOnRelease with release', function(){
		cd('23');
		var ext = '.css';

		rm('-rf', indexScss + ext);
		keyNotOverw.to(indexScss + ext);

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var indexCssContent = cat(indexScss + ext);

		expect(indexCssContent).not.toContain(keyNotOverw);

	});

	it('(24) should not make a backup file', function(){
		cd('24');
		var indexScssC = indexScss + '.css',
				indexScssS = indexScss + '.scss';

		rm('-rf', indexScssC);
		rm('-rf', indexScssS);

		cp('-f', 'www/app1/ori/*', 'www/app1');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		var file1 = fs.statSync(indexScssC);
		expect(file1.size).toBe(237);

		var file2 = fs.statSync(indexScssS);
		expect(file2.size).toBe(170);

		expect(cat(indexScssS)).toContain('$primaryColor: #00F');
		expect(cat(indexScssC)).toContain('color:#00F');

		expect(test('-e', indexScss + '.original.scss')).toBe(false); //should not exist
	});

	it('(25) should fail by linter on css file', function(){
		cd('25');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(1);
	});

	it('(90) complex case 1', function(){
		cd('90');

		rm('-rf', indexSass + '*');
		rm('-rf', indexScss + '*');
		rm('-rf', indexLess + '*');
		rm('-rf', indexStyl + '*');

		cp('-f', 'www/app1/ori/*', 'www/app1');

		expect(exec('gulp css --testMode ' + args, {silent: 1}).code).toBe(0);

		//first app:
		expect(cat(indexScss + '.original.scss')).toContain('$primaryColor: #FF0'); //should not change it
		expect(cat(indexScss + '.scss')).toContain('$primaryColor: #00F;');
		expect(cat(indexScss + '.css')).toContain('color:#00F');

		expect(cat(indexLess + '.original.less')).toContain('@primaryColor: #FF0');
		expect(cat(indexLess + '.less')).toContain('@primaryColor: #00F;');
		expect(cat(indexLess + '.css')).toContain('color:#00F');

		expect(fs.statSync(indexScss + '.css').size).toBe(237);

		expect(fs.statSync(indexLess + '.css').size).toBe(237);

		//complex
		expect(test('-e', indexCss + '.css')).toBe(true);
		expect(test('-e', indexCss + '.b.css')).toBe(true);//original backup with other extension
		expect(test('-e', indexCss + '.m.css')).toBe(true);//minificated with other extension

		expect(fs.statSync(indexCss + '.m.css').size).toBe(238);

		expect(cat(indexCss + '.css')).toContain('color: yellow;');//replace: original
		expect(cat(indexCss + '.m.css')).toContain('color:blue;');//replace: pre & post
		expect(cat(indexCss + '.b.css')).toContain('color: #FF0;');//original value

		//second app:
		expect(test('-e', 'www/app2/indexSass.css')).toBe(false);//should not exist
		expect(cat('www/app2/indexCss.css')).toContain(keyNotOverw);
	});


});