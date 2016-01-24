# LOADER API

Esta API provee de varias herramientas, datos del cliente y temas tipicos resueltos.

## LOADER
### UTILS

#### Skeletor
Mostrar u ocultar marcas visuales para comprender mejor el layout.
No es automatico, se debe generar el estilo manualmente.
El mecanismo agrega el class "skeletor" al body, con lo cual, se debe agregar rules como las siguientes:

```css
/* scss */
.skeletor {
  .class1 {
    background-color: red;
  }
  div {
    border: 1px solid black;
  }
}
```
**NOTE:** En modo release, se elimina la funcionalidad.

##### Methods
* showSkeletor
* hideSkeletor
* toggleSkeletor
---

         cx: cache,
         za: handleCompress,
         compareSemVer: compareSemVer,
         getExtensionFile: getExtensionFile,
         setExtensionFilename: setExtensionFilename,
         //		scrollTo: scrollTo,
         getRandom: getRandom,
         getRandomInt: getRandomInt,
         getRandomRange: getRandomRange,

         showPanicError: showPanicError,
         setNewResourceByTag: setNewResourceByTag,
         setNewResourceById: setNewResourceById






NOTA: Dentro del loader y en la automatizacion, todo lo que comienze con underscore ("_") es del loader

La gran mayoria de las funciones y herramientas del loader, _cuelgan_ del objeto **`loader`** en `window`


## Variables

Estas variables las setea el loader en el bootstrap, en `loader.cfg.*`:

* isDevice: set by loader (can be with cordova or without it)
* isDesktop: set by loader
* compatibility: 0 = no compatible, 1 = semi compatible, 2 = compatible
* orientation: 0=portrait, 1=landscape //detected by diag
* isLandscape: detected by diag
* isPortraid: detected by diag
* isTouchDevice: detected by diag, be careful, can not be real
* isMobile: set by diag, it needs a review
* lang: by lang and settings
* offline: detected by diag.offline
* online: detected by diag.offline
* connectionType: 0=without connection, 1=bad connection and 2 good connection //just for cordova apps
* release
* fastclick (si esta activado)
* cordova.isDevice: just for cordova


utils.showPanicError


## Tools:

TODO!



* "debugZoneActive": Muestra en pantalla una zona de debug, usando loader.debugAdd o loader.debug

--