/**
 * Created by Crystian on 2/18/2015.
 */

/*
Remember, you need permission to execute this file (in *nix ambient)
# chmod u+x installer.js

*/

var fs = require('fs-extra'),
	inquirer = require('inquirer'),
	sys = require('sys'),
	exec = require('child_process').exec,
	child,
	chalk = require('chalk');

console.log(chalk.black.bgGreen('                                                                                               '));
console.log(chalk.black.bgGreen('  ╔═════════════════════════════════════════════════════════════════════════════════════════╗  '));
console.log(chalk.black.bgGreen('  ║ * Welcome to instalation of POWER-LOADER, please read the readme.md before install it * ║  '));
console.log(chalk.black.bgGreen('  ╚═════════════════════════════════════════════════════════════════════════════════════════╝  '));
console.log(chalk.black.bgGreen('                                                                                               '));
console.log('');



inquirer.prompt([{
	type: 'confirm',
	name: 'install',
	message: 'Install it? (remember, this OVERWRITE your files)',
	default: true
}], function( answers ) {
	if (answers.install) {
		install();
		cordovaQuestion();
	}
});

function install(){
	fs.copySync('./!rootTpl', '../');
	fs.outputJSONSync('../gulp-config-local.json',{});
}

function cordovaQuestion() {
	inquirer.prompt([{
		type: 'confirm',
		name: 'cordova',
		message: 'Install cordova?',
		default: true
	},{
		when: function(r) {return r.cordova;},
		type: 'input',
		name: 'dom',
		message: 'Package:',
		default: 'com.example.hello'
	},{
		when: function(r) {return r.dom;},
		type: 'input',
		name: 'main',
		message: 'Main Class:',
		default: 'HelloWorld'
	}
	], function( answers ) {
		if (answers.cordova) {
			console.log(chalk.black.bgYellow('Cordova is instaling...'));

			child = exec('cordova create CORDOVA '+ answers.dom +' '+ answers.main,{cwd:'../APP/'}, function (error, stdout, stderr) {

				if (error !== null) {
					console.log(chalk.black.bgRed(stdout));
					console.log(chalk.black.bgRed('stderr: ' + stderr));
					console.log(chalk.black.bgRed('exec error: ' + error));
				} else {
					console.log(chalk.black.bgGreen(stdout));

					fs.move('../.gitignore-cordova', '../APP/CORDOVA/.gitignore',function (e) {
						//moved

					});
				}
			});
		}
	});
}

