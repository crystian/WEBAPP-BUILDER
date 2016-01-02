# WEBAPP BUILDER!

**_El framework para los amigos!_**

TODO
[Español](http://), [English](http://)

## TL;DR Version:

Este framework te permite ahorrar incontable cantidad de horas en la automatizacion, bootstrap y temas tipicos de una nueva [web app](https://en.wikipedia.org/wiki/Web_application)/SPA (Single Page Application), esto es para aquellos que quieren/necesitan agilidad y velocidad de desarrollo, este es el objetivo de este framework. #needForSpeed! #agile

### Features:

* **Todo el codigo de la app termina en un unico archivo _solido_ por app!**, yes just a request!
* Genera un **loader** (solido) que ocupa menos 50k (con todas las libs base, para luego traerse cada app)
* Mientras baja las apps muestra un bonito loading (7 opciones, pure CSS)
* LIBS precargadas en el loader: platform, es6-promise (requeridas); opcionales: fastClick, jquery, lz-string
* El archivo final por cada app puede estar comprimido (by lz-string)
* Preprocessors (included):
  * CSS: [Sass](http://sass-lang.com/), [Less](http://lesscss.org/), [Stylus](http://stylus-lang.com/);
  * JS: [TypeScript](http://www.typescriptlang.org/), [CoffeeScript](http://coffeescript.org/);
  * HTML: [Jade](http://jade-lang.com/)
* Deteccion de browser y compatibilidad (seteable via browser y version)
* Generacion de sprites automaticamente.
* Preparado para [cordova](http://cordova.apache.org/).
* Minificado de librerias que no lo esten.
* Agregado automatico de cada archivo nuevo en el projecto (script/link), tanto en modo **dev** como **dist**.
* Modo **release** para minificar y ocultar info.
* Otros: Analytics, deteccion de languages, appcache, y mucho, mucho mas.

Este framework es totalmente "opinated" (dictatorial?), si lo haces como el framework te propone vas a poder de disfrutar de sus features sin perder tiempo en cosas mas "triviales", solo te vas a dedicar a codear tu web app/SPA!


**NOTAS:**
* El concepto o abstraccion detras de este framework es distinto al que proponen varios (para que se entienda rapido), lo mas cercano puede ser [Yeoman](http://yeoman.io/) (y sus generators), el cual te arma el Scafolding (andamios) con toda la automatizacion abierta para que quites o agregues a gusto. Este framework es mas proximo a un "patron" en ves de una solucion para la automatizacion, con lo cual te fuerza a trabajar respetando ciertas reglas (muy simples) y gracias a esto te provee soluciones de automatizacion como tambien de bootstrap/boilerplate (loader, compatiblidad, compresion, y un largo etc).
* **Para ansiosos:** Como logra todo esto que promete?: Gracias a archivos _metadata_ (muy simples), que configuran al resto de los archivos, tanto individuales como grupales.
* Orientado a projectos nuevos sobre todo, pero tambien se pueden adaptar.

--

## Extended Version:

_Continuando con el TL;DR ..._

Este framework cuenta con numerosos temas tipicos solucionados y deliciosos features, esto ahorraria facil 4 semanas de trabajo full time e incluso mas (from the scratch)

### _aboutIt():_
Este proyecto fue una extraccion de otro mas grande que luego de un tiempo me di cuenta que seria ideal separar las aguas y dejar el loader y temas de automatizacion listo para otros proyectos y no solo para el que fue creado. De ese momento a hoy paso mas de 1 año y fueron tres versiones, donde los saltos de las mejoras son cuantiosos entre cada version y me anime a hacerlos porque vi que realmente me servia a pesar del tiempo que llevara, espero que te sea tan util como a mi.

---






## PENDIENTES

* Documentacion
* Cordova
* Installler
* Mas tests


# No leer lo de abajo, estoy refactorizando la doc






















--

## Tasks:

TODO REVIEW
### From Root (loader):

* `gulp config` Genera archivo config.js con toda la configuracion del loader & project
* `gulp build:loader` Tarea por defecto. Build rapido, sin base/bower, solo build del loader
* `gulp full:loader` Bower y build completo
* `gulp serve:loader` Server directo del directorio de desarrollo (www), usando a 'template-empty' como app (cambiar desde project-active.json)
* `gulp css:loader`
* `gulp test` Test via nightmare, principalmente user-agents, validacion de compatibilidad, etc
* `gulp release` Es un full pero con tests, recomendado antes de una release de la app producto.

### From App:

* `gulp full` todo el proceso de building, incluyendo sin cache
* `gulp default` procesa todo el proyecto, pero no el loader ni preprocessors, usa cache
* `gulp css` force para generar el css, especial para un watcher
* `gulp cssw` watcher para css 
* `gulp clearCache` de imagenes
* `gulp genAppCache` genera el manifest de cache
* `gulp optimizeImages` todas las imagenes de la carpeta `build`
* `gulp serve` server en modo dev directo al proyecto
* `gulp serve:build` server del dir build
* `gulp loader` genera el loader y lo deja en la carpeta `build`
* `gulp serve:api` server de api (a modo de ejemplo para templates/angular-full)
* `gulp a` run an android

---

## Instrucciones de uso

### Conceptos:

**WEBAPP-BUILDER (aka: BUILDER):** Este mismo proyecto (del readme), donde esta toda la magia.

**PROJECT:** Es la carpeta creada con el _instalador_ (o de manera manual), el BUILDER maneja mas de un proyecto.

**APPs:** Son SPAs, con los cuales se generan archivos solidos. Puede contener mas de una por proyecto.

----





CONTINUAR:

 debe ser una carpeta la cual no tiene que tener modifiaciones.

 , solo es necesario indicar cual es la app inicial.


La idea es de un wrapper, el projecto nuevo deberia estar en su carpeta dentro **APPFACTORY**.

Hay un template que es la base de las apps y tambien sirve para testear el funcionamiento del loader.

Luego de bajar el repo e instalar los modulos hacer la instalacion con `node installer` (copia template a nueva carpeta y algunos ajustes menores), ver _Recipe_ 

La instalacion creara tres archivos de configuracion: `project-config.json`, `project-config-local.json` en la carpeta nueva y `project-config-local.json` en el root. La idea es sobreescribir las variables al principal config (`./project-config.json`) y mantener una herencia. Las variables de configuracion tendran prioridad en este orden:   
`project-config.json` <- `project-config-local.json` <- `PROJECT/project-config.json` <- `PROJECT/project-config-local.json`   
(OjO, mantener estructura), para el "config" ver esa seccion.

La instalacion tambien creara un archivo `project-active.json`, la unica funcion que tiene es determinar que projecto es el activo (folder), esto es util para configuraciones con mas de un projecto en el mismo APPFACTORY, por default ya setea el creado con el installer.

La animacion del loader es css puro (con una linea de html), para agregar otras animaciones, hacerlo en la carpeta loading, agregar el siguiente numero y crear loading.html y scss, luego en el config poner el numero de template a utilizar y finalmente subir al repo de APPFACTORY.

**NOTES:**

* Al momento de crear el repositorio, crearlo en la carpeta del projecto nuevo (projectCode) que creo el installer, tambien el installer modifico el gitignore, se puede subir como no al repositorio de APPFACTORY. Esto permite tener los dos projectos anidados y en distintos repos.

### Config:

Toda la configuracion disponible esta en `./project-config.json`, y como comente antes, funciona como herencia. Los archivos `-local` son solo locales y estan ingnorados en el repo (utiles para configuraciones de la workstation).
Recordar que solo hay que modificar el que esta dentro del proyecto y no el de APPFACTORY

**Ejemplo:**
./project-config.json: loader.release=true y en PROJECT/project-config.json: loader.release=false, el valor que va a llegar en cfg de gulp sera "false"

#### Variables importantes a mencionar:

* "name": nombre de la app que se usara y mostrara en los logs
* "version": mantener con nomenclatura semver (http://semver.org/), ya que se contempla mecanismo de update segun version
* "ip": ip local en la que se levantaran los servers (con 0.0.0.0 se publica en todas y se puede acceder desde la LAN)
* "release": eso mismo, minifica todo y hace completamente todas las tareas, sin usar caches
* "compress": Comprimir la data
* "firstApp": Primera app que va a lanzar, es requerido, tiene que saber por donde empieza
* "cordova": Cordova instalado, creara un archivo: index-cordova.html
* "isCordovaDevice": Uso interno, si es del archivo index-cordova.html sera true, si no, siempre false.
* "debugZoneActive": Muestra en pantalla una zona de debug, usando loader.debugAdd o loader.debug
* "folders": {}: configuracion de folders a usar, soporta expresiones
* "compatibilityFirst": Sera el retorno de una funcion, es lo primero que hace para saber si sera compatible, testea que existan los objetos que espera usar, se avisa al usuario (incompatibleByFeatures)
* "compatibilityMatrix": nombre del browser y array de compatibilidades,
	* primer valor: menores a este seran absolutamente incompatibles, se avisa al usuario (incompatibleByDiag)
	* segundo valor: desde el primero hasta este seran semi-compatibles, con funcionalidades reducidas y demas, se avisa al usuario (semiIncompatible), mayores a este son compatibles.
	* Si no encuentra el browser, lo deja en estado semi-compatible y avisa al usuario (semiIncompatible).
	* **NOTE:** Avisa al usario con un simple "alert".
* "autoprefixer": deberia haber correlaccion con compatibilityMatrix, son los prefijos automaticos para los css generados de sass
* "analytics.installed": instala analytics haciendo primeros request de API
* "analytics.active": activacion de analytics, puede estar instalado pero no activo.
* "analytics.*": datos para analytics
* "mixpanel": Igual a analitics
* "consoleError": mensajes dummy para enganiar a usuarios malicioso
* "loader.release": buildeara en modo release SOLO EL LOADER
* "loader.loading": Animacion template que utilizara la landing (numerico, ver instrucciones de uso)
* "loader.viewport": configuracion del meta de html
* "loader.text": todos los textos de la app (no soporta i18n por ahora)
* "loader.bower": componentes a usar (solo para loader), si no se quiere alguno de los por defalt, en el config del proyecto setearle null. Tambien soporta la generacion de los minificados si es que la libreria no lo provee, usar "generate-js": true

**NOTES:**

1) El archivo **config.js** se genera automaticamente, **no deberia subirse al VCS**  
2) Si se modifican los archivos de configuracion (`project-config*.json`), es necesario hacer un `gulp full:loader` o `gulp config` (para generar el config.js)


### Injections:

Toda la magia depende de estos archivos de "configuracion", que le dicen a la app tanto en modo dev como en release, donde y como estan los archivos a incluir, esto es la columna vertebral de este sistema.

* PROJECT/apps.json: Contiene un array con el nombre de las SPAs (folder) dentro de "apps" (e.g. APP1)
* PROJECT/APP1/app.json: Contiene un array con informacion de cada uno de los archivos a incluir al levantar esa app (en este caso: APP1)
 
#### Formato:

``` javascript
file: {
	'file': 'file.css',		//extension define the flow, can be tipicals and file for preprocessor, automaticaly determine with one will be use
	'active': 'true',		//it will eval this field
	'path': 'www',			//it can be a statement, and it will be evaluated
	//'min': 'file.min.css',//file name final for minificated file, just use it if you want another name, by default is 'min.'+ext
	'linter': true,			//if you want to lint, will not apply for libraries
	'autoPrefix': true,		//auto prefix when source is active
	'overwrite': true,		//specially for libs, just make it once
	'minificated': false,	//if it is a lib for don't re do the minifcation
	'makeMin': false,		//it should be create a minificate version
	'genSprite': true,		//generate sprite
	'ignore': false,		//ignore on dev time, request by request
	'replaces': {
			'original': {	//modificate orginal version, combine con minificate 
				'normal': [],
				'min': []
			},
		'pre': [			//pre minificatedd
			//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
		],
		'post': [			//post minificatedd
			//['/(\'build\'.*\\:[ ]?)(\\w*)/', '$1true']
		]
	}
}
```

En modo dev hace request secuencial de cada recurso y la tarea doMagic (gulp), hace exactamente eso y convierte todo en un "simple" json, con todo lo necesario.

---

## Installation

### Requisitos

* Node/npm
* Gulp (via npm)
* Bower (via npm)
* [Git](http://git-scm.com/downloads)
* [Graphics Magick](http://www.graphicsmagick.org/download.html)

**Opcionales:**

* Cordova (via npm)
* [Android SDK](https://developer.android.com/sdk/index.html#Other) (para cordova)
* [Java](https://www.java.com/en/download/manual.jsp) (para cordova)
* [Ant](http://ant.apache.org/bindownload.cgi) (para cordova)
* [Maven](https://maven.apache.org/) (para cordova)

**NOTE**:

Es necesario que todo este en el path, para ayudarte en esto creen un bat (windows 7+) que lo hace, fijate: config-path.bat !ojo que pisa el path que tenias!

### Recipe:

1. Clonar repo APPFACTORY:
	`git clone https://github.com/crystian/WEBAPP-BUILDER.git`
	
2. Ingresar en APPFACTORY e instalar dependencias de building para node: `npm i`
	- Note: (en windows da un error que no puede instalar "weak/python", no te preocupes)

3. Build de loader: `gulp full:loader`

4. Instalar con `node installer`
	- Si selecionas cordova tenes que tenerlo instalado en el path previamente.
	- Con este hermoso wizard instalas lo que necesitas para el proyecto y lo deposita en el Project Code que hayas puesto (crea la carpeta con ese nombre)
	
5. TEMPLATE o PROJECT
	- Ingresar a template/project
	- Instalar dependencias de node y bower: `npm i` y `bower i`
	- Buildear `gulp full` (si no instalas GM, comentar en magic.js: "engine: 'gm',")

6. Desde APPFACTORY, levantar server `gulp serve:loader` y comprobar: [http://127.0.0.1:9000/loader](http://127.0.0.1:9000/loader)
	-Deberia verse template (si hiciste el paso 5 en template)
	
7. Desde PROJECT comprobar servers con: `gulp serve` [http://127.0.0.1:9000/loader](http://127.0.0.1:9000/loader) y gulp `serve:build` [http://127.0.0.1:9001](http://127.0.0.1:9001)

#### MAC:

We need instal a script, ios-deploy: `sudo npm i -g ios-deploy`<br>
If you have some trouble about permissions, you can try set all permissions on cordova folder `sudo chmod -R a+rwx cordova/`<br>
For android create enviroment variable ANDROID_HOME point to android sdk folder, ex in mac:<br>
`sudo nano ~/.bash_profile`<br>
and add this line:<br>
`export ANDROID_HOME=/Users/crystian/Documents/eclipse/ADT/sdk` (with your path of course)


---

## Guideline

### Folders/files

#### APPFACTORY

* `project-*` relate a project
* `installer.js` is the executable for install a new Project
* `config-path.bat` just for win, configure all paths, the easy way
* `/loader` all loader modules
	* `/loading` there are severals loadings animations, the number is correlated with param on config
	* `config.js` auto generated (do not modify), see 'config' section.
	* `index.html` auto generated too (do not modify), do not save it on your repo
	* `index.tpl.html` template for 'index.html'
* `/vendors` just for bower source
* `/tasks` all gulp tasks
	* *.* all tasks only for **LOADER**
	* `/project` task shared with loader and project, almost tasks for projects would be here
* `/template` is a complete project as sample
	* `/tasks/tasks.js` tasks just for project (punctually, note generic, for generic you will use `/tasks/project`)
	* `/vendors/`
		* `/bower_components` auto generated with bower
		* `/theme` libs of third part, it would be save on your repo
		

#### Sprites

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


### gulp tasks
* nomenclature: action:what

---


### TOOLS & TIPS:

I use [Webstorm IDE](http://www.jetbrains.com/webstorm), and we recommend it, because I **love** it! <3

* [JShint options](http://www.jshint.com/docs/options)
* [DOM analytics and more](http://mir.aculo.us/dom-monster)
* [RWD on the browser](http://lab.maltewassermann.com/viewport-resizer) or firefox
* [Markdown cheatsheet](http://assemble.io/docs/Cheatsheet-Markdown.html)
* [Android sign](https://github.com/crystian/androidSign)

---

## Pendientes:
* mejorar tiempos de gulp (ver doMagic con js sin uglify solo para remover comments)
* unificate gulpfiles.js
* test with Electron, check i18n
* cordova: replace de datos antes de build (versiones)
* folder dist con las versiones entregadas con release
* nightmare, revisar cada perfil
* weinre?
* test 
* ci
* pasar este doc a ingles
* i18n revisar

---

## CHANGELOG:

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

---

by Crystian, done by love for you <3!




cache para apps previamente cargadas
modificar orignal no preoducto cuando es tiene replaces.original
gutil.env.noMin  time
coliciones de nombres de productos
tener en cuenta que si usas el patron glob para una app con dos grupos, si uno de ellos crea un backup, el otro lo puede estar leyendo, debes ignorarlo con "!"
expresiones regulares con /
chequeo de mas de una vez el mismo file