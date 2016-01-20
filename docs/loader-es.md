# LOADER

En el browser contamos con varias herramientas y temas tipicos resueltos. La gran mayoria de las funciones y herramientas del loader, _cuelgan_ del objeto **`loader`** en `window`

## Variables

Estas variables las setea el loader en el bootstrap, en `loader.cfg.*`:

* isDevice: set by loader
* isDesktop: set by loader
* compatibility: 0 = no compatible, 1 = semi compatible, 2 = compatible
* orientation: 0=portrait, 1=landscape //detected by diag
* isLandscape: detected by diag
* isPortraid: detected by diag
* isTouchDevice: detected by diag, be careful, can not be real
* isMobile: set by diag, need it a review
* isTablet: set by diag, need it a review
* lang: by lang and settings
* offline: detected by diag.offline
* online: detected by diag.offline
* connectionType: 0=without connection, 1=bad connection and 2 good connection //just for cordova apps
* release
* cordova.isDevice: just for cordova



## Tools:

TODO!



* "debugZoneActive": Muestra en pantalla una zona de debug, usando loader.debugAdd o loader.debug

--