/**
 * Created by Crystian on 01/11/2015.
 */

var	utils = require('./framework/utils.js'),
	requireDir = require('require-dir'),
	_ = require('lodash'),
	git = require('git-rev'),
	fs = require('fs'),
	path = require('path'),
	gutil = require('gulp-util');

//require('time-require');

exports.boot = function(config){
	if (!config.gulp) {
		console.logRed('REMEMBER you need to send your gulp module with a config object!');
		utils.exit(1);
	}

	/**
	 * For others projects with its node_module project we need to inject its gulp,
	 * because there is a conflict; With that it needs to be global.
	 *
	 * Don't touch, it cost severals hours
	 */
	global.gulp = config.gulp;

	global.cfg = {};
	try{
		var packageJson = 'package.json',
			projectConfigFile = 'project-config.json',
			projectConfigLocalFile = 'project-config-local.json',
			pathFwk = path.resolve(__dirname,'../'),
			pathPrj = config.dirname;

		//merge between default and specify:
		global.cfg = _.merge({},
			require(pathFwk +'/'+ projectConfigFile), //shoud be exist!
			utils.fileExist(pathFwk +'/'+ projectConfigLocalFile) && require(pathFwk +'/'+  projectConfigLocalFile),
			utils.fileExist(pathPrj +'/'+ projectConfigFile) 			&& require(pathPrj +'/'+ projectConfigFile),
			utils.fileExist(pathPrj +'/'+ projectConfigLocalFile) && require(pathPrj +'/'+  projectConfigLocalFile)
		);

		global.cfg.pkg = require(pathPrj +'/'+ packageJson);
		global.cfg.fromFwk = false;

		//reconfigure folders:
		var relativePathFrom = path.relative(config.dirname, __dirname +'/..')  +'/';
		var relativePathTo = path.relative(__dirname +'/..', config.dirname)  +'/';
		if(relativePathFrom === '/'){
			relativePathFrom = '';
			relativePathTo = '';
			global.cfg.fromFwk = true;
		}

		global.cfg.folders.fwk = pathFwk;
		//global.cfg.loader.folders.relativePathFrom = relativePathFrom;
		//global.cfg.loader.folders.relativePathTo = relativePathTo;
		//global.cfg.loader.folders.www = relativePathTo + global.cfg.loader.folders.www;
		//global.cfg.loader.folders.bower = relativePathFrom + global.cfg.loader.folders.bower;
		//global.cfg.loader.folders.build = relativePathFrom + global.cfg.loader.folders.build;
		//global.cfg.loader.folders.temp = relativePathFrom + global.cfg.loader.folders.temp;
		//global.cfg.loader.folders.screens = relativePathFrom + global.cfg.loader.folders.screens;
		//global.cfg.loader.folders.loadings = relativePathFrom + global.cfg.loader.folders.loadings;


	} catch (e){
		console.logRed(e);
		utils.exit(1);
	}

	//validations of compatibilities of configs
	if (global.cfg.compress && !global.cfg.loader.bower['lz-string']) {
		console.logRed('LOADER: Compress option active, but library lz-string not present');
		utils.exit(1);
	}
	//

	//save gitVersion on package.json
	if(!gutil.env.testMode){
		git.long(function (str) {
			global.cfg.pkg.gitVersion = str;
			fs.writeFileSync(packageJson, JSON.stringify(global.cfg.pkg, null,'\t') , {encoding: 'utf8'});
		});
	}

	//include others tasks on this folder
	requireDir('.', {recurse: true});
};