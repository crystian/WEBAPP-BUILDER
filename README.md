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
* `gulp build:fast` Tarea por defecto. Build rapido, sin bower, solo build
* `gulp build:full` Bower y build completo
* `gulp release` es un full pero con tests de user-agents y otros de compatibilidad, recomendado antes de una release de la app producto.
* `gulp css` force para generar el css, especial para un watcher
* `gulp servew` serve con watch de config e index.tpl, vuelve a ejectuar el `make:base`

**NOTAS:**

Si se modifican los archivos de configuracion (gulp-config.json), es necesario hacer un `gulp build:full`

## Config:
templates


## Requisitos

* Node/npm
* Gulp
* Bower
* Git
* Ruby

**Opcionales:**

* Cordova
* Java
* Ant
* Maven
* PhantomJs

**NOTE**:
Es necesario que todo este en el path, para ayudarte en esto creen un bat (windows) que lo hace, fijate: config-path.bat !ojo que pisa el path que tenias!

## Installation:

* Crear carpeta donde estara el proyecto
* Dentro de esta, clonar este repo, se tiene que llamar "LOADER": https://github.com/crystian/LOADER.git<br>
	`git clone https://github.com/crystian/LOADER.git LOADER`
* Ingrear a carpeta LOADER
* Instalar dependencias de node: `npm i`
	(en windows da un error que no puede instalar "weak", no te preocupes)
* Deploy/instalacion de carpetas: `node installer`
	Esto te arma la estructura necesaria pra el proyecto "wrapeandolo"
	Con este hermoso wizard instalas lo que necesitas para el proyecto.
	Si selecionas cordova tenes que tenerlo instalado previamente.
* Hacer un build completo: `gulp build:full`


## Pendientes:

### revisar:
* offline
* nightmare, cada perfil
* buscar esos inject asincronos del build, ver de que son y sincronizarlo

### TODO:
* appcache
* weinre
* test
* ci
* si no se instala bootstrap, instalar normalized

## Guideline
### gulp tasks
* nomenclature: action:what


---

## CHANGELOG:
23/02/15 v0.0.1
Terminado, primera version

01/02/15
Recuperando files y codigo de projecto languages gym para reutilizar en este

---

by Crystian, done by love for you <3!
