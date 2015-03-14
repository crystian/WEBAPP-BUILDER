# POWER LOADER!
---
### Que es este coso?

Este proyecto pretender ahorrar tiempo de desarrollo, es una especie de seed o boilerplate, especialmente hecho para el bootstrap de una nueva app, dejando todo lo basico y constante listo.

Cuenta con deliciosos features y temas solucionados tipicos, esto ahorraria facil 2 semana de trabajo full time e incluso mas.

Intente que sea lo mas simple posible, espero que asi sea para vos crystian del futuro y otros coleguillas de mucha confiaza (si llegaron a este codigo, seguro les tengo mucha confianza)

Este proyecto es una extraccion de otro mas grande que luego de un tiempo me di cuenta que seria ideal separar las aguas y dejar el loader listo para otros proyectos y no solo para el que fue creado (languagesgym/subtitulame).

Tiempo estimado de desarrollo de todo esto, con multiples pruebas y demas: 3 meses en tiempo no full time.

---

## Tasks:

* `gulp serve` server directo del directorio de desarrollo (www)
* `gulp serve:build` server del dir build
* `gulp build:fast` Tarea por defecto. Build rapido, sin base/bower, solo build
* `gulp build:full` & `gulp full` Bower y build completo
* `gulp release` es un full pero con tests de user-agents y otros de compatibilidad, recomendado antes de una release de la app producto.
* `gulp css` force para generar el css, especial para un watcher
* `gulp servew` serve con watch de config e index.tpl, vuelve a ejectuar el `make:base`

## Features:

* **Todo el producto termina en un unico archivo!**
* LIBS: platform (requerida), bootstrap, fastClick, jquery, lz-string, swiper (opcionales)
* Todo ocupa menos 400k, mientras baja el archivo y siguientes queda mostrandose un lindo loading
* Posibilidad de hacer distintos loading (CSS)
* Multiples request o solo uno, y este comprimido con lz-string
* Modo release y absolutamente minificado para ocultar info y otros
* Configuracion independiente y hererable
* Sistema de deploy con proyecto template
* Deteccion de browser (platform)
* Sistema de filtrado de compatibilidades
* Preparado y listo para cordova
* Autominificado de librerias que no lo contengan
* Test de UserAgent y compatibilidades
* Preparado como proyecto independiente y actualizable
* Otros modulos: Analytics, loading screens, deteccion de languages, otros.

## Instrucciones de uso

La idea es de un wrapper, todo el contenido del loader, estara en la carpeta LOADER, a su vez contiene un template de un proyecto (AppTemplate) que se copia en el parent en la instalacion (`node installer`), con esto quedan los archivos listos para ser modificados, salvo la carpeta LOADER que seguira siendo otro proyecto de otro repo.

La instalacion creara dos archivos de configuracion. La idea es sobreescribir las variables al principal config y mantener una herencia. Las variables de configuracion tendran prioridad en este orden: ./gulp-config-local.json < ./gulp-config.json < LOADER/gupl-config.json (OjO, mantener estructura), para el "config" ver esa seccion.

La animacion del loader es css puro (con una linea de html), para agregar otras animaciones, hacerlo en la carpeta loading, agregar el siguiente numero y crear loading.html y scss, luego en el config poner el numero de template a utilizar.


**NOTES:**

1) Al subir el proyecto a un VCS no subir la carpeta LOADER (en git esta ignorado ya), ya que habra actualizaciones y mejoras sobre el proyecto LOADER.

2) Puede haber mejoras en el futuro en la carpeta AppTemplate y sera necesario ejecutar un `node installer`, para esto hacer un backup previo de los archivos y hacer un merge manual.

### Config:

Toda la configuracion disponible estan en los gulp-config.json, estos tienen este orden de prioridad: ./gulp-config-local.json < ./gulp-config.json < LOADER/gupl-config.json

* gulp-config (LOADER): Contiene todas las variables de configuracion del proyecto y del loader.
* gulp-config (proyecto): Contendra las variables que modifican al del LOADER solo agregar las que van a tener una diferencia.
* gulp-config-local: no se persistira en un VCS, su uso principal es para las variables locales del dev, como paths, claves, etc.

**Ejemplo:**
gulp-config (LOADER): loader.release=true y en gulp-config (proyecto): loader.release=false, el valor que va a llegar en cfg de gulp sera "false"

#### Variables importantes a mencionar:

* "ip": ip local en la que se levantaran los servers (con 0.0.0.0 se publica en todas y se puede acceder desde la LAN)
* "compress": Comprimir la data (combinar con loader.oneRequest)
* "cordova": Cordova instalado, creara un archivo: index-cordova.html
* "isCordovaDevice": Uso interno, si es del archivo index-cordova.html sera true, si no, siempre false.
* "compatibilityFirst": Sera el retorno de una funcion, es lo primero que hace para saber si sera compatible, testea que existan los objetos que espera usar, se avisa al usuario (incompatibleByFeatures)
* "compatibilityMatrix": nombre del browser y array de compatibilidades,
	* primer valor: menores a este seran absolutamente incompatibles, se avisa al usuario (incompatibleByDiag)
	* segundo valor: desde el primero hasta este seran semi-compatibles, con funcionalidades reducidas y demas, se avisa al usuario (semiIncompatible), mayores a este son compatibles.
	* Si no encuentra el browser, lo deja en estado semi-compatible y avisa al usuario (semiIncompatible).
	* **NOTE:** Avisa al usario con un simple "alert".
* "analytics.installed": instala analytics haciendo primeros request de API
* "analytics.active": activacion de analytics, puede estar instalado pero no activo.
* "analytics.*": datos para analytics
* "autoprefixer": deberia haber correlaccion con compatibilityMatrix, son los prefijos automaticos para los css generados de sass
* "consoleError": mensajes dummy para enganiar a usuarios malicioso
* "loader.release": buildeara en modo relese solo al loader
* "loader.oneRequest": creara un archivo unico con los 3 tipos de contenido (html, css y js) llamado "magic", se combina con compress y crea un archivo compacto
* "loader.loading": Animacion template que utilizara la landing (numerico, ver instrucciones de uso)
* "loader.viewport": configuracion del meta de html
* "loader.text": todos los textos de la app (no soporta i18n por ahora)
* "loader.bower": componentes a usar, si no se quiere alguno de los por defalt, en el config del proyecto setearle null. Tambien soporta la generacion de los minificados si es que la libreria no lo provee, usar "generate-js": true

#### config.js

Este archivo se genera automaticamente con `gulp full`, basado en los configs, no deberia subirse al VCS

**NOTES:**

Si se modifican los archivos de configuracion (gulp-config.json), es necesario hacer un `gulp build:full` (para generar el config.js)


## Installation

### Requisitos

* Node/npm
* Gulp
* Bower
* Git
* Ruby

**Opcionales:**

* Cordova
* Android SDK (para cordova)
* Java (para cordova)
* Ant (para cordova)
* Maven (para cordova)
* PhantomJs (tests)

**NOTE**:
Es necesario que todo este en el path, para ayudarte en esto creen un bat (windows) que lo hace, fijate: config-path.bat !ojo que pisa el path que tenias!

### Steps:

* Crear carpeta donde estara el proyecto
* Dentro de esta, clonar este repo, se tiene que llamar "LOADER": https://github.com/crystian/LOADER.git<br>
	`git clone https://github.com/crystian/LOADER.git LOADER`
* Ingrear a carpeta LOADER
* Instalar dependencias de node: `npm i`
	(en windows da un error que no puede instalar "weak", no te preocupes)
* Deploy/instalacion de carpetas: `node installer`
	Esto te arma la estructura necesaria pra el proyecto "wrapeandolo"
	Con este hermoso wizard instalas lo que necesitas para el proyecto.
	Si selecionas cordova tenes que tenerlo instalado en el path previamente.
* Hacer un build completo: `gulp build:full`


## Pendientes:

### revisar:
* offline - cordova
* i18n - cordova
* nightmare, cada perfil
* loaderFinished

### TODO:
* appcache
* weinre
* test
* ci
* si no se instala bootstrap, instalar normalized
* pasar este doc a ingles
* i18n

## Guideline
### gulp tasks
* nomenclature: action:what


---

## CHANGELOG:

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
