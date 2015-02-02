/**
* Created by Crystian on 10/18/2014.
*/
var _loaderCfg = {};

//Automatic by gulp, don't CHANGE it manually or I'LL CUT YOUR HANDS!!!
//WITHOUT SPACES!
_loaderCfg.isCordovaDevice= 0;
_loaderCfg.version		= '0.0.0';
	_loaderCfg.gaId			= 'UA-53990030-2';
	_loaderCfg.appName		= 'LanguagesGym';
	_loaderCfg.appId		= 'com.languagesgym';
	_loaderCfg.appInstallerWeb = 'com.languagesgym.web';
	_loaderCfg.analytics	= 0;
	_loaderCfg.devLocal		= 1;//request by request, otherwise one json file
	_loaderCfg.endpoint		= '10.0.1.2=9002/api';
//END by gulp

//injected automatically=
	_loaderCfg.api			= '//'+ _loaderCfg.endpoint;
_loaderCfg.compatibility= 0; //0 = no compatible, 1 = con problemas, 2 = compatible
_loaderCfg.isTouchDevice= false; //detected by diag
_loaderCfg.online		= true; //detected by diag.offline
_loaderCfg.offline		= !_loaderCfg.online; //detected by diag.offline
_loaderCfg.offline		= !_loaderCfg.online; //detected by diag.offline
	_loaderCfg.platform	= null; //detected by platformjs https=//github.com/bestiejs/platform.js
_loaderCfg.lang			= ''; //by diag and settings
_loaderCfg.isDevice		= 0; // setter by loader
_loaderCfg.isDesktop	= 0; // setter by loader
_loaderCfg.connectionType= ''; //0=without connection, 1=bad connection and 2 good connection


	_loaderCfg.user			= '';
	_loaderCfg.isLandscape	= 0;
	_loaderCfg.isPortraid	= 1;

//default values for test=
_loaderCfg.debugMode	= 1; //can be different that build, this show debugZone with info (debugAdd)
_loaderCfg.showDeviceInfo= 1;
_loaderCfg.showSkeletor	= 1;
_loaderCfg.contentEditable= 1;

//faltan llenar=
	_loaderCfg.isTablet		= 0;
	_loaderCfg.isMobile		= 0;

//others=
_loaderCfg.debugZone	= document.getElementById('debugZone');

