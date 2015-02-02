# LANGUAGES GYM by Crystian & Eliminado
## WORKSTATION & AMBIENT
---

GULP SIN TERMINAR!
solo hecho en la base




@deprecate:

## TASKS WITH GRUNT:
`grunt` defaul task is `release` (without version, just build in folder `Common`)

### Generate a new version:
We use a [Semantic Versioning](http://semver.org) convention.

`grunt mayor`  (ex: 1.0.0)<br>
`grunt minor`  (ex: 0.1.0)<br>
`grunt patch`  (ex: 0.0.1)<br>
`grunt build`  build without new version, etc, faster than `release`<br>
`grunt sassfixer`  convert automatically sass to css in app/styles folder and prefixer (for everyone doesn't use Webstorm)<br>
`grunt serve`  Turn on a local server and open default browser with it<br>
`grunt openBuild` Make and open browser of build folder<br>
`grunt open` Open last build (folder)<br>
`grunt android` = `grunt a` Run on device connected (without release)<br>
`grunt aw` Build with Weinre!<br>
`grunt remoteDev` remote debug with chrome in device (previusly you need to `grunt serve`)<br>
    * Check USB debug mode in your device<br>
    * It will try discover the ip, if does not work put your public ip in localProperties.json<br>

?#### REVIEW:
?`grunt adt` Prepare directory to work directly with ADT, faster than build, but BECAREFUL! this modify files, once finish with ADT ensure undo with:<br>
?`grunt unadt` Undo ADT<br>

## tips:
* You can see the skeletor with app.utils.showSkeletor() (hide* and toggle*)

---

## AMBIENT: _how to configure your workstation_

_On windows edit and re-use `config.bat`, maybe do not need install ruby, adt, graphicsMagick, others, check iT_

* Install ruby (with installer from [website](http://rubyinstaller.org/))
* Install SASS `gem install sass` (after ruby)
* Install GraphicsMagick v17 (or 19 but, I'm not sure it is working with gmsmith), this is for sprites and compress images
* Install [ADT](http://developer.android.com/sdk/index.html), bundle option
* Install SVN client like tortoise (with console line client), test if it work with "svn" command in your console
* Download project from svn
* Go to path where the project was downloaded
* Install [nodeJS](http://nodejs.org/)
* Install Grunt: `sudo npm i grunt-cli -g` _(note: i == install)_
* Install Cordova: `sudo npm i cordova -g`
* Install Bower: `sudo npm i bower -g`
* Install karma: `sudo npm i karma -g`

* create (or edit) file: localProperties.json in the root of project, with this template:<br>
	`{"ip": "10.0.1.2", "so": "Win", "storepass": "", "keypass": ""}`

We use [Webstorm IDE](http://www.jetbrains.com/webstorm), and we recommend it, because we **love** it! <3 (how to configure, see below)

### Mac:
We need instal a script, ios-deploy: `sudo npm install -g ios-deploy`<br>
If you have some trouble about permissions, you can try set all permissions on cordova folder `sudo chmod -R a+rwx cordova/`<br>
For android create enviroment variable ANDROID_HOME point to android sdk folder, ex in mac:<br>
`sudo nano ~/.bash_profile`<br>
and add this line:<br>
`export ANDROID_HOME=/Users/crystian/Documents/eclipse/ADT/sdk` (with your path of course)

### PC:
After descompress ADT, put in your enviroment variable this new one:
`ANDROID_HOME f:\1-WORKSPACE\IDE\ADT\sdk\` (with your path of course)

### Optionals:
Modificate grunt.cmd/sh, add this parameter into node: `--stack_size=80`
[more info](http://stackoverflow.com/questions/17285486/changing-max-stack-size-for-grunt-task)

---

## TOOLS & TIPS:
* [JShint options](http://www.jshint.com/docs/options)
* [DOM analytics and more](http://mir.aculo.us/dom-monster)
* [RWD on the browser](http://lab.maltewassermann.com/viewport-resizer) or firefox
* [Markdown cheatsheet](http://assemble.io/docs/Cheatsheet-Markdown.html)

---

## TOOLS:

## WEBSTORM:
### [PLUGINS](http://www.jetbrains.com/webstorm/webhelp/plugins-2.html) NEEDED:
* File Watchers
* Karma

### PLUGINS RECOMMENDED:
* AngularJs (included)
* Apache Config
* CodeGlance
* NodeJS
* MarkDown (for read this document)

**NOTE:** Some of this configurations doesn't need because we save in a .idea shared folder configuration in SVN

### SASS:
Settings -> File Watchers<br>
- Add Watcher, select SCSS<br>
- Scope: project files<br>
- Program: Mac: /usr/local/bin/node ,Win: F:\1-WORKSPACE\Nodejs\node.exe<br>
- Arguments: Mac: /usr/local/bin/grunt lessfixer ,Win: "F:\1-WORKSPACE\Nodejs\node_modules\grunt-cli\bin\grunt" "lessfixer"<br>
- WD: $FileDir$<br>
- Output: emtpy<br>

### KARMA:
?Ensure karma are intalled _(tip: crear con: `karma init karma.conf.js`)_.<br>
?With contextual over karma.conf.js you can create an "executor", select "create 'karma.conf.js'" <br>
?Indicate where is node, karma (globaly) and the conf file.

### GRUNT:
Create an app nodeJS<br>
- node interpreter: node.exe/sh<br>
- node paremeters:<br>
- wd: project source (client)<br>
- javascript file: grunt (NodeJs\node_modules\grunt-cli\bin\grunt)<br>
- app parameters:<br>
You can set a shortcut key!, we recommend it! (cmd/ctr+ f11)

### NOTEs:
I summit all files just in case of thouble with dependencies.
Sign is on cert, if you want to make another one, you can make it with this [repo](https://github.com/crystian/androidSign)


get transcript http://www.youtube.com/api/timedtext?v=f-77xulkB_U&lang=en

---

by Crystian, done by love for you <3!
