/**
 * Created by Crystian on 2/18/2015.
 */

/*
Remember, you need permission to execute this file (in *nix ambient)
# chmod u+x installer.js

*/
'use strict';

var fs = require('fs-extra'),
	inquirer = require('inquirer'),
	sys = require('sys'),
	exec = require('child_process').exec,
	chalk = require('chalk');

var folders = {app:'APP',cordova:'CORDOVA'},
	questions = [];


console.log(chalk.black.bgGreen('                                                                                               '));
console.log(chalk.black.bgGreen('  ╔═════════════════════════════════════════════════════════════════════════════════════════╗  '));
console.log(chalk.black.bgGreen('  ║ * Welcome to instalation of POWER-LOADER, please read the readme.md before install it * ║  '));
console.log(chalk.black.bgGreen('  ╚═════════════════════════════════════════════════════════════════════════════════════════╝  '));
console.log(chalk.black.bgGreen('                                                                                               '));
console.log('');

//questions tutorial: http://enzolutions.com/articles/2014/09/08/how-to-create-an-interactive-command-in-node-js/
var install = [{
	type: 'confirm',
	name: 'install',
	message: 'Install it? (remember, this OVERWRITE your files)',
	default: true
}];

questions = questions.concat(install);

var cordova = [{
	when: function(r) {return r.install;},
	type: 'confirm',
	name: 'cordova',
	message: 'Install cordova?',
	default: true
},{
	when: function(r) {return r.cordova;},
	type: 'input',
	name: 'domain',
	message: 'Package:',
	default: 'com.example.hello'
},{
	when: function(r) {return r.domain;},
	type: 'input',
	name: 'main',
	message: 'Main Class:',
	default: 'HelloWorld'
}];

questions = questions.concat(cordova);

var cordovaPlatform = [{
	when: function(r) {return r.cordova;},
	type: "checkbox",
	message: "Platform to install:",
	name: "platforms",
	choices: [
		{value: "browser", name: "Browser", checked: true},
		{value: "android", name: "Android", checked: true},
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
		fs.copySync(cfg.folders.template, '../');
		fs.outputJSONSync('../gulp-config-local.json',{});

		if (answers.cordova) {
			console.log(chalk.black.bgYellow('Cordova is instaling...'));

			exec('cordova create '+folders.cordova+' '+ answers.domain +' '+ answers.main,{cwd:'../'+ folders.app +'/'},
				function (error, stdout, stderr) {

				if (error !== null) {
					console.log(chalk.black.bgRed(stdout));
					console.log(chalk.black.bgRed('stderr: ' + stderr));
					console.log(chalk.black.bgRed('exec error: ' + error));
				} else {
					console.log(chalk.black.bgGreen(stdout));

					var packageJson = '../package.json';
					var pkg = require(packageJson);
					pkg.domain = answers.domain;
					pkg.mainClass = answers.main;
					fs.outputJSONSync(packageJson,pkg);

					installCordovaPl('platform', answers.platforms, function () {
						if(answers.platforms.length>0){
							installCordovaPl('plugin', answers.plugins, finalCordova);
						}
					});
				}
			});
		}

	}
});


function installCordovaPl(text, pl, cb){/* plugins and platforms */
	if (pl.length>0){
		exec('cordova '+ text +' add '+ pl.join(' '), {cwd:'../'+ folders.app +'/'+folders.cordova},
			function (error, stdout, stderr) {

				if (error !== null) {
					console.log(chalk.black.bgRed(stdout));
					console.log(chalk.black.bgRed('stderr: ' + stderr));
					console.log(chalk.black.bgRed('exec error: ' + error));
				} else {
					console.log(chalk.black.bgGreen(stdout));
				}
				cb();
			});
	} else {
		cb();
	}
}

function finalCordova(){
	var www = '../' + folders.app + '/' + folders.cordova + '/www';
	fs.deleteSync(www);
	fs.mkdirsSync(www);
}
