# WEBAPP BUILDER!

**_El framework para los amigos!_**

TODO: [Español](http://), [English](http://)

## TL;DR Version:

Este framework te permite ahorrar incontable cantidad de horas en la automatizacion, bootstrap/boilerplate y temas tipicos de una nueva [Web app](https://en.wikipedia.org/wiki/Web_application)/SPA (Single Page Application), esto es para aquellos que quieren/necesitan agilidad y velocidad de desarrollo, este es el objetivo de este framework. #needForSpeed! #agile

### Features:

* **Todo el codigo de la app termina en un unico archivo _solido_ por app!**, yes just a request!
* Genera un **loader** (solido) "standalone" que ocupa menos 50k (con todas las libs base, para luego traerse cada app)
* Mientras baja las apps muestra un bonito loading (7 opciones, pure CSS)
* Preprocessors (included):
  * CSS: [Sass](http://sass-lang.com/), [Less](http://lesscss.org/), [Stylus](http://stylus-lang.com/);
  * JS: [TypeScript](http://www.typescriptlang.org/), [CoffeeScript](http://coffeescript.org/);
  * HTML: [Jade](http://jade-lang.com/)
* Deteccion de browser y compatibilidad (seteable via browser y version)
* Generacion de sprites automaticamente.
* Preparado para [cordova](http://cordova.apache.org/).
* Minificado de librerias que no lo esten.
* LIBS precargadas en el loader: platform, es6-promise; Opcionales: fastClick, jquery, lz-string
* El archivo final por cada app puede estar comprimido (by lz-string)
* Agregado automatico de cada archivo nuevo en el projecto (script/link), tanto en modo **dev** como **dist**.
* Modo **release** para minificar y ocultar info.
* Otros: Analytics, languages, appcache, y mucho, mucho mas.

Este framework es totalmente "opinionated" (dictatorial?), si lo haces como el framework te propone vas a poder de disfrutar de sus features sin perder tiempo en cosas mas "triviales", solo te vas a dedicar a codear tu web app/SPA!


**NOTAS:**
* El concepto o abstraccion detras de este framework es distinto al que proponen varios (para que se entienda rapido), lo mas cercano puede ser [Yeoman](http://yeoman.io/) (y sus generators), el cual te arma el Scafolding (andamios) con toda la automatizacion abierta para que quites o agregues a gusto. Este framework es mas proximo a un "patron" en vez de una solucion para la automatizacion. Con lo cual te fuerza a trabajar respetando ciertas reglas (muy simples) y gracias a esto te provee soluciones de automatizacion como tambien de bootstrap/boilerplate (loader, compatiblidad, compresion, y un largo etc).
* **Para ansiosos:** Como logra todo esto que promete?: Gracias a archivos _metadata_ (simples), que configuran al resto de los archivos, tanto individuales como grupales.
* Orientado a projectos nuevos sobre todo, pero tambien se pueden adaptar.

--

## Extended Version:

_Continuando con el TL;DR ..._

Este framework cuenta con numerosos temas tipicos solucionados y deliciosos features, esto ahorraria facil 4 semanas de trabajo full time e incluso mas (from the scratch)

### _aboutIt():_
Este proyecto fue una extraccion de otro mas grande que luego de un tiempo me di cuenta que seria ideal separar las aguas y dejar el loader y temas de automatizacion listo para otros proyectos y no solo para el que fue creado. De ese momento a hoy paso mas de 1 año y fueron tres versiones, donde los saltos de las mejoras son cuantiosos entre cada version y me anime a hacerlos porque vi que realmente me servia a pesar del tiempo que llevara, espero que te sea tan util como a mi.

---

## Tasks:

_Desde el proyecto, una vez conectado gulpfile.js_

* `gulp default` no esta seteado (seteale a tu criterio)
* `gulp full` (alias de buildFull) todo el proceso de building, incluyendo: loader y proyecto.
* `gulp css` fuerza la generacion de css
* `gulp js` fuerza la generacion de js
* `gulp html` fuerza la generacion de html
* `gulp watch` watcher del proyecto
* `gulp clearCache` de imagenes para la generacion de sprites
* `gulp serve` server en modo dev directo del proyecto
* `gulp serveDist` server del la carpeta "dist"
* `gulp runAndroid` si cordova esta configurado

Ver mas en: `Project.js`

---

## Instrucciones de uso

### Conceptos:

**DEV/DIST:** Modo dev es mientras trabajas y desarrollas la app, en modo "dist" es la version minificada y con todo listo para ser publicada, restando informacion, comentarios, etc

**WEBAPP-BUILDER (aka: BUILDER):** Este mismo proyecto (del readme), donde esta toda la magia, cuyo resultado es un "index.html", el contenido de esta carpeta no debe modificarse.

**LOADER:** Es un proyecto interno que termina generando un "index.html" configurado segun proyecto, con validaciones y demas.

**PROJECT:** Es la carpeta creada con el _instalador_ (o de manera manual), el BUILDER genera el index y lo termina copiando en el proyecto.

**APPs:** Son SPAs, con los cuales se generan archivos solidos. Puede contener mas de una por proyecto.

**METADATA:** Archivos `json` con informacion adicional sobre los archivos del proyecto y demas. **Tiene varios atributos ya cargados por defecto, solo deberias agregar en tu metadata lo que queres distinto de lo default.**

**TEMPLATES:** Eso mismo, con el cual el _instalador_ hace una copia para los nuevos proyectos.

--

### Configuracion / Metadata

Toda la magia depende de estos archivos de "configuracion", que le dicen a la app tanto en modo _dev_ como en _dist_, donde y como son los archivos a incluir, esto es la columna vertebral de este sistema.

Ejemplo:

* PROJECT/gulpfile.js: Este archivo "conecta" proyecto y builder
* PROJECT/project-config.json: Configuracion a nivel proyecto
* PROJECT/www/apps.json: Nombres de las apps/folders (["APP1", "APP2"])
* PROJECT/www/APP1/app.json: Configuracion de APP1 y sus archivos
* PROJECT/www/APP2/app.json: Configuracion de APP2 y sus archivos

#### `gulpfile.js`

Bien siemple, conecta con el builder, solo es necesario enviarle una instancia de gulp, y el directorio actual, de esta manera:
```javascript
var gulp = require('gulp');

require('../../tasks/boot').boot({
	gulp: gulp,
	dirname: __dirname
});
```
**Nota:** Podes agregar mas tasks de gulp ahi mismo.

#### `project-config.json` (y `project-config-local.json`)

El archivo principal de configuracion del _builder_ es `project-config.json` el cual tiene toda la posible configuracion, los proyectos usan este archivo y pueden redefinirlo (extend) simplemente con un `project-config.json` en la raiz de cada proyecto.
En algunos casos puede ser necesario redefinirlo y que no se quiera subir al repo (credenciales, etc), para esto crear un archivo llamado: `project-config-local.json` tanto en el proyecto como en el _builder_

El orden del `extend` es: `BUILDER/project-config.json` <- `BUILDER/project-config-local.json` <- `PROJECT/project-config.json` <- `PROJECT/project-config-local.json`

[Ver definicion de `project-config.json`](docs/project-config-es.md)

#### `apps.json`

Dentro de la carpeta `www` debe existir un `apps.json` con un array de strings con cada nombre de `app` (folder) a procesar (ejemplo: ["app1", "app2", "app3"])

#### `app.json`

Dentro de la carpeta que contiene a la app debe existir un `app.json` con un array de objetos de configuracion de grupos de archivos.

[Ver definicion de `app.json`](docs/app-es.md)


**NOTES:**

* El proceso genera el archivo `www.json` (uno por app), **no deberia subirse al VCS del proyecto**
* Si se modifican los archivos de configuracion (`project-config*.json`), es necesario hacer un `gulp full`
* En modo "dev" hace request secuencial de cada archivo del proyecto, en modo "dist", es solo un archivo por app (con css, js y html dentro).

--

### Prerequisitos:

* Node/npm
* Gulp (via npm)
* Bower (via npm)
* [Git](http://git-scm.com/downloads)
* [Graphics Magick](http://www.graphicsmagick.org/download.html) (para generacion de sprites)

**Opcionales:**

* [Android SDK](https://developer.android.com/sdk/index.html#Other) (para cordova)
* [Java](https://www.java.com/en/download/manual.jsp) (para cordova)
* [Ant](http://ant.apache.org/bindownload.cgi) (para cordova)
* [Maven](https://maven.apache.org/) (para cordova)

**NOTE**:
Es necesario que todo este en tu path.

### Instalacion

* Clonar: https://github.com/crystian/WEBAPP-BUILDER.git (`git clone http..`)
* Instalar dependencias: `npm install` desde `WEBAPP-BUILDER` (tomate 5', son varias)
	- Note: (en windows da un error que no puede instalar "weak/python", no te preocupes)
* Crear nuevo proyecto con `node createProject`
	- Con este hermoso wizard instalas lo que necesitas para el proyecto y lo deposita en el Project Code que hayas puesto (crea la carpeta con ese nombre)
* Una vez copiado el template, ingresar a ese folder y ejecutar: `npm i` y luego `bower i`
* Levantar el server en dev con: `gulp serve`, y chequear con el browser sobre la url que devuelve el comando.


### Sprites

Los sprites se generan automaticamente siguiendo este patron:

* CSS rule: Debe ser un background, aplicado con background-image, recomiendo aplicar a un div con el tamanio justo, ya que deberia soportar distintas densidades de pixeles, ejemplo:

	* Normal:
	``` css
		.kitten1 { background-image: url(../template/www/app/assets/img/sprite1/kitten1.png); }
	```

	* Retina:
	``` css
		@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {
			.kitten1 {
				background-image: url(../template/www/app/assets/img/sprite1/kitten1@2x.png);
			}
		}
	```

* Imagenes PNG en: PROJECTO/APP/assets/img/sprite*
TODO REVIEW: Replace?

---

## Pendientes:
* cordova: replace de datos antes de build (versiones)
* nightmare, revisar cada perfil
* test sobre loader
* ci
* pasar este doc a ingles
cache para apps previamente cargadas
chequeo de mas de una vez el mismo file
loading pluygins
---

## CHANGELOG:

03/01/16 v0.9.0
Rehecho completamente el sistema de automatizacion
TESTS! casi 200!
Ahora soportar globs y muchas mejoras mas.

15/10/13 v0.1.0
Todo actualizado
Proceso de gulp revisado y ajustado

15/10/08 v0.1.0
dependencias actualizadas

15/04/18 v0.0.5
mejoras sobre lo anterior, bootstrap, jquery y swiper removido y pasado al projecto

15/04/15 v0.0.4
!reestructuracion completa!, injecion dinamica de recursos segun stage con los app.json
wrapeo de projecto
muchismas cosas mas

14/03/15 v0.0.2
muchos cambios estructurales, integrando con app angular
soporte a request sincronos y asincronos :)

08/03/15
varios fixes y loaders added

23/02/15 v0.0.1
Terminado, primera version

01/02/15
Recuperando files y codigo de projecto languages gym para reutilizar en este

--

by Crystian, done by love for you <3!


---

gutil.env.noMin  time
coliciones de nombres de productos
tener en cuenta que si usas el patron glob para una app con dos grupos, si uno de ellos crea un backup, el otro lo puede estar leyendo, debes ignorarlo con "!"
hooks



TODO REVIEW:
* "debugZoneActive": Muestra en pantalla una zona de debug, usando loader.debugAdd o loader.debug
#### MAC:
We need instal a script, ios-deploy: `sudo npm i -g ios-deploy`<br>
If you have some trouble about permissions, you can try set all permissions on cordova folder `sudo chmod -R a+rwx cordova/`<br>
For android create enviroment variable ANDROID_HOME point to android sdk folder, ex in mac:<br>
`sudo nano ~/.bash_profile`<br>
and add this line:<br>
`export ANDROID_HOME=/Users/crystian/Documents/eclipse/ADT/sdk` (with your path of course)


