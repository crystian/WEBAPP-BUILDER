/**
 * Created by Crystian on 2/18/2015.
 */

/*
Remember, you need permission to execute this file (in *nix ambient)
# chmod u+x installer.js

*/

var fs = require('fs-extra'),
	inquirer = require('inquirer'),
	exec = require('child_process').exec,
	cfg = require('./project-config.json'),
	chalk = require('chalk'),
	del = require('del');

require('./tasks/commons');

var questions = [];

console.logGreen('                                                                                               ');
console.logGreen('  ╔═════════════════════════════════════════════════════════════════════════════════════════╗  ');
console.logGreen('  ║ * Welcome to instalation of APP FACTORY!, please read the readme.md before install it * ║  ');
console.logGreen('  ╚═════════════════════════════════════════════════════════════════════════════════════════╝  ');
console.logGreen('                                                                                               ');
console.log('');

//questions tutorial: http://enzolutions.com/articles/2014/09/08/how-to-create-an-interactive-command-in-node-js/
var install = [{
	type: 'confirm',
	name: 'install',
	message: 'Install it? (remember, this OVERWRITE your files)',
	default: false
}];
questions = questions.concat(install);

var projectCode = [{
	when: function(r) {return r.install;},
	type: 'input',
	name: 'projectCode',
	message: 'Project Code (without spaces and simbols):',
	default: 'APP'
}];
questions = questions.concat(projectCode);

var copyTemplate = [{
	when: function(r) {return r.projectCode;},
	type: 'list',
	name: 'copyTemplate',
	message: 'Which template do you want to use?',
	choices: [
		{value: 'template-empty', name: 'Empty'},
		{value: 'templates/angular-full', name: 'Angular full', default: true},
		{value: 'template-ng-empty', name: 'Angular empty', default: true},
		{value: 'template-ng-materials', name: 'Angular materials empty', default: true}
	]
}];
questions = questions.concat(copyTemplate);

var cordova = [{
	when: function(r) {return r.copyTemplate;},
	type: 'confirm',
	name: 'cordova',
	message: 'Install cordova?',
	default: true
},{
	when: function(r) {return r.cordova;},
	type: 'input',
	name: 'main',
	message: 'Name:',
	default: 'HelloWorld'
},{
	when: function(r) {return r.main;},
	type: 'input',
	name: 'domain',
	message: 'Package:',
	default: 'com.example.hello'
}];
questions = questions.concat(cordova);

var cordovaPlatform = [{
	when: function(r) {return r.cordova;},
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
	when: function(r) {return r.cordova;},
	type: "checkbox",
	message: "Plugins to install:",
	name: "plugins",
	choices: [
		{name:"device",value: "cordova-plugin-device",checked: true},
		{name: "network-information", value: "cordova-plugin-network-information",checked: true},
		{name: "globalization", value: "cordova-plugin-globalization",checked: true},
		{name: "splashscreen", value: "cordova-plugin-splashscreen",checked: true},
		{name: "whitelist", value: "cordova-plugin-whitelist",checked: true},
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

inquirer.prompt(questions, function( answers ) {
	//console.dir(answers);

	var projectNameFile = 'project-active.json',
		projectConfigFile = 'project-config.json',
		projectConfigLocalFile = 'project-config-local.json';

	if (answers.install){

		if(answers.copyTemplate){
			fs.copySync(answers.copyTemplate, answers.projectCode);

			if(answers.copyTemplate === 'templates/angular-full'){
				var gulp = require('gulp'),
					debug = require('gulp-debug'),
					replace = require('gulp-replace');

				gulp.src([
					answers.projectCode +'/vendors/theme/style.css',
					answers.projectCode +'/www/app/app.json',
					answers.projectCode +'/www/app/app.scss',
					answers.projectCode +'/www/landing/app.json',
					answers.projectCode +'/www/landing/landing.scss'
				], {base: './'})
				.pipe(debug({verbose: true}))
				.pipe(replace('/'+ answers.copyTemplate +'/','/'+ answers.projectCode +'/'))
				.pipe(gulp.dest('.'));

				del([
					answers.projectCode +'/node_modules',
					answers.projectCode +'/vendors/bower_components'
				]);
			}

		}

		fs.outputJSONSync(projectNameFile, {projectCode: answers.projectCode}, {encoding: 'utf8'});
		fs.outputJSONSync(answers.projectCode +'/'+ projectConfigLocalFile,{}, {encoding: 'utf8'});

		var op = require('./'+ answers.copyTemplate +'/'+ projectConfigFile);
		op.cordova = answers.cordova;

		fs.outputJSONSync(projectConfigLocalFile, {}, {encoding: 'utf8'});
		fs.outputJSONSync(answers.projectCode +'/'+ projectConfigFile, op, {encoding: 'utf8'});

		if (answers.cordova){
			console.log(chalk.black.bgYellow('Cordova project is generating...'));

			exec('cordova create '+ cfg.folders.cordova +' '+ answers.domain +' '+ answers.main, {cwd: answers.projectCode +'/'},
				function (error, stdout, stderr) {

				if (error !== null) {
					console.logRed(stdout);
					console.logRed('stderr: ' + stderr);
					console.logRed('exec error: ' + error);
					console.logRed('Is Cordova installed?');
				} else {
					console.logGreen(stdout);

					var packageJson = answers.projectCode +'/package.json';
					var pkg = require('./'+ packageJson);
					pkg.domain = answers.domain;
					pkg.mainClass = answers.main;
					fs.outputJSONSync(packageJson, pkg);

					installCordovaPl('platform', answers.platforms, answers.projectCode, function () {
						if(answers.platforms.length>0){
							installCordovaPl('plugin', answers.plugins, answers.projectCode, finalCordova);
						}
					});
				}
			});

		}

		updateGitignore(answers.projectCode);

		console.logRed('');
		console.logRed('REMEMBER: The project/folder: "'+ answers.projectCode +'", will not be include on git, it needs their own repo, and don\'t upload it to AppFactory repo, and READ THE README motherfuckerr!');
		console.logRed('');

	}
});

function updateGitignore(code) {
	var fileName = '.gitignore';
	var content = fs.readFileSync(fileName);
	content += '\n/'+ code;
	fs.writeFileSync(fileName, content, {encoding: 'utf8'});
}


function installCordovaPl(text, pl, projectCode, cb){/* plugins and platforms */
	if (pl.length>0){
		exec('cordova '+ text +' add '+ pl.join(' '), {cwd: projectCode +'/'+cfg.folders.cordova},
			function (error, stdout, stderr) {

				if (error !== null) {
					console.logRed(stdout);
					console.logRed('stderr: ' + stderr);
					console.logRed('exec error: ' + error);
				} else {
					console.logGreen(stdout);
				}
				cb(projectCode);
			});
	} else {
		cb();
	}
}

function finalCordova(projectCode){
	var www = projectCode + '/' + cfg.folders.cordova + '/www';
	fs.emptyDirSync(www);
}
