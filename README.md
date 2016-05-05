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


[[Version en español / Spanish version](docs/readme-es.md)]


## TL;DR Version:

This framework allow you save several hours on the automatization, bootstrap/boilerplate and tipically issues on a new [Web app/SPA (Single Page Application)](https://en.wikipedia.org/wiki/Web_application), this is for who needs speed and agility on his products, this is the objective of this framework. #agile #needForSpeed


### Features:

* **All code of each app, will be an unique file (solid) by app**, yes just a request!
* It generates a **loader** (solid) "stand-alone" whose size is less than 50k with all base libraries (aka: Libs).
* While the app is loading, it shows a nice loading (7 options: pure CSS)
* Preprocessors (included):
 * CSS: [Sass](http://sass-lang.com/), [Less](http://lesscss.org/), [Stylus](http://stylus-lang.com/);
 * JS: [TypeScript](http://www.typescriptlang.org/), [CoffeeScript](http://coffeescript.org/);
 * HTML: [Jade](http://jade-lang.com/)
* Detection of browser and compatibiltie (configuration via browser and version)
* Sprites generated automatically.
* Prepare for [cordova](http://cordova.apache.org/).
* Minify of libraries (for libs aren't minified)
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

[![video, click to play](docs/img/presentation.jpg)](https://youtu.be/E76rpMsWFlU)

(in spanish with closed caption in english)

---

## Extended version:

_continuing with TL;DR and a simple language and ordered by relevance, as you like ..._

This framework has several typical issues about webapps fixed and has delicious features ([loader API](docs/loader-en.md)), it can save various weeks or more.

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
* [guide](#guide)
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

## Tasks:

#### Gulp tasks

* `gulp buildProject` (alias: `build`) fast build of your project.
* `gulp buildFull` (alias: `full`) all buildings are including: _loader_ and _project_ ("slower").
* `gulp css` preprocessors
* `gulp js` preprocessors
* `gulp html` preprocessors
* `gulp watch` watcher for your project it calls the preprocessors and others tasks
* `gulp serve` web server in _dev_ mode from the project folder.
* `gulp serveDist` web server from _dist_ folder.
* `gulp runAndroid` run the app on an android device (yeap, it is "cordova" app, you need to have the sdk and environment variables on your path, and a device connected on _dev_ mode, see (Prerequisites)[#Prerequisites])

More taks: `tasks/project/project.js`

**Optional params:**
* `--debug`: show info on _builder_.
* `--release`: force the release _mode_ although the `project-config` is setted on false.
* `--noMin`: force donn't use min versions, it is useful when you need to debuging.
* `--time`: show times of compile.
* `--testMode`: save on the project a temporal file called: _config.js_, useful for debuging.

#### Hooks:

If you need to do a custom tasks, you can use these hooks for get the stream and make your changes ([gulp](https://github.com/gulpjs/gulp)).

* hookPreBuildProject
* hookPostBuildProject
* hookPreDistProject
* hookPostDistProject

**Sample:**

```javascript
/* when the builder makes "dist" version, it runs this task before */
gulp.task('hookPreDistProject', function(cb){
	runSequence(
		'ngTemplateApp2',
		cb);
});

/* and this after */
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

* `'optimizeImages'`, gulp task for optimizate all images from "dist/img"
* `image.optimizeImages(ori, dest, _config)`, function for optimizate iamges, see config on the same function.
* `customs.ngTemplate(stream)`, function for angular apps: It generates a template.js ready for wil be included.

---

## Guide:

### Concepts:

**WEBAPP-BUILDER:** (aka: builder) This is this project, where all magic is here, the result of this project is a "index.html", **this folder doesn't should modify.**, you just need to clone this project from the repo, and it will use for your projects.

**LOADER:** It is an internal project for build de "index.html" configured by each project ([loader API](docs/loader-en.md))

**SOLIDS:** Unique files (json), with all code of your app: html, css and javascript.

**APPs:** These are your apps/SPAs (aka: apps), for each app would generate a _solid_ file.

**PROJECT:** This is your project; it contain your apps; The _builder_ will generate a index and after that it will copy this index file onto your project. This framework has a [wizard](#instalación-1) for create an empty project with several templates, but you can create the app from the scratch as I showed on the video.

**GULPFILE.js & BOOT.js:** For connect the projects with the builder, you should use `gulpfile.js` on your project and it needs to do a _required_ for the `tasks/boot.js` file into the builder, it can be relative or absolut. All automatizacion tasks was resolve on gulp.

**DEV/DIST:** Mode _dev_ is when your are working on your project on the _www_ folder, and _dist_ mode is with all resources minificated and all ready for be published (without logs, comments, etc).

**METADATA:**
All magic depends from these files (JSONs), it configures the app for _dev_ or _dist_ mode, how is each file to include on the project, this is the dorsal spine of this system, there are several attributes by default, you should add only attributes different than default if you want another result.

#### Structure of file system with metadata files:

![](https://docs.google.com/drawings/d/10MpC23l3Y4yr_FxCz9srtr1IGD0e5Dl5_-Yh21GIW0g/pub?w=559&h=431)

--

### Structure of file system

This is the builder with its more important files and a simple project as sample that it should be the stucture. After we do review on each option..

```
PROJECTS/
  ├─ WEBAPP-BUILDER/              = repo cloned, don't modify!
  │  ├─ loader/                   = all content will be part of index.html file.
  │  ├─ ...
  │  ├─ tasks/                    = gulp tasks for the loader and the projects
  │  │  ├─ ...
  │  │  ├─ project/               = just tasks for projects
  │  │  ├─ shared/                = tasks for projects and loader
  │  │  └─ boot.js                = initial file for gulp, ALL PROJECT MUST INCLUDE IT.
  │  └─ gulpfile.js               = for the "loader"
  ├─ other_project/               = others projecet not for this framework, just for demotrate compatibily.
  ├─ PROJECT1/                    = project based on builder
  │  ├─ build/                    = autogenerated
  │  ├─ dist/                     = autogenerated
  │  ├─ www/                      = your apps should be here
  │  │  ├─ myApp/                 = myApp is an app
  │  │  │  ├─ ...
  │  │  │  ├─ app.json            = metadata for each file on the myApp
  │  │  │  └─ www.json            = autogenerated
  │  │  └─ apps.json              = array of strings with each app, in this case it would be: '["myApp"]'
  │  ├─ gulpfile.js               = it should include a "WEBAPP-BUILDER/tasks/boot" from the builder
  │  ├─ package.json              = info and definitions about the project
  │  ├─ project-config.json       = builder's configuration about the project (it should be on your VCS)
  │  └─ project-config-local.json = builder's local configuration (it DOESN'T SHOULD BE on your VCS)
  └─ PROJECT2/                    = another project, based on builder.
     ├─ ...
     ├─ www/
     │  ├─ otherApp/
     │  │  ├─ ...
     │  │  └─ app.json            = in this case de actual app is: otherApp
     │  ├─ app2/
     │  │  ├─ ...
     │  │  └─ app.json
     │  └─ apps.json              = in this case should be: '["otherApp","app2"]'
     └─ ...

```
--

### Project configuration:

These files configure the project via metadata, and them should be exist on the project.

#### `gulpfile.js`

It file connect with the builder, just need to send a gulp instance and the actual folder, like this sample:
```javascript
var gulp = require('gulp');

var builderFolder = 'path/to/builder/absolute/or/relative/';

require(builderFolder + 'tasks/boot').boot({
	gulp: gulp,
	dirname: __dirname
});
```
**Note:** You can add other gulp tasks here


#### `project-config.json`
and `project-config-local.json`

This file is the main file for the _builder_, it has all posible configuration about your project and each app can refine it on its own folder.
Sometimes you need to refine it but you don't want to push it on the repo (credentials tipically), so, you can add another file called: `project-config-local.json`, you can create this file on your project or even on the builder (just ensure don't push it to your repo)

The order of _extend_ is: `BUILDER/project-config.json` -> `BUILDER/project-config-local.json` -> `PROJECT/project-config.json` -> `PROJECT/project-config-local.json`

[See definition `project-config.json`](docs/project-config-en.md)

#### `apps.json`

Into the `www` folder should exist an `apps.json` with an array of strings, each string should be an `app`, sample: ["app1", "app2", "app3"]); the `www` can change from project-config file.

#### `app.json`

On each `app` folder should exist an `app.json` with an array of object, each object we called "group" because it should has a group of files (or just one at least)

[See definition `app.json`](docs/app-en.md)


**NOTES:**

* The build process generates a `www.json` file (once per app), and it doesn't push on your VCS (for git it was ignore) 
* If you modify some configuration file (`project-config*.json`), you need to run `gulp full`
* On _dev_ mode, the chain of request is secuencial on each project, and on _dist_ mode just one file for app (with css, js and html included).

---

## Others:

### Sprites

The sprites would generate automatically following this pattern:

* CSS rule: Should be a background, using with `background-image`; I recomend using a div with the size, because it should support differents densities of pixeles, sample:

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

	* The images should be PNG and should be on this folder: PROJECT/APP/assets/img/sprite*

---

## Instalation & environment

### Prerequisites:

* [Node/npm](https://nodejs.org)
* Gulp (via npm, global)
* Bower (via npm, global)
* [Git](http://git-scm.com/downloads)
* [Graphics Magick](http://www.graphicsmagick.org/download.html) (for sprites), on Mac: `brew install graphicsmagick`.

**Optionals:**

* [Cordova](http://cordova.apache.org/) (via npm, global), if you use this feature, you need to have these components on your [path](https://en.wikipedia.org/wiki/PATH_(variable)):
	* [Android SDK](https://developer.android.com/sdk/index.html#Other)
	* [Java](https://www.java.com/en/download/manual.jsp)
	* [Ant](http://ant.apache.org/bindownload.cgi)
	* [Maven](https://maven.apache.org/)

##### MAC:

###### Cordova on iOS (aka: iPhone):
You need to install an script "ios-deploy": `sudo npm i -g ios-deploy`  
If you have some throuble with permision, you can try with `sudo chmod -R a+rwx cordova/`

###### Android:
Create environmet variables: ANDROID_HOME to android SDK.
**Sample:**
`sudo nano ~/.bash_profile`
Add this line:  
`export ANDROID_HOME=/Users/crystian/Documents/ADT/sdk`


**NOTEs:**
* Browsers compatibles: IE11, Chrome 42, Firefox 27, iOS 7, Android 4, Opera 19, Safari 7

### Instalation

* Clone: `git clone https://github.com/crystian/WEBAPP-BUILDER.git`, I recomend a empty folder, because your next project with this framework would be in parallel with it.
* Dependencies: `npm install` from `WEBAPP-BUILDER` (take a break, because there are several…)
	- On Windows give an error with "weak/python", don't worry.
* Create a project from some template with `node create`
	- With this beautiful wizard it will create the scafolding for you on the "Project name".
	- At the moment, these are the templates:
		- angular-empty: A simple angular app
		- angular-full: A project with two apps, it can help you to understand the way to use this framework.
		- angular-material: Project simple with [angular material](https://material.angularjs.org/latest/) installed.
		- empty: The most empty scaffolding for this framework.
* Once created, into the project folder run the dependencies with: `npm i` and after `bower i` (if you don't select it on the wizard)
* Run the dev server with: `gulp serve`, and check it with the url on your terminal.

---

If you need something in particular or found a bug, please use this git for tracker that one [issue](https://github.com/crystian/WEBAPP-BUILDER/issues), I know, all this appear complex but isn't it, is more complex than you do it now with out the framework.
I hope it will useful for you like it is for me, thank you!

---

MIT © 2016 [Crystian](https://github.com/crystian), done with love for you <3!
