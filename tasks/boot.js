/**
 * Created by Crystian on 01/11/2015.
 */

var utils      = require('./shared/utils.js'),
    requireDir = require('require-dir'),
    _          = require('lodash'),
    git        = require('git-rev'),
    fs         = require('fs-extra'),
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
    global.cfg = _.defaultsDeep(
      utils.fileExist(pathPrj + projectConfigLocalFile) ? require(pathPrj + projectConfigLocalFile) : {},
      utils.fileExist(pathPrj + projectConfigFile) ? require(pathPrj + projectConfigFile) : {},
      utils.fileExist(pathFwk + projectConfigLocalFile) ? require(pathFwk + projectConfigLocalFile) : {},
      require(pathFwk + projectConfigFile) //shoud be exist!
    );

    global.cfg.pkg = require(pathPrj + packageJson);
    global.builderName = global.cfg.loader.name;
    global.cfg.app.name = global.cfg.pkg.name || global.cfg.app.name || 'WEBAPP-BUILDER-APP';
    global.cfg.app.version = global.cfg.pkg.version || global.cfg.app.version || '0.0.0';

    console.logGreen('BUILDING: ' + global.cfg.app.name + ' ' + global.cfg.app.version + ' ...');

    global.cfg.fromFwk = false;
    global.cfg.isTemplate = false;
    global.cfg.offline = !!(gutil.env.offline);
    global.cfg.pathFwk = pathFwk;
    global.cfg.pathPrj = pathPrj;
    global.cfg.pathPrjBuild = global.cfg.pathPrj + global.cfg.app.folders.build + '/';

    //reconfigure folders:
    var relativePathFrom = path.relative(config.dirname, __dirname + '/..') + '/',
        relativePathTo   = path.relative(__dirname + '/..', config.dirname) + '/';

    if(relativePathFrom === '/'){
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

      //force to use release options
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
    console.logRed(global.builderName + ': app.release and argument "noMin" is not compatible');
    utils.exit(2);
  }

  if(global.cfg.compress && !global.cfg.loader.bower['lz-string']){
    console.logRed(global.builderName + ' - LOADER: Compress option is active, but library lz-string not present');
    utils.exit(2);
  }
  if(!global.cfg.loader.bower['platform']){
    console.logRed(global.builderName + ' - LOADER: It must use platform, don\'t remove it please.');
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
