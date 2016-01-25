# WEBAPP BUILDER!
### **_A framework for friends!_**

[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/crystian/WEBAPP-BUILDER/master/LICENSE)
![](https://david-dm.org/crystian/WEBAPP-BUILDER.svg)

###### MASTER: 
[![Build Status](https://travis-ci.org/crystian/WEBAPP-BUILDER.svg?branch=master&style=flat-square)](https://travis-ci.org/crystian/WEBAPP-BUILDER?branch=master)
[![Build status](https://ci.appveyor.com/api/projects/status/tjrjsi1diw1pdie4/branch/master?svg=true&style=flat-square)](https://ci.appveyor.com/project/crystian/webapp-builder/branch/master)

###### DEV: 
[![Build Status](https://travis-ci.org/crystian/WEBAPP-BUILDER.svg?branch=dev&style=flat-square)](https://travis-ci.org/crystian/WEBAPP-BUILDER?branch=dev)
[![Build status](https://ci.appveyor.com/api/projects/status/tjrjsi1diw1pdie4/branch/dev?svg=true&style=flat-square)](https://ci.appveyor.com/project/crystian/webapp-builder/branch/dev)


[Version en español](docs/readme-es.md)


## TL;DR Version:

This framework allow you save several hours on the automatization, bootstrap/boilerplate and tipically issues on a new [Web app/SPA (Single Page Application)](https://en.wikipedia.org/wiki/Web_application), this is for who need speed and agility on his devs, this is the objective of this framework. #agile #needForSpeed


### Features:

* **All code of each app, will be an unique file (solid) by app**, yes just a request!
* It generate a **loader** (solid) "stand-alone" whose size is less than 100k with all base libraries (aka: Libs).
* While the app is loading, it shows a nice loading (7 options: pure CSS)
* Preprocessors (included):
 * CSS: [Sass](http://sass-lang.com/), [Less](http://lesscss.org/), [Stylus](http://stylus-lang.com/);
 * JS: [TypeScript](http://www.typescriptlang.org/), [CoffeeScript](http://coffeescript.org/);
 * HTML: [Jade](http://jade-lang.com/)
* Detection of browser and compatibiltie (configuration via browser and version)
* Sprites generated automatically.
* Prepare for [cordova](http://cordova.apache.org/).
* Minify of libraries are not.
* Libs preloaded: [platform](https://github.com/bestiejs/platform.js/); Opcionales: [fastClick](https://github.com/ftlabs/fastclick), [lz-string](https://github.com/pieroxy/lz-string)
* The final file can be compressed (por lz-string)
* New files will add to the project automatically, like script/link, in **dev** and **dist** mode.
* Mode **release** in order to minify and hide info.
* Others: Analytics, lenguages, appcache, and much!

![](docs/img/jake.gif)

This framework is "opinionated", if you use it as framework propose, you can enjoy with it and its features without waste time on trivial stuff, you only need to care about your web app/SPA!

**NOTES:**

* The main concept of abstraction behind it is different from others, the nearest project is [webpack](https://webpack.github.io/) but it is for app rather than components, on the other hand [Yeoman](http://yeoman.io/) and its generators build to you an scaffolding with all automatization open for you, where you can change it (add or remove task, etc). This framework is like a "pattern" rather than a automatization solution, it means you need to work with some rules (very simples), and regarding this the framework can resolve typical tasks easily, also get others features like loader, compatibilites, compress, and a long etc. The framework give you a skeleton that you need to fill with files.
* **For anxious:** How to fulfill these promises?: With metadata files (simples), That configure others files as individual and as groups.
* It is for new projects, but existing project can adapt.

---

### Presentation an sample from scratch
Fast sample about this framework from scratch

[![video, click to play](http://img.youtube.com/vi/gs1Q3m0--Xs/0.jpg)](docs/img/presentation.jpg)

(in spanish)

---

## Extended version:

_continuing with TL;DR and a simple language and ordered by relevance, as you like ..._

This framework has several typical issues about webapps fixed and has delicious features, it can save various weeks or more.

### _aboutIt():_
This project was an extraction of other bigger, than after the use I recognize that I can separate on two projects, my app and the "framework", for reuse easy on another projects. Since this moment to today, passed more than one year, and were three versions, and each version the improvements were greater, for example from grunt to gulp. It is very useful for my, I would like it useful for you.

Sorry for my poor english, I am working really hard to improve it.

---

## Table of content

* [TL;DR](#tldr-version)
	* [Features](#features)
	* [Extended version](#extended-version)
* [Tasks](#tasks)
	* [Gulp tasks](#gulp-tasks)
	* [Hooks](#hooks)
	* [Other tasks & auxiliares](#other-tasks--auxiliares)
* [Use instructions](#use-instructions)
	* [Concepts](#concepts)
	* [Structure of _file system_](#structure-of-file-system)
	* [Project configuration](#project-configuration)
		* [gulpfile.js](#gulpfilejs)
		* [project-config.json](#project-configjson) ([detail](docs/project-config-en.md))
		* [apps.json](#appsjson)
		* [app.json](#appjson) ([detail](docs/app-en.md))
* [Others](#others)
	* [Sprites](#sprites)
* [Instalation](#instalation)
	* [Prerequisites](#prerequisites)
	* [Instalation](#instalation-1)

---

## ... translating in progress ...

## Tasks:

#### Gulp tasks

* `gulp buildProject`, construcción (aka: build) del proyecto (rápido)
* `gulp buildFull` (alias: `full`) todo el proceso de building, incluyendo: _loader_ y _project_ ("lento").
* `gulp css` aplicación de preprocessors
* `gulp js` aplicación de preprocessors
* `gulp html` aplicación de preprocessors
* `gulp watch` watcher (observador (? ) del project para aplicar preprocessors u otras tasks
* `gulp serve` web server en modo _dev_ directo del proyecto
* `gulp serveDist` web server del directorio _dist_
* `gulp runAndroid` ejecuta la app en el teléfono android (si es una app "cordova", el SDK de android debe estar configurado en el path, y un device conectado en modo "dev")

Ver más en: `tasks/project/project.js`

**Argumentos opcionales:**
* `--debug`: muestra más info al momento de _buildear_.
* `--release`: fuerza a que sea en modo release, incluso aunque en el project-config este _seteado_ en false.
* `--noMin`: fuerza a no usar versiones min, útil para debugear.
* `--time`: muestra tiempos de ejecución.
* `--testMode`: guarda en el proyecto el archivo config.js, útil para debugear, lo usan los tests.

#### Hooks:

Si tenes que hacer tasks (altamente probable), podes utilizar estos hooks para poder "engancharte" en el flujo (aka: Stream) de [gulp](https://github.com/gulpjs/gulp).

* hookPreBuildProject
* hookPostBuildProject
* hookPreDistProject
* hookPostDistProject

**Ejemplo:**

```javascript
/* al hacer un "dist" esto ejecuta antes */
gulp.task('hookPreDistProject', function(cb){
	runSequence(
		'ngTemplateApp2',
		cb);
});

/* y esto después */
gulp.task('hookPostDistProject', function(cb){
	runSequence(
		'copyFonts',
		'copyData',
		'copyImgsApp',
		'copyImgsApp2',
		'optimizeImages',
		cb);
});
```

#### Other tasks & auxiliares

* `'optimizeImages'`, gulp task para optimiza todas las imágenes que estén dentro de "dist/img"
* `image.optimizeImages(ori, dest, _config)`, función para optimizar imágenes, indicar desde y hasta, ver config dentro de la función.
* `customs.ngTemplate(stream)`, función para apps angular: Genera template.js listo para ser incluido.

---

## Use instructions

### Concepts:

**WEBAPP-BUILDER:** (aka: builder) Este mismo proyecto donde está toda la magia, cuyo resultado entre otras cosas es un "index.html", **el contenido de este directorio no debe modificarse.**, solo se necesita un clon de este repositorio (aka: repo), servirá para N projects.

**LOADER:** Es un proyecto interno que termina generando el "index.html" configurado según proyecto, con validaciones y demás ([más info del loader](docs/loader-es.md))

**SOLIDOS:** Archivo único (json), con todo el código de la app: html, css y javascript.

**APPs:** Son Web apps/SPAs (aka: apps), con las cuales se generan archivos _sólidos_.

**PROJECT:** Es tu proyecto; Es el contenedor de las apps; El _builder_ genera el index y luego lo termina copiando en el project. El framework cuenta con un [wizard](#instalación-1) para la creación de projects (a partir de templates) o podes crearlo de manera manual.

**GULPFILE.js & BOOT.js:** Para conectar el project con el builder se debe hacer desde el `gulpfile.js` del project y debe hacer un _require_ de `tasks/boot.js` del builder, puede ser relativo o absoluto. Toda la automatización está resuelta con gulp.

**DEV/DIST:** Modo _dev_ es mientras trabajas y desarrollas la app en el directorio: _www_, en modo _dist_ es la versión minificada y con todo listo para ser publicada, restando información, logs, comentarios, etc.

**METADATA:**
Toda la magia depende de estos archivos de "configuración" (JSONs), que le dicen a la app tanto en modo _dev_ como en _dist_, donde y como son los archivos a incluir, esto es la columna vertebral de este sistema. **Tienen varios atributos ya cargados por defecto, solo deberías agregar en tu metadata lo que queres distinto de lo default.**

#### Conceptual structure:

![](https://docs.google.com/drawings/d/10MpC23l3Y4yr_FxCz9srtr1IGD0e5Dl5_-Yh21GIW0g/pub?w=559&h=431)

--

### Structure of file system

Esquema del builder con sus files más importantes, y projects de ejemplo de como debería ser la estructura. Luego veremos con mas profundidad cada opción.

```
PROJECTS/
  ├─ WEBAPP-BUILDER/              = repo clonado, no modificar!
  │  ├─ loader/                   = todo lo que será parte del archivo index.html final
  │  ├─ ...
  │  ├─ tasks/                    = tasks de gulp para el project como para el loader
  │  │  ├─ ...
  │  │  ├─ project/               = solo tasks para el project
  │  │  ├─ shared/                = entre el project y el loader
  │  │  └─ boot.js                = archivo principal de inicialización de gulp, todos los projects deben incluirlo
  │  └─ gulpfile.js               = propio del loader
  ├─ other_project/               = project no basado en el builder, solo para demostrar que se puede convivir con otros
  ├─ PROJECT1/                    = basado en builder
  │  ├─ build/                    = autogenerado
  │  ├─ dist/                     = autogenerado
  │  ├─ www/                      = las apps deben estar dentro
  │  │  ├─ myApp/                 = nombre de la app/directorio
  │  │  │  ├─ ...
  │  │  │  ├─ app.json            = metadata de los archivos de la app actual: myApp
  │  │  │  └─ www.json            = autogenerado
  │  │  └─ apps.json              = array de strings con nombres de cada app, en este caso: '["myApp"]'
  │  ├─ gulpfile.js               = debe conectar con el "tasks/boot" del builder
  │  ├─ package.json              = info y definición del project
  │  ├─ project-config.json       = configuración del builder sobre el project, debe estar en tu VCS
  │  └─ project-config-local.json = configuración local, NO DEBE subirse a tu VCS
  └─ PROJECT2/                    = otro ejemplo, basado en webapp-builder.
     ├─ ...
     ├─ www/
     │  ├─ otherApp/
     │  │  ├─ ...
     │  │  └─ app.json            = metadata de los archivos de la app actual: otherApp
     │  ├─ app2/                  = nombre de la app/directorio
     │  │  ├─ ...
     │  │  └─ app.json            = metadata de los archivos de la app actual: app2
     │  └─ apps.json              = en este caso: '["otherApp","app2"]'
     └─ ...

```
--

### Project configuration:

Estos son los archivos de configuración (metadata) que deben de existir en el project.

#### `gulpfile.js`

Conecta con el builder, solo es necesario enviarle una instancia de gulp, y el directorio actual de esta manera:
```javascript
var gulp = require('gulp');

var builderFolder = 'path/to/builder/absolute/or/relative/';

require(builderFolder + 'tasks/boot').boot({
	gulp: gulp,
	dirname: __dirname
});
```
**Nota:** Podes agregar más tasks de gulp ahí mismo.

#### `project-config.json`
y `project-config-local.json`

El archivo principal de configuración del _builder_ es `project-config.json` el cual tiene toda la posible configuración; Los proyectos usan este archivo y pueden redefinirlo (aka: extend) simplemente con un `project-config.json` en la raíz de cada proyecto.
En algunos casos puede ser necesario redefinirlo y que no se quiera subir al repo (credenciales, etc), para esto crear un archivo llamado: `project-config-local.json` tanto en el proyecto como en el _builder_ es soportado.

El orden del extend es: `BUILDER/project-config.json` -> `BUILDER/project-config-local.json` -> `PROJECT/project-config.json` -> `PROJECT/project-config-local.json`

[Ver definición de `project-config.json`](docs/project-config-es.md)

#### `apps.json`

Dentro del directorio `www` debe existir un `apps.json` con un array de strings con cada nombre de `app` (directorio) a procesar (ejemplo: ["app1", "app2", "app3"]); El `www` se puede cambiar desde folders/www en el project-config.

#### `app.json`

Dentro del directorio que contiene a la app debe existir un `app.json` con un array de objetos de configuración de grupos de archivos.

[Ver definición de `app.json`](docs/app-en.md)


**NOTES:**

* El proceso genera el archivo `www.json` (uno por app), **no debería subirse al VCS del proyecto** (ya ignorado para git)
* Si se modifican los archivos de configuración (`project-config*.json`), es necesario hacer un `gulp full`
* En modo _dev_ hace request secuencial de cada archivo del proyecto, en modo _dist_, es solo un archivo por app (con css, js y html dentro).

---

## Others:

### Sprites

Los sprites se generan automáticamente siguiendo este patrón:

* CSS rule: Debe ser un background, aplicado con background-image; Recomiendo aplicar a un div con el tamaño justo, ya que debería soportar distintas densidades de pixeles, ejemplo:

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

	* Las imágenes deben ser PNG y estar ubicadas en: PROJECT/APP/assets/img/sprite*

---

## Instalation

### Prerequisites:

* [Node/npm](https://nodejs.org)
* Gulp (vía npm, global)
* Bower (vía npm, global)
* [Git](http://git-scm.com/downloads)
* [Graphics Magick](http://www.graphicsmagick.org/download.html) (para generación de sprites), en Mac: `brew install graphicsmagick` puede alcanzar.

**Opcionales:**

* [Cordova](http://cordova.apache.org/) (vía npm, global), si usas este feature los siguientes puntos son requeridos, y todos en el [path](https://en.wikipedia.org/wiki/PATH_(variable)):
	* [Android SDK](https://developer.android.com/sdk/index.html#Other)
	* [Java](https://www.java.com/en/download/manual.jsp)
	* [Ant](http://ant.apache.org/bindownload.cgi)
	* [Maven](https://maven.apache.org/)

##### MAC:

###### Cordova con iOS (aka: iPhone):
Necesitas instalar un script "ios-deploy": `sudo npm i -g ios-deploy`  
Si tenes problemas con permisos, podes probar con `sudo chmod -R a+rwx cordova/`

###### Android:
Crear variable de ambiente: ANDROID_HOME apuntando al SDK.
**Ejemplo:**
`sudo nano ~/.bash_profile`
Agregar esta linea:  
`export ANDROID_HOME=/Users/crystian/Documents/ADT/sdk` (con tu path claramente)

**NOTA:** Browsers compatibles desde: IE11, Chrome 42, Firefox 27, iOS 7, Android 4, Opera 19, Safari 7

### Instalation

* Clonar: `git clone https://github.com/crystian/WEBAPP-BUILDER.git`, recomiendo en un directorio único, ya que los proyectos por default se crearan en paralelo a este.
* Instalar dependencias: `npm install` desde `WEBAPP-BUILDER` (tomate 5', son varias…)
	- En Windows da un error que no puede instalar "weak/python", no te preocupes.
* Crear nuevo proyecto desde algún template con `node create`
	- Con este hermoso wizard creas un nuevo project (directorio) depositándolo en el "Project name" que hayas puesto en paralelo al builder.
	- Hasta el momento los templates son estos:
		- angular-empty: La más simple de las aplicaciones angular
		- angular-full: Un project con dos apps, te puede servir para ver cómo se utiliza el framework
		- angular-material: Project simple con [angular material](https://material.angularjs.org/latest/) instalado.
		- empty: Eso mismo, el scaffolding básico para el framework.
* Una vez creado, ingresar al nuevo proyecto: `npm i` y luego `bower i` (si no lo seleccionaste en el wizard)
* Levanta el server en dev con: `gulp serve`, y chequear con el browser sobre la url que devuelve el comando en la consola.

---

Ante alguna necesidad o bug por favor levantar el [issue](https://github.com/crystian/WEBAPP-BUILDER/issues), todo esto parece complejo pero no lo es, como lo venís haciendo puede ser más complejo. Sinceramente espero que te sirva tanto como a mí, gracias.

---

MIT © 2016 [Crystian](https://github.com/crystian), done with love for you <3!
