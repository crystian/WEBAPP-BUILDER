# LOADER API

Esta API provee de varias herramientas, datos del cliente y temas tipicos resueltos.  

---

## LOADER

### loader
_por donde todo comienza comienza_

* `.debug(string)`: si se esta en modo _dev_ y si esta seteando `debugZoneActive` en el `project-config.json`, muestra en pantalla el string. 
* `.debugAdd(string)`: igual a la funcion previa, pero no borra lo anterior.
* `.show()`: shortcut de `loader.loadingScreen.on()`
* `.hide()`: shortcut de `loader.loadingScreen.off()`

---

### loader.cfg

_variables seteadas y definidas en el bootstrap_

* `compatibility`: 0 = no compatible, 1 = semi compatible and 2 = compatible
* `connectionType`: 0 = without connection, 1 = bad connection and 2 good connection //just for cordova apps
* `debugZone`: elemento del DOM con esta zona
* `isDesktop`: set by loader
* `isDevice`: set by loader (can be with cordova or without it)
* `isLandscape`: detected by diag
* `isMobile`: set by diag, it needs a review
* `isPortraid`: detected by diag
* `isTouchDevice`: detected by diag, be careful, can not be real
* `lang`: detected by lang and settings
* `offline`: detected by diag.offline
* `online`: detected by diag.online
* `orientation`: 0 = portrait, 1 = landscape //detected by diag

_variables seteadas en el `project-config` y compartidas con el cliente via `loader.cfg`_

* `.analytics`
* `.appCache`
* `.compatibilityFirst`
* `.compatibilityMatrix`
* `.consoleError`
* `.cordova`
  * `.isDevice` (*1)
* `.debugZoneActive`
* `.firstApp`
* `.folders`
* `.isDist` (*1)
* `.mixpanel`
* `.name` (en package.json)
* `.release`
* `.showDeviceInfo`
* `.showSkeletor`
* `.site`: "http://"
* `.version`: "0.0.2" (en package.json)

*1) seteo automatico en el building

---

### loader.utils
_cinturon de herramientas_

* `.showSkeletor()` (ver [Skeletor](#skeletor))
* `.hideSkeletor()`
* `.toggleSkeletor(value)`: Toggle automatico o enviar valor booleano
* `.getExtensionFilename(filename)`: Desde una URL
* `.setExtensionFilename(filename, extension)`
* `.compress(data)`: retorna informacion comprimida (by [lz-string](https://github.com/pieroxy/lz-string))
* `.decompress(data)`: retorna informacion descomprimida (by [lz-string](https://github.com/pieroxy/lz-string))
* `.compareSemVer(ver1, ver2)`: Compara dos strings del tipo versionado ["semver"](http://semver.org), retorna el resultado: 0 = iguales, 1 = `ver1` es mayor, 2 = `ver2` es mayor
* `.showPanicError(message)`: remueve todo el DOM y deja solo el mensaje enviado.
* `.getRandom(max)`: Eso mismo, desde 0, `max` puede ser un `int` o `long` 
* `.getRandomInt(max)`: Igual al anterior, redondea a `int`
* `.getRandomRange(min, max)`
 
--

#### Skeletor
Mostrar u ocultar marcas visuales para comprender mejor el layout.  
**No es automatico, se debe generar el estilo manualmente.**  
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

---

### loader.xhr
_hablando con el server_

* `.requestApp(appName(*1), successFn, failFn)`: la primera app se define en el `project-config.json`, y si se quiere cargar otra, utilizar esta funcion.
* `.request(url)`: eso mismo, implentacion propia, devueve una promise
* `.requestJson(url)`: request y luego parseo
* `.requestMultipleAsync(requestsArray, options(*2))`: usa a promise.all, con lo cual ejecuta todas en paralelo, una vez que termina con la ultima resuelve la promise.  
* `.requestMultipleSync(requestsArray, options(*2))`: hace una secuencia de promises, una vez que termina con la ultima resuelve la promise. 
* `.requestAndSetJs(url)`: luego del request del archivo lo inserta en el DOM como contenido. 
* `.requestAndSetCss(url)`: idem.
* `.requestAndSetHtml(url, options(*2))`: idem *2. 
* `.getJsFile(url)`: luego del request lo inserta en el DOM como link (\<script>/\<link>).
 
*1) appName: Tener en cuenta que en el DOM luego tendra este ID el elemento agregado donde se mostrara la app.  
*2) options: `{appName: 'app', replace: false}`, para el caso de HTML, es opcional reemplazar o agregarlo. 

---

### loader.settings

_wrapper de localStorage_

* `.remove(itemId)`
* `.removeAlldata()`
* `.set(itemId, value)`: persiste en la [localStorage](localStorage.getItem(item)) strings, diccionarios o arrays.
* `.get(itemId)`: retorna un valor persistido.

---

### loader.loadingScreen
_generando una buena experiencia al user_


* `.on(callback)`: enciende el loading definido, luego finalizar la animacion, dispara el callback si esta definido.
* `.off(callback)`: apaga la animacion y dispara el callback cuando finaliza.
* `.toggle(callback, value)`: eso mismo, se puede fozar enviando el value.

---

### loader.diag
_deteccion y diagnostico del cliente_

* `.getInfo()`: retorna informacion del _browser_

---

### loader.diag.cordovaConnection
_si la app es del tipo cordova_

* `.checkConnection()`: retorna el tipo de conexion con valores provistos por _cordova_
* `.getType(status)`: resuelve el tipo con un dato mas amigable (`getType(checkConnection())`) 


---

### events

* `loaderFinished`: cuando termina de cargar el loader todas sus dependencias.
* `newVersionDetected`: cuando se encontro una nueva version de la app, esto te da oportunidad a hacer alguna migracion de datos. 
* `appOnline`: cuando se detecta el cambio de offline a online (solo para apps cordova).
* `appOffline`: a la inversa del anterior.

Usar de esta manera:
```javascript
  document.addEventListener('loaderFinished', function(){});
```

---

### terceros: mixpanel/analytics

Configuracion en `project-config.json`

---

### globales/shorcuts
_mas accesible_

* `byId(id)`: wrappeo de `document.getElementById()`.
* `byClass(className)`: retorna solo el primer elemento.
* `t(id, value)`: inserta un texto en el id dado.
* `h(id, value)`: inserta un html en el id dado.
* `hp(id, value)`: inserta un texto en un placeholder (input).
* `d()`: === `loader.debugAdd`

##### Array sobrecargado, se agrego:

* `[].find(field, key)`: busca y retorna un elemento con ese `field` y esa `key`
* `[].code(key)`: retorna el elemento de esa `key` en el `field`: `code`
* `[].shuffle`: mezcla el array.

---

**NOTES:**  
Solo menciono las funciones principales y no las de uso interno.
Dentro del loader y en la automatizacion, todo lo que comienze con underscore ("_") es del loader o de uso interno.  
