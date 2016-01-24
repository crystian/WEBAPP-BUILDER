/**
 * Created by Crystian on 2/11/2015.
 */

//injected automatically on the app:
_loaderCfg.isDevice = 0; // set by loader
_loaderCfg.isDesktop = 0; // set by loader
_loaderCfg.compatibility = 0; // 0 = no compatible, 1 = semi compatible, 2 = compatible
_loaderCfg.orientation = 0; // 0=portrait, 1=landscape //detected by diag
_loaderCfg.isLandscape = 0; //detected by diag
_loaderCfg.isPortraid = 0; //detected by diag
_loaderCfg.isTouchDevice = 0; //detected by diag, be careful, can not be real
_loaderCfg.isMobile = 0; // set by diag
_loaderCfg.lang = ''; //by lang and settings
_loaderCfg.offline = 0; //detected by diag.offline
_loaderCfg.online = 1; //detected by diag.offline
_loaderCfg.connectionType = 2; //0=without connection, 1=bad connection and 2 good connection //just for cordova apps
