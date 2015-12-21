/**
 * Created by Crystian on 01/11/2015.
 */

var utils      = require('./shared/utils.js'),
		requireDir = require('require-dir'),
		_          = require('lodash'),
		git        = require('git-rev'),
		fs         = require('fs'),
		path       = require('path'),
		gutil      = require('gulp-util');

if(gutil.env.time){
	require('time-require');
}

exports.boot = function(config){
	if(!config.gulp){
		console.logRed('REMEMBER you need to send your gulp module with a config object!');
		utils.exit(2);
	}

	/**
	 * For others projects with its node_module project we need to inject its gulp,
	 * because there is a conflict; With that it needs to be global.
	 *
	 * Don't touch, it cost severals hours
	 */
	global.gulp = config.gulp;

	global.cfg = {};
	try {
		var packageJson            = 'package.json',
				projectConfigFile      = 'project-config.json',
				projectConfigLocalFile = 'project-config-local.json',
				pathFwk                = path.resolve(__dirname, '../') + '/',
				pathPrj                = config.dirname + '/';

		//merge between default and specify:
		global.cfg = _.merge(
			require(pathFwk + projectConfigFile), //shoud be exist!
			utils.fileExist(pathFwk + projectConfigLocalFile) ? require(pathFwk + projectConfigLocalFile) : {},
			utils.fileExist(pathPrj + projectConfigFile) ? require(pathPrj + projectConfigFile) : {},
			utils.fileExist(pathPrj + projectConfigLocalFile) ? require(pathPrj + projectConfigLocalFile) : {}
		);

		global.cfg.pkg = require(pathPrj + packageJson);
		global.cfg.fromFwk = false;
		global.cfg.isTemplate = false;
		global.cfg.offline = !!(gutil.env.offline);
		global.cfg.pathFwk = pathFwk;
		global.cfg.pathPrj = pathPrj;
		global.cfg.pathPrjBuild = global.cfg.pathPrj + global.cfg.app.folders.build + '/';

		//reconfigure folders:
		var relativePathFrom = path.relative(config.dirname, __dirname + '/..') + '/',
				relativePathTo = path.relative(__dirname + '/..', config.dirname) + '/';

		if(relativePathFrom === '/'){
			relativePathFrom = '';
			//relativePathTo = '';
			global.cfg.pathPrj = pathFwk + global.cfg.app.folders.template + '/';
			global.cfg.fromFwk = true;
		}

		//if it is template should use loader on raw mode
		if(relativePathTo.indexOf('templates\\') === 0){
			global.cfg.isTemplate = true;
			global.cfg.pathPrjBuild = global.cfg.app.folders.build + '/';
		}

		if(gutil.env.release){
			console.logWarn('*** RELEASE MODE ***');

			global.cfg.loader.release = true;
			global.cfg.app.release = true;
		}

		global.cfg.loader.folders = utils.addSlash(global.cfg.loader.folders);
		global.cfg.app.folders = utils.addSlash(global.cfg.app.folders);

	} catch (e) {
		console.logRed(e);
		utils.exit(1);
	}


	if(global.cfg.app.release && gutil.env.noMin){
		console.logRed('APPFACTORY: app.release and argument "noMin" is not compatible');
		utils.exit(2);
	}

	if(global.cfg.compress && !global.cfg.loader.bower['lz-string']){
		console.logRed('LOADER: Compress option is active, but library lz-string not present');
		utils.exit(2);
	}
	if(!global.cfg.loader.bower['es6-promise'] || !global.cfg.loader.bower['platform']){
		console.logRed('LOADER: It must use platform and es6-promise, don\'t remove them.');
		utils.exit(2);
	}
	//

	//save gitVersion on package.json
	if(!gutil.env.testMode && global.cfg.setGitVersionOnPackage){
		git.long(function(str){
			global.cfg.pkg.gitVersion = str;
			fs.writeFileSync(packageJson, JSON.stringify(global.cfg.pkg, null, '\t'), {encoding: 'utf8'});
		});
	}

	//include others tasks on this folder
	requireDir('.', {recurse: true});
};
