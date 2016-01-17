/**
 * Created by Crystian on 2/18/2015.
 *
 * it is a wizard for create a new app based on a template
 *
 * Remember, you need permission to execute this file (in *nix ambient)
 * > chmod u+x create.js
 */

var fs          = require('fs-extra'),
		inquirer    = require('inquirer'),
		exec        = require('child_process').exec,
		replaceGulp = require('gulp-replace'),
		gulp        = require('gulp'),
		debug       = require('gulp-debug'),
		cfg         = require('./project-config.json'),
		chalk       = require('chalk'),
		del         = require('del');

require('./tasks/shared/utils');

var questions = [];

console.logGreen('                                                                                                     ');
console.logGreen('  ╔═══════════════════════════════════════════════════════════════════════════════════════════════╗  ');
console.logGreen('  ║ * Welcome to "create wizard" of WEAPP-BUILDER!, please read the readme.md before create one * ║  ');
console.logGreen('  ╚═══════════════════════════════════════════════════════════════════════════════════════════════╝  ');
console.logGreen('                                                                                                     ');
console.log('');

/*
 questions tutorial: http://enzolutions.com/articles/2014/09/08/how-to-create-an-interactive-command-in-node-js/
 */
var create = [{
	type: 'confirm',
	name: 'create',
	message: 'Create it? (this action OVERWRITE your files)',
	default: true
}];
questions = questions.concat(create);

var projectCode = [{
	when: function(r){return r.create;},
	type: 'input',
	name: 'projectCode',
	message: 'Project name (without spaces and simbols):',
	default: 'APP'
}];
questions = questions.concat(projectCode);

var copyTemplate = [{
	when: function(r){return r.projectCode;},
	type: 'list',
	name: 'copyTemplate',
	message: 'Which template do you want to use?',
	choices: [
		{value: 'templates/empty', name: 'Empty', default: true},
		{value: 'templates/angular-full', name: 'Angular full'},
		{value: 'templates/angular-empty', name: 'Angular empty'},
		{value: 'templates/angular-materials', name: 'Angular material empty'}
	]
}];
questions = questions.concat(copyTemplate);

var installDep = [{
	when: function(r){return r.copyTemplate;},
	type: 'confirm',
	name: 'installDep',
	message: 'Install dependencies? (npm & bower)',
	default: false
}];
questions = questions.concat(installDep);

var cordova = [{
	type: 'confirm',
	name: 'cordova',
	message: 'Do you want to make an app (cordova) for stores (play and apple)?',
	default: true
}, {
	when: function(r){return r.cordova;},
	type: 'input',
	name: 'main',
	message: 'Name:',
	default: 'HelloWorld'
}, {
	when: function(r){return r.main;},
	type: 'input',
	name: 'domain',
	message: 'Package:',
	default: 'com.example.hello'
}];
questions = questions.concat(cordova);

var cordovaPlatform = [{
	when: function(r){return r.cordova;},
	type: "checkbox",
	message: "Platform to install:",
	name: "platforms",
	choices: [
		{value: "android", name: "Android", checked: true},
		{value: "browser", name: "Browser"},
		{value: "windows", name: "Windows"},
		{value: "ios", name: "iOS"},
		{value: "wp8", name: "Windows Phone 8"}
	]
}];
questions = questions.concat(cordovaPlatform);

var cordovaPlugins = [{
	when: function(r){return r.cordova;},
	type: "checkbox",
	message: "Plugins to install:",
	name: "plugins",
	choices: [
		{name: "device", value: "cordova-plugin-device", checked: true},
		{name: "network-information", value: "cordova-plugin-network-information", checked: true},
		{name: "globalization", value: "cordova-plugin-globalization", checked: true},
		{name: "splashscreen", value: "cordova-plugin-splashscreen", checked: true},
		{name: "whitelist", value: "cordova-plugin-whitelist", checked: true},
		{name: "dialogs", value: "cordova-plugin-dialogs"},
		{name: "battery-status", value: "cordova-plugin-battery-status"},
		{name: "device-motion", value: "cordova-plugin-device-motion"},
		{name: "device-orientation", value: "cordova-plugin-device-orientation"},
		{name: "geolocation", value: "cordova-plugin-geolocation"},
		{name: "camera", value: "cordova-plugin-camera"},
		{name: "media-capture", value: "cordova-plugin-media-capture"},
		{name: "media", value: "cordova-plugin-media"},
		{name: "file", value: " cordova-plugin-file"},
		{name: "file-transfer", value: "cordova-plugin-file-transfer"},
		{name: "vibration", value: "cordova-plugin-vibration"},
		{name: "contacts", value: "cordova-plugin-contacts"},
		{name: "statusbar", value: "cordova-plugin-statusbar"},
		{name: "inappbrowser", value: "cordova-plugin-inappbrowser"},
		{name: "console", value: "cordova-plugin-console"}
	]
}];
questions = questions.concat(cordovaPlugins);

inquirer.prompt(questions, function(answers){

	var projectConfigFile      = 'project-config.json',
			projectConfigLocalFile = 'project-config-local.json';

	if(answers.create){
		if(answers.copyTemplate){

			del([
				answers.copyTemplate + '/build',
				answers.copyTemplate + '/dist',
				answers.copyTemplate + '/node_modules',
				answers.copyTemplate + '/www/vendors/bower_components'
			]);

			fs.copySync(answers.copyTemplate, '../' + answers.projectCode);

			switch (answers.copyTemplate){
				case 'templates/angular-full':
					replace([
						'../' + answers.projectCode + '/www/app/app.json',
						'../' + answers.projectCode + '/www/app/landing.scss',
						'../' + answers.projectCode + '/www/vendors/theme/style.css',
						'../' + answers.projectCode + '/www/app2/app.json',
						'../' + answers.projectCode + '/www/app2/app.js',
						'../' + answers.projectCode + '/www/app2/app.scss',
						'../' + answers.projectCode + '/www/app2/other.scss',
						'../' + answers.projectCode + '/www/app2/msgBold/msgBoldDirective.js',
						'../' + answers.projectCode + '/www/app2/data/dataServices.js'
					], '../' + answers.copyTemplate + '/www/', '../');

					replace([
						'../' + answers.projectCode + '/gulpfile.js',
						'../' + answers.projectCode + '/tasks/tasks.js'
					], '../../t', '../WEBAPP-BUILDER/t');

					replace([
						'../' + answers.projectCode + '/project-config.json'
					], '"template": "templates/angular-full"', '');

					break;

				default:
					console.logRed('WHATT?? there isn\'t this template');
					process.exit(1);
			}

			fs.outputJSONSync('../' + answers.projectCode + '/' + projectConfigLocalFile, {}, {encoding: 'utf8'});

			if(answers.installDep){
				console.logGreen('Installing dependencies, wait please...');
				npmInstall(answers, function(){
					npmBower(answers);
				});
			}

			if(answers.cordova){
				console.log(chalk.black.bgYellow('Cordova project is generating...'));

				exec('cordova create ' + cfg.cordova.folder + ' ' + answers.domain + ' ' + answers.main, {cwd: '../'+ answers.projectCode},
					function(error, stdout, stderr){

						if(error !== null){
							console.logRed(stdout);
							console.logRed('stderr: ' + stderr);
							console.logRed('exec error: ' + error);
							console.logRed('Is Cordova installed?');
							process.exit(1);
						} else {
							console.logGreen(stdout);

							var packageJson = '../' + answers.projectCode + '/package.json';
							var pkg = require(packageJson);
							pkg.domain = answers.domain;
							pkg.mainClass = answers.main;
							fs.outputJSONSync(packageJson, pkg);

							var configFile = '../' + answers.projectCode + '/'+ projectConfigFile;
							var cfgFile = require(configFile);
							cfgFile.cordova = {active: true};
							fs.outputJSONSync(configFile, cfgFile);

							installCordovaPl('platform', answers.platforms, '../'+ answers.projectCode, function(){
								if(answers.platforms.length > 0){
									installCordovaPl('plugin', answers.plugins, '../'+ answers.projectCode, finalCordova);
								}
							});
						}
					});
			}
		}
	}
});

function replace(files, key, value){
	gulp.src(files, {base: './'})
		.pipe(debug({verbose: true}))
		.pipe(replaceGulp(key, value))
		.pipe(gulp.dest('.'));
}

function npmInstall(answers, cb){
	exec('npm install', {cwd: '../' + answers.projectCode},
		function(error, stdout, stderr){

			if(error !== null){
				console.logRed(stdout);
				console.logRed('stderr: ' + stderr);
				console.logRed('exec error: ' + error);
				process.exit(1);
			} else {
				console.log(stdout);
				cb();
			}
		});
}

function npmBower(answers){
	exec('bower install', {cwd: '../' + answers.projectCode},
		function(error, stdout, stderr){

			if(error !== null){
				console.logRed(stdout);
				console.logRed('stderr: ' + stderr);
				console.logRed('exec error: ' + error);
				process.exit(1);
			} else {
				console.log(stdout);

			}
		});
}

/* plugins and platforms */
function installCordovaPl(text, pl, projectCode, cb){
	if(pl.length > 0){
		exec('cordova ' + text + ' add ' + pl.join(' '), {cwd: projectCode + '/' + cfg.cordova.folder},
			function(error, stdout, stderr){

				if(error !== null){
					console.logRed(stdout);
					console.logRed('stderr: ' + stderr);
					console.logRed('exec error: ' + error);
					process.exit(1);
				} else {
					console.log(stdout);
				}
				cb(projectCode);
			});
	} else {
		cb();
	}
}

function finalCordova(projectCode){
	var www = projectCode + '/' + cfg.cordova.folder + '/www';
	fs.emptyDirSync(www);
}
