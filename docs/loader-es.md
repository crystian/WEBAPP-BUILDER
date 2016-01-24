# LOADER API

Esta API provee de varias herramientas, datos del cliente y temas típicos resueltos.  

---

## LOADER

### loader
_donde todo comienza_

* `.debug(string)`: si se está en modo _dev_ y si esta seteando `debugZoneActive` en el `project-config.json`, muestra en pantalla el string. 
* `.debugAdd(string)`: igual a la función previa, pero no borra lo anterior.
* `.show()`: shortcut de `loader.loadingScreen.on()`
* `.hide()`: shortcut de `loader.loadingScreen.off()`

---

### loader.cfg

_variables seteadas y definidas en el bootstrap_

* `.compatibility`: 0 = no compatible, 1 = semi compatible, 2 = compatible
* `.connectionType`: 0 = sin conexión, 1 = conexión mala, 2 = buena conexión //solo para aplicaciones cordova
* `.debugZone`: elemento del DOM con esta zona
* `.isDesktop`: detectado por _loader_
* `.isDevice`: detectado por _loader_ (puede ser con o sin cordova)
* `.isLandscape`: detectado por _diag_, siempre actualizado
* `.isMobile`: detectado por _diag_ (TODO: necesita ser revisado)
* `.isPortraid`: detectado por _diag_, siempre actualizado
* `.isTouchDevice`: detectado por _diag_, cuidado, puede no ser acertado
* `.lang`: detectado por _lang_ y _settings_
* `.offline`: detectado por diag.offline
* `.online`: detectado por diag.online
* `.orientation`: 0 = portrait, 1 = landscape (detectado por _diag_)

_variables seteadas en el `project-config` y compartidas con el cliente vía `loader.cfg`_

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
* `.name` (desde package.json)
* `.release`
* `.showDeviceInfo`
* `.showSkeletor`
* `.site`
* `.version` (desde package.json)

*1) seteo automatico en el building

---

### loader.utils
_cinturón de herramientas_

* `.showSkeletor()` (ver [Skeletor](#skeletor))
* `.hideSkeletor()`
* `.toggleSkeletor(value)`: Toggle automático o enviar valor booleano
* `.getExtensionFilename(filename)`: Desde una URL
* `.setExtensionFilename(filename, extension)`
* `.compress(data)`: comprime datos y lo retorna (by [lz-string](https://github.com/pieroxy/lz-string))
* `.decompress(data)`: descomprime datos y lo retorna (by [lz-string](https://github.com/pieroxy/lz-string))
* `.compareSemVer(ver1, ver2)`: Compara dos strings del tipo versionado ["semver"](http://semver.org), retorna el resultado: 0 = iguales, 1 = `ver1` es mayor, 2 = `ver2` es mayor
* `.showPanicError(message)`: remueve todo el DOM y deja solo el mensaje enviado.
* `.getRandom(max)`: Eso mismo, desde 0, `max` puede ser un `int` o `long` 
* `.getRandomInt(max)`: Igual al anterior, redondea a `int`
* `.getRandomRange(min, max)`
 
--

#### Skeletor
Mostrar u ocultar marcas visuales para comprender mejor el layout.  
**No es automático, se debe generar el estilo manualmente.**  
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
**NOTA:** En modo release, se elimina la funcionalidad.

---

### loader.xhr
_hablando con el server_

* `.requestApp(appName(*1), successFn, failFn)`: la primera app se define en el `project-config.json`, y si se quiere cargar otra, utilizar esta función.
* `.request(url)`: eso mismo, implementación propia, devuelve una promise
* `.requestJson(url)`: request y luego parseo
* `.requestMultipleAsync(requestsArray, options(*2))`: usa a promise.all, con lo cual ejecuta todas en paralelo, una vez que termina con la última resuelve la promise.  
* `.requestMultipleSync(requestsArray, options(*2))`: hace una secuencia de promises, una vez que termina con la última resuelve la promise. 
* `.requestAndSetJs(url)`: luego del request del archivo lo inserta en el DOM como contenido. 
* `.requestAndSetCss(url)`: idem.
* `.requestAndSetHtml(url, options(*2))`: idem *2. 
* `.getJsFile(url)`: luego del request lo inserta en el DOM como link (\<script>/\<link>).
 
*1) appName: Tener en cuenta que en el DOM luego tendrá este ID el elemento agregado donde se mostrara la app.  
*2) options: `{appName: 'app', replace: false}`, para el caso de HTML, es opcional reemplazar o agregarlo. 

---

### loader.settings

_wrapper de localStorage, recomendado para guardar settings de la app_

* `.remove(itemId)`
* `.removeAlldata()`
* `.set(itemId, value)`: persiste en la [localStorage](localStorage.getItem(item)) strings, diccionarios o arrays.
* `.get(itemId)`: retorna un valor persistido.

---

### loader.loadingScreen
_generando una buena experiencia al user_

* `.on(callback)`: enciende el loading definido, luego finalizar la animación, dispara el callback si está definido.
* `.off(callback)`: apaga la animación y dispara el callback cuando finaliza.
* `.toggle(callback, value)`: eso mismo, se puede forzar enviando el value.

---

### loader.diag
_detección y diagnóstico del cliente_

* `.getInfo()`: retorna información del _browser_

---

### loader.diag.cordovaConnection
_si la app es del tipo cordova_

* `.checkConnection()`: retorna el tipo de conexión con valores provistos por _cordova_
* `.getType(status)`: resuelve el tipo con un dato más amigable (`getType(checkConnection())`) 

---

### eventos

* `loaderFinished`: cuando termina de cargar el loader todas sus dependencias.
* `newVersionDetected`: cuando se encontró una nueva versión de la app, esto te da oportunidad a hacer alguna migración de datos. 
* `appOnline`: cuando se detecta el cambio de offline a online (solo para apps cordova).
* `appOffline`: a la inversa del anterior.

Usar de esta manera:
```javascript
  document.addEventListener('loaderFinished', function(){});
```

---

### terceros: mixpanel/analytics

Configuración en `project-config.json`

---

### globales/shorcuts
_más accesible_

* `byId(id)`: wrappeo de `document.getElementById()`.
* `byClass(className)`: retorna solo el primer elemento.
* `t(id, value)`: inserta un texto en el id dado.
* `h(id, value)`: inserta un html en el id dado.
* `hp(id, value)`: inserta un texto en un placeholder (input).
* `d()`: === `loader.debugAdd`

##### Array sobrecargado:

* `[].find(field, key)`: busca y retorna un elemento con ese `field` y esa `key`
* `[].code(key)`: retorna el elemento de esa `key` en el `field`: `code`
* `[].shuffle`: mezcla el array.

---

**NOTES:**  
Solo menciono las funciones principales y no las de uso interno.  
Dentro del loader y en la automatización, todo lo que comienza con underscore ("_") es del loader o de uso interno.  
