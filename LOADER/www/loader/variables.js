/**
 * Created by Crystian on 2/11/2015.
 */
var _loaderCfg = {};


//default values for test:
_loaderCfg.analytics		= 1;
_loaderCfg.devLocal			= 1;//request by request, otherwise one json file
_loaderCfg.debugMode		= 1; //can be different that build, this show debugZone with info (debugAdd)
_loaderCfg.showDeviceInfo	= 1;
_loaderCfg.showSkeletor		= 1;
_loaderCfg.contentEditable	= 1;


//injected automatically:
_loaderCfg.compatibility= 0; // 0 = no compatible, 1 = con problemas, 2 = compatible
_loaderCfg.isDevice		= 0; // setter by loader
_loaderCfg.isDesktop	= 0; // setter by loader
_loaderCfg.isMobile		= 0; // setter by loader
_loaderCfg.isTablet		= 0; // setter by loader
_loaderCfg.orientation	= 0; // 0=portrait, 1=landscape
_loaderCfg.lang			= ''; //by diag and settings
_loaderCfg.isTouchDevice= false; //detected by diag
_loaderCfg.online		= true; //detected by diag.offline
_loaderCfg.offline		= !_loaderCfg.online; //detected by diag.offline
_loaderCfg.connectionType= ''; //0=without connection, 1=bad connection and 2 good connection
_loaderCfg.isLandscape	= 0; //detected by diag
_loaderCfg.isPortraid	= !_loaderCfg.isLandscape;


//others=
_loaderCfg.debugZone	= document.getElementById('debugZone');
