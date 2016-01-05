/**
 * Created by Crystian on 02/12/2015.
 */
(function(){
	'use strict';

	var utils     = require('../../tasks/shared/utils'),
			Nightmare = require('nightmare'),
			_         = require('lodash'),
			Promise   = require('q').Promise,
			fs        = require('fs');

	var args = process.argv.slice(2).join(' '),
			isCI = (process.argv.indexOf('--ci') !== -1);

	require('shelljs/global');

	var testFolder          = 'spec/fixture/11build',
			templateFolder      = 'templates/test',
			rootFwk             = '../../../../',
			rootFwkFromTemplate = '../../',
			buildFolder         = 'build/',
			tempFolder          = 'temp/',
			distFolder          = 'dist/',
			distAppJson         = distFolder + 'app.json',
			wwwIndex            = 'www/index.html',
			index               = buildFolder + 'index.html',
			indexDist           = distFolder + 'index.html',
			loaderCss           = rootFwkFromTemplate + 'loader/css/loader.css',
			loaderCssPrj        = rootFwk + 'loader/css/loader.css',
			configJs            = rootFwkFromTemplate + 'loader/config.js',
			configJsPrj         = rootFwk + 'loader/config.js',
			indexHtml           = rootFwkFromTemplate + 'loader/index.html',
			indexHtmlPrj        = rootFwk + 'loader/index.html',
			appCss              = 'www/app/app.css',
			appCssAlt           = 'www/app/appStyle.css',
			wwwJson             = 'www/app/www.json',
			configJson          = 'config.json',
			t;

	var projectConfig = {
		"compress": false,
		"app": {
			"name": "template test",
			"version": "0.0.1",
			"release": true,
			"folders": {
				"temp": "temp",
				"build": "build"
			}
		},
		"loader": {
			"release": true
		}
	};

	var projectConfigTemplate = _.clone(projectConfig, true);
	projectConfigTemplate.app.folders.template = 'templates/test';

	var nightmare = Nightmare({
		timeout: 500,
		show: false,
		width: 1024,
		height: 768
	});

	function saveConfig(_projectConfig, _dest){
		var dest = _dest || '';
		JSON.stringify(_projectConfig, null, '\t').to(dest + 'project-config.json');
	}

	function removeGenFiles(){
		rm('-rf', buildFolder);
		rm('-rf', distFolder);
		rm('-rf', loaderCss);
		rm('-rf', loaderCssPrj);
		rm('-rf', configJs);
		rm('-rf', configJsPrj);
		rm('-rf', indexHtml);
		rm('-rf', indexHtmlPrj);
		rm('-rf', configJson);
		rm('-rf', wwwIndex);
		rm('-rf', appCss);
		rm('-rf', wwwJson);

		expect(test('-e', buildFolder)).toBe(false);
		expect(test('-e', distFolder)).toBe(false);
		expect(test('-e', loaderCss)).toBe(false);
		expect(test('-e', configJs)).toBe(false);
		expect(test('-e', indexHtml)).toBe(false);
		expect(test('-e', configJson)).toBe(false);
		expect(test('-e', loaderCssPrj)).toBe(false);
		expect(test('-e', configJsPrj)).toBe(false);
		expect(test('-e', indexHtmlPrj)).toBe(false);
		expect(test('-e', appCss)).toBe(false);
		expect(test('-e', wwwJson)).toBe(false);
		expect(test('-e', wwwIndex)).toBe(false);
	}

	function removeStdout(){
		t = process.stdout.write;
		process.stdout.write = function(chunk){
			if(chunk && chunk.indexOf && chunk.indexOf('Error') !== -1){
				t.apply(this, arguments);
			}
		};
		return t;
	}

	function restoreStdout(){
		process.stdout.write = t;
	}

	describe('11-0build: check basic commands for build', function(){
		describe('from root, it', function(){
			it('should fail because it is not project', function(){
				expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(2);
			});

			it('should fail because it is not project', function(){
				expect(exec('gulp buildProject --testMode ' + args, {silent: 1}).code).toBe(2);
			});

			it('should fail because it is not project', function(){
				expect(exec('gulp buildFull --testMode ' + args, {silent: 1}).code).toBe(2);
			});

			it('should fail because it is not project', function(){
				expect(exec('gulp buildLoaderDist --testMode ' + args, {silent: 1}).code).toBe(2);
			});

			it('should fail because it is not project', function(){
				expect(exec('gulp buildProjectDist --testMode ' + args, {silent: 1}).code).toBe(2);
			});

			it('should fail because it is not project', function(){
				expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(2);
			});

			it('should fail because it is root', function(){
				expect(exec('gulp serve --testMode ' + args, {silent: 1}).code).toBe(2);
			});

			it('should fail because it is root', function(){
				expect(exec('gulp serveLoader --testMode ' + args, {silent: 1}).code).toBe(2);
			});

			it('should fail because it is not project', function(){
				expect(exec('gulp serveDist --testMode ' + args, {silent: 1}).code).toBe(2);
			});

		});

		describe("11build: from template, it", function(){

			beforeEach(function(){
				cd(templateFolder);
			});
			afterEach(function(){
				cd(rootFwkFromTemplate);
			});

			it('should build loader files', function(){
				saveConfig(projectConfigTemplate);
				removeGenFiles();

				expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', loaderCss)).toBe(true);
				expect(test('-e', configJs)).toBe(true);
				expect(test('-e', indexHtml)).toBe(true);
				expect(test('-e', configJson)).toBe(true);
				expect(test('-e', appCss)).toBe(false);
				expect(test('-e', wwwJson)).toBe(false);

			});

			it('should build project files', function(){
				saveConfig(projectConfigTemplate);
				removeGenFiles();

				expect(exec('gulp buildProject --testMode ' + args, {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(false);
				expect(test('-e', loaderCss)).toBe(false);
				expect(test('-e', configJs)).toBe(false);
				expect(test('-e', indexHtml)).toBe(false);
				expect(test('-e', configJson)).toBe(false);
				expect(test('-e', appCss)).toBe(true);
				expect(test('-e', wwwJson)).toBe(true);

			});

			it('should build project and loader files', function(){
				saveConfig(projectConfigTemplate);
				removeGenFiles();

				expect(exec('gulp buildFull --testMode ' + args, {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', loaderCss)).toBe(true);
				expect(test('-e', configJs)).toBe(true);
				expect(test('-e', indexHtml)).toBe(true);
				expect(test('-e', configJson)).toBe(true);
				expect(test('-e', appCss)).toBe(true);
				expect(test('-e', wwwJson)).toBe(true);

			});

			it('should make dist files (without debug parameter)', function(){
				saveConfig(projectConfigTemplate);
				removeGenFiles();

				expect(exec('gulp buildLoaderDist --testMode', {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', distFolder)).toBe(true);
				expect(test('-e', loaderCss)).toBe(true);
				expect(test('-e', configJs)).toBe(true);
				expect(test('-e', indexHtml)).toBe(true);
				expect(test('-e', configJson)).toBe(true);
				expect(test('-e', appCss)).toBe(false);
				expect(test('-e', wwwJson)).toBe(false);
				expect(test('-e', indexDist)).toBe(true);

				expect(cat(indexDist)).toContain('isDist:!0');
				expect(fs.statSync(indexDist).size).toBeMoreLess(67220, 1000);

			});

			it('should make dist files (debug)', function(){
				saveConfig(projectConfigTemplate);
				removeGenFiles();

				//just for debug test
				expect(exec('gulp buildLoaderDist --testMode --debug', {silent: 1}).code).toBe(0);
				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder)).toBe(true);
				expect(test('-e', distFolder)).toBe(true);
			});

			it('should make project files on dist', function(){
				saveConfig(projectConfigTemplate);
				removeGenFiles();

				expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.css')).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.html')).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.js')).toBe(true);
				expect(test('-e', distFolder)).toBe(true);
				expect(test('-e', distAppJson)).toBe(true);
				expect(test('-e', loaderCss)).toBe(false);
				expect(test('-e', configJs)).toBe(false);
				expect(test('-e', indexHtml)).toBe(false);
				expect(test('-e', configJson)).toBe(false);
				expect(test('-e', appCss)).toBe(true);
				expect(test('-e', wwwJson)).toBe(true);

				expect(fs.statSync(distAppJson).size).toBeMoreLess(689, 10);

			});

			it('should make project and loader files on dist', function(){
				saveConfig(projectConfigTemplate);
				removeGenFiles();

				expect(exec('gulp buildFullDist --testMode --debug', {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.css')).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.html')).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.js')).toBe(true);
				expect(test('-e', distFolder)).toBe(true);
				expect(test('-e', distAppJson)).toBe(true);
				expect(test('-e', loaderCss)).toBe(true);
				expect(test('-e', configJs)).toBe(true);
				expect(test('-e', indexHtml)).toBe(true);
				expect(test('-e', configJson)).toBe(true);
				expect(test('-e', appCss)).toBe(true);
				expect(test('-e', wwwJson)).toBe(true);

				expect(fs.statSync(distAppJson).size).toBeMoreLess(689, 10);

			});

			if(!isCI){
				it('should start the server on loader folder (can fail by timeout)', function(done){
					saveConfig(projectConfigTemplate);
					removeGenFiles();

					//DON'T REMOVE --testMode!
					expect(exec('gulp buildFull --testMode ' + args, {silent: 1}).code).toBe(0);

					//I didn't found another way to do this test, it is "serveLoader" task
					var configJsonFile = utils.readJsonFile(configJson),
							test           = configJsonFile.test.server;

					global.gulp = require('gulp');

					//temporal remove output
					removeStdout();

					var server      = require('../../tasks/shared/server.js'),
							streamServe = server.makeServe(test.path, test.folder, test.ip, test.ports.template);
					setTimeout(function(){
						Promise.resolve(nightmare
							.goto('http://' + test.ip + ':' + test.ports.template + '/loader')
							.on('page', function(type, message){
								expect(type).toBe('alert');
								expect(message).toBe('clickMe!');
							})
							.wait('#clickme')
							.click('#clickme')
							.evaluate(function(){
								return document.getElementsByTagName('html')[0].innerHTML;
							})
						).then(function(html){
							//index.html on loader
							expect(html).not.toBe('<head></head><body></body>');
							expect(html).toContain('<!--comment for test, do not remove it-->');
							expect(html).not.toContain('isDist:!1');
							end();
						}, function(err){
							console.error(err);
							end();
						});
					}, 2000);

					function end(){
						//output returned
						restoreStdout();

						//kill the web server
						streamServe.emit('kill');

						global.gulp = null;
						//finish it
						done();
					}
				});
			}

			if(!isCI){
				it('should start the server on dist folder (can fail by timeout)', function(done){
					saveConfig(projectConfigTemplate);
					removeGenFiles();

					//DON'T REMOVE --testMode!
					expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(0);

					//I didn't found another way to do this test, it is "serveLoader" task
					var configJsonFile = utils.readJsonFile(configJson),
							test           = configJsonFile.test.server;

					global.gulp = require('gulp');

					//temporal remove output
					removeStdout();

					var server      = require('../../tasks/shared/server.js'),
							streamServe = server.makeServe(test.pathDist, test.folderDist, test.ip, test.ports.dist);

					setTimeout(function(){
						Promise.resolve(nightmare
							.goto('http://' + test.ip + ':' + test.ports.dist)
							.on('page', function(type, message){
								expect(type).toBe('alert');
								expect(message).toBe('clickMe!');
							})
							.wait('#clickme')
							.click('#clickme')
							.evaluate(function(){
								return document.getElementsByTagName('html')[0].innerHTML;
							})
							//.end()
						).then(function(html){
							//index.html on loader
							expect(html).not.toBe('<head></head><body></body>');
							expect(html).not.toContain('<!--comment for test, do not remove it-->');
							expect(html).toContain('isDist:!0');
							end();
						}, function(err){
							console.error(err);
							end();
						});
					}, 2000);

					function end(){
						//output returned
						restoreStdout();

						//kill the web server
						streamServe.emit('kill');

						global.gulp = null;
						//finish it
						done();
					}
				});
			}

		});

		describe("11build: from project, it", function(){

			beforeEach(function(){
				cd(testFolder);
			});
			afterEach(function(){
				cd(rootFwk);
			});

			it('(01) should build loader files', function(){
				cd('01');

				saveConfig(projectConfig);
				removeGenFiles();

				expect(exec('gulp buildLoader --testMode ' + args, {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', loaderCssPrj)).toBe(true);
				expect(test('-e', configJsPrj)).toBe(true);
				expect(test('-e', indexHtmlPrj)).toBe(true);
				expect(test('-e', configJson)).toBe(true);
				expect(test('-e', wwwIndex)).toBe(true);
				expect(test('-e', appCss)).toBe(false);
				expect(test('-e', wwwJson)).toBe(false);

			});

			it('(01) should build project files', function(){
				cd('01');

				saveConfig(projectConfig);
				removeGenFiles();

				expect(exec('gulp buildProject --testMode ' + args, {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(false);
				expect(test('-e', loaderCssPrj)).toBe(false);
				expect(test('-e', configJsPrj)).toBe(false);
				expect(test('-e', indexHtmlPrj)).toBe(false);
				expect(test('-e', configJson)).toBe(false);
				expect(test('-e', wwwIndex)).toBe(false);
				expect(test('-e', appCssAlt)).toBe(true);
				expect(test('-e', wwwJson)).toBe(true);

			});

			it('(01) should build project and loader files', function(){
				cd('01');

				saveConfig(projectConfig);
				removeGenFiles();

				expect(exec('gulp buildFull --testMode ' + args, {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', loaderCssPrj)).toBe(true);
				expect(test('-e', configJsPrj)).toBe(true);
				expect(test('-e', indexHtmlPrj)).toBe(true);
				expect(test('-e', wwwIndex)).toBe(true);
				expect(test('-e', configJson)).toBe(true);
				expect(test('-e', appCssAlt)).toBe(true);
				expect(test('-e', wwwJson)).toBe(true);

			});

			it('(01) should make dist files (without debug parameter)', function(){
				cd('01');

				saveConfig(projectConfig);
				removeGenFiles();

				expect(exec('gulp buildLoaderDist --testMode', {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', distFolder)).toBe(true);
				expect(test('-e', loaderCssPrj)).toBe(true);
				expect(test('-e', configJsPrj)).toBe(true);
				expect(test('-e', indexHtmlPrj)).toBe(true);
				expect(test('-e', configJson)).toBe(true);
				expect(test('-e', wwwIndex)).toBe(false);
				expect(test('-e', appCss)).toBe(false);
				expect(test('-e', wwwJson)).toBe(false);
				expect(test('-e', indexDist)).toBe(true);

				expect(cat(indexDist)).toContain('isDist:!0');
				expect(fs.statSync(indexDist).size).toBeMoreLess(66819, 1000);

			});

			it('(01) should make dist files (debug)', function(){
				cd('01');

				saveConfig(projectConfig);
				removeGenFiles();

				//just for debug test
				expect(exec('gulp buildLoaderDist --testMode --debug', {silent: 1}).code).toBe(0);
				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder)).toBe(true);
				expect(test('-e', distFolder)).toBe(true);
			});

			it('(01) should make project files on dist', function(){
				cd('01');

				saveConfig(projectConfig);
				removeGenFiles();
				rm('-rf', appCssAlt);

				expect(exec('gulp buildProjectDist --testMode --debug', {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.css')).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.html')).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.js')).toBe(true);
				expect(test('-e', distFolder)).toBe(true);
				expect(test('-e', distAppJson)).toBe(true);
				expect(test('-e', loaderCssPrj)).toBe(false);
				expect(test('-e', configJsPrj)).toBe(false);
				expect(test('-e', indexHtmlPrj)).toBe(false);
				expect(test('-e', configJson)).toBe(false);
				expect(test('-e', appCssAlt)).toBe(true);
				expect(test('-e', wwwJson)).toBe(true);
				expect(test('-e', indexDist)).toBe(false);

				expect(fs.statSync(distAppJson).size).toBeMoreLess(926, 50);

			});

			it('(01) should make project and loader files on dist', function(){
				cd('01');

				saveConfig(projectConfig);
				removeGenFiles();

				expect(exec('gulp buildFullDist --testMode --debug', {silent: 1}).code).toBe(0);

				expect(test('-e', buildFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder)).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.css')).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.html')).toBe(true);
				expect(test('-e', buildFolder + tempFolder + 'app.js')).toBe(true);
				expect(test('-e', distFolder)).toBe(true);
				expect(test('-e', distAppJson)).toBe(true);
				expect(test('-e', loaderCssPrj)).toBe(true);
				expect(test('-e', configJsPrj)).toBe(true);
				expect(test('-e', indexHtmlPrj)).toBe(true);
				expect(test('-e', configJson)).toBe(true);
				expect(test('-e', appCssAlt)).toBe(true);
				expect(test('-e', wwwJson)).toBe(true);
				expect(test('-e', indexDist)).toBe(true);

				expect(fs.statSync(distAppJson).size).toBeMoreLess(1225, 50);

			});

			if(!isCI){
				it('(01) should start the server on loader folder (can fail by timeout)', function(done){
					cd('01');

					saveConfig(projectConfig);
					removeGenFiles();

					//DON'T REMOVE --testMode!
					expect(exec('gulp buildFull --testMode ' + args, {silent: 1}).code).toBe(0);

					//I didn't found another way to do this test, it is "serveLoader" task
					var configJsonFile = utils.readJsonFile(configJson),
							test           = configJsonFile.test.server;

					global.gulp = require('gulp');

					//temporal remove output
					removeStdout();

					var server      = require('../../tasks/shared/server.js'),
							streamServe = server.makeServe(test.pathPrj, test.folderDist, test.ip, test.ports.project);

					setTimeout(function(){
						Promise.resolve(nightmare
							.goto('http://' + test.ip + ':' + test.ports.project)
							.on('page', function(type, message){
								expect(type).toBe('alert');
								expect(message).toBe('clickMe!');
							})
							.wait('#clickme')
							.click('#clickme')
							.evaluate(function(){
								return document.getElementsByTagName('html')[0].innerHTML;
							})
						).then(function(html){
							//index.html on loader
							expect(html).not.toBe('<head></head><body></body>');
							expect(html).not.toContain('<!--comment for test, do not remove it-->');
							expect(html).toContain('isDist:!1');
							end();
						}, function(err){
							console.error(err);
							end();
						});
					}, 2000);

					function end(){
						//output returned
						restoreStdout();

						//kill the web server
						streamServe.emit('kill');

						global.gulp = null;
						//finish it
						done();
					}
				});
			}

			if(!isCI){
				it('(01) should start the server on dist folder (can fail by timeout)', function(done){
					cd('01');

					saveConfig(projectConfig);
					removeGenFiles();

					//DON'T REMOVE --testMode!
					expect(exec('gulp buildFullDist --testMode ' + args, {silent: 1}).code).toBe(0);

					//I didn't found another way to do this test, it is "serveLoader" task
					var configJsonFile = utils.readJsonFile(configJson),
							test           = configJsonFile.test.server;

					global.gulp = require('gulp');

					//temporal remove output
					removeStdout();

					var server      = require('../../tasks/shared/server.js'),
							streamServe = server.makeServe(test.pathDist, test.folderDist, test.ip, test.ports.dist);

					setTimeout(function(){
						Promise.resolve(nightmare
							.goto('http://' + test.ip + ':' + test.ports.dist)
							.on('page', function(type, message){
								expect(type).toBe('alert');
								expect(message).toBe('clickMe!');
							})
							.wait('#clickme')
							.click('#clickme')
							.evaluate(function(){
								return document.getElementsByTagName('html')[0].innerHTML;
							})
							//.end()
						).then(function(html){
							//index.html on loader
							expect(html).not.toBe('<head></head><body></body>');
							expect(html).not.toContain('<!--comment for test, do not remove it-->');
							expect(html).toContain('isDist:!0');
							end();
						}, function(err){
							console.error(err);
							end();
						});
					}, 2000);

					function end(){
						//output returned
						restoreStdout();

						//kill the web server
						streamServe.emit('kill');

						global.gulp = null;
						//finish it
						done();
					}
				});
			}

		});
	});

}());



