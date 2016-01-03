# project-config

_Configuracion a nivel proyecto, en la raiz del mismo._


### package.json
* name: Nombre del proyecto, debe seguir las reglas de package.json tipico (solo caracteres validos, sin espacios, etc)
* version: Se mostrara en la consola de la app y te servira para tracking. Mantener con nomenclatura [semver] (http://semver.org/), ya que se contempla mecanismo de update segun version.

### project-config.json

**Notas:**
* **No modificar `project-config.json` del _builder_**
* Indicar la primera app, si el nombre es distinto a "app", indicarlo con "firstApp"


Este es la configuracion por defecto de todos los proyectos, de querer cambiar algun valor hacerlo en el `project-config.json` de tu proyecto.

```javascript
{
	"ip": "127.0.0.1",
	 /* ip donde se publicaran los servidores, con 0.0.0.0 se publica en todas y se puede acceder desde la LAN */

	"compress": false,
	/* si se encuentra la libreria lz-string, podes comprimir las apps. */

	"ports": {
	/* puertos de los servers */
		...
		"template": 9002
		/* de uso interno, para desarrollo de templates */
	},

	"setGitVersionOnPackage": false,
	/* actualiza el package.json con el hash del ultimo commit */

	"autoprefixer": ["ie 10","android 4","chrome 42","ff 27","ios 7","opera 19","safari 7"],
	/* genera los prefijos css (--webkit, --ms, etc) automaticamente segun versiones configuradas aqui. */

	"appCache":{
		"active": false,
		"filename": "",
		/* nombre particular, si no, le pondra automaticamente el del proyecto */
		"ext": ".cache",
		"files": ["dist/**/*"],
		/* seleccion de archivos a incluir */
		"options": {
			"hash": true,
			"preferOnline": false,
			"network": ["http://!*", "https://!*", "*"]
		}
	},
	/* genera un manifest.cache automaticamente con todos los archivos del proyecto */

	"app": {
		"release": true,
		/* esto mismo a nivel app, minificando y otras tareas mas */

		"firstApp": "app",
		/* primera app que va a lanzar, es requerido, tiene que saber por donde empieza el flujo */

		"site": "http://",
		/* el site se pondra automaticamente en el footer */

		"folders": {
			"www": "www",
			"build": "build",
			"dist": "dist",
			"temp": ".tmp"
		},
		/* configuracion de folders, si necesitas cambiarle el nombre, directamente desde aqui */

		"compatibilityMatrix": {
			"ie": [9.9,10.9],
			"firefox": [23.9,25.9],
			"android": [3.9,3.9],
			"chrome": [17.9,18.9],
			"chromeMobile": [3.9,3.9],
			"safari": [6.0,6.0],
			"ios": [6,6]
		},
		/* seteo de minimo y recomendado por cada browser, menos del minimo da error (panic) y recomienda updatear o usar otro (ver "text"), deberia haber correlaccion con autoprefixer */

		"consoleError": [
			"Error unknown",
			"..."
		]
		/* Errores falsos para mostrar en la consola y confundir */
	},

	"cordova":{
		"active": false,
		/* si es del tipo cordova el proyecto, active deberia ser true */
		"global": false,
		/* false = usa el cordova build-in, true = usa el instalado en global via npm  */

		"folder": "cordova/",
		"www": "cordova/www/",

		"isDevice": false,
		/* NO CAMBIAR, ni setear, lo hara automaticamente */

		"files": {
			"index": "index-cordova.html"
		},
		"platform": {
			"android": {
				"keypass": "provisoryKey1",
				"storepass": "provisoryKey1"
			}
		}
		/* parametros segun plataforma */
	},
	/* utilizacion de cordova para generar proyecto hibrido */

	"loader": {
		"name": "WEBAPP BUILDER",
		"version": "1.0.0",
		"release": true,
		"loading": 1,
		/* 7 opciones */

		"compatibilityFirst": "...",
		/* primer chequeo de compatibilidad, metodos nativos */

		"files": {
			"index": "index.html"
		},

		"folders": {...},
		/* configuracion de folders */

		"viewport": "...",
		/* settings del elemento meta: viewport */

		"contentSecurity": "...",
		/* settings del elemento meta: content-security */

		"bower": {
			"platform": {
				"version": "1.3.0",
				"js-dev": ["platform/platform.js"],
				"js-prod": ["platform/platform.min.js"],
				"generate-js": true
			},
			...
		},
		/* componentes a usar (solo para _loader_), si no se quiere alguno de los por default, en el config del proyecto setearle null. Tambien soporta la generacion de los minificados si es que la libreria no lo provee, usar "generate-js": true */

		"text": {...}
		/* todos los textos del loader (no soporta i18n) */
	}
}
```
