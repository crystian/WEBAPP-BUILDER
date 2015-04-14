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

var appCode = [{
	when: function(r) {return r.install;},
	type: 'input',
	name: 'appCode',
	message: 'App Code (without spaces and simbols):',
	default: 'APP'
}];

questions = questions.concat(appCode);

var cordova = [{
	when: function(r) {return r.appCode;},
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

	if (answers.install){
		fs.copySync(cfg.folders.template, answers.appCode);
		fs.outputJSONSync('project-config-local.json',{appCode: answers.appCode});
		fs.outputJSONSync(answers.appCode+ '/project-config.json', {appCode: answers.appCode});
		fs.outputJSONSync(answers.appCode +'/project-config-local.json',{});
		if (answers.cordova){
			console.log(chalk.black.bgYellow('Cordova project is generating...'));

			exec('cordova create '+ cfg.folders.cordova +' '+ answers.domain +' '+ answers.main, {cwd: answers.appCode +'/'},
				function (error, stdout, stderr) {

				if (error !== null) {
					console.logRed(stdout);
					console.logRed('stderr: ' + stderr);
					console.logRed('exec error: ' + error);
					console.logRed('Is Cordova installed?');
				} else {
					console.logGreen(stdout);

					var packageJson = answers.appCode +'/package.json';
					var pkg = require('./'+ packageJson);
					pkg.domain = answers.domain;
					pkg.mainClass = answers.main;
					fs.outputJSONSync(packageJson, pkg);

					installCordovaPl('platform', answers.platforms, answers.appCode, function () {
						if(answers.platforms.length>0){
							installCordovaPl('plugin', answers.plugins, answers.appCode, finalCordova);
						}
					});
				}
			});
		}

	}
});


function installCordovaPl(text, pl, appCode, cb){/* plugins and platforms */
	if (pl.length>0){
		exec('cordova '+ text +' add '+ pl.join(' '), {cwd: appCode +'/'+cfg.folders.cordova},
			function (error, stdout, stderr) {

				if (error !== null) {
					console.logRed(stdout);
					console.logRed('stderr: ' + stderr);
					console.logRed('exec error: ' + error);
				} else {
					console.logGreen(stdout);
				}
				cb(appCode);
			});
	} else {
		cb();
	}
}

function finalCordova(appCode){
	var www = appCode + '/' + cfg.folders.cordova + '/www';
	fs.deleteSync(www);
	fs.mkdirsSync(www);
}
