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
	commons = require('./tasks/commons'),
	cfg = require('./project-config.json'),
	chalk = require('chalk');

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
	default: true
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

var cordova = [{
	when: function(r) {return r.projectCode;},
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
		{name:"device",value: "org.apache.cordova.device",checked: true},
		{name: "network-information", value: "org.apache.cordova.network-information",checked: true},
		{name: "globalization", value: "org.apache.cordova.globalization",checked: true},
		{name: "splashscreen", value: "org.apache.cordova.splashscreen",checked: true},
		{name: "dialogs", value: "org.apache.cordova.dialogs"},
		{name: "battery-status", value: "org.apache.cordova.battery-status"},
		{name: "device-motion", value: "org.apache.cordova.device-motion"},
		{name: "device-orientation", value: "org.apache.cordova.device-orientation"},
		{name: "geolocation", value: "org.apache.cordova.geolocation"},
		{name: "camera", value: "org.apache.cordova.camera"},
		{name: "media-capture", value: "org.apache.cordova.media-capture"},
		{name: "media", value: "org.apache.cordova.media"},
		{name: "file", value: "org.apache.cordova.file"},
		{name: "file-transfer", value: "org.apache.cordova.file-transfer"},
		{name: "vibration", value: "org.apache.cordova.vibration"},
		{name: "contacts", value: "org.apache.cordova.contacts"},
		{name: "inappbrowser", value: "org.apache.cordova.inappbrowser"},
		{name: "console", value: "org.apache.cordova.console"}
	]
}];

questions = questions.concat(cordovaPlugins);

inquirer.prompt(questions, function( answers ) {
	//console.dir(answers);

	var projectNameFile = 'project-active.json',
		projectConfigFile = 'project-config.json',
		projectConfigLocalFile = 'project-config-local.json';

	if (answers.install){

		fs.copySync(cfg.folders.template, answers.projectCode);
		fs.outputJSONSync(projectNameFile, {projectCode: answers.projectCode}, {encoding: 'utf8'});
		fs.outputJSONSync(answers.projectCode +'/'+ projectConfigLocalFile,{}, {encoding: 'utf8'});

		var op = require('./'+ cfg.folders.template +'/'+ projectConfigFile);
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
	fs.deleteSync(www);
	fs.mkdirsSync(www);
}
