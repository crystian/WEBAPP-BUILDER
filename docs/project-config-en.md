# project-config

## ... translating in progress ...

_Configuración a nivel proyecto, en la raíz del mismo._


### package.json
* name: Nombre del proyecto, debe seguir las reglas de package.json típico (solo caracteres válidos, sin espacios, etc.)
* version: Se mostrara en la consola de la app y te servirá para tracking. Mantener con nomenclatura [semver] (http://semver.org/), ya que se contempla mecanismo de update según versión.

### project-config.json

**Notas:**
* **No modificar `project-config.json` del _builder_**
* Indicar la primera app, si el nombre es distinto a "app", indicarlo con "firstApp"


Este es la configuración por defecto de todos los projects, de querer cambiar algún valor hacerlo en el `project-config.json` de tu project.

```javascript
{
	"ip": "127.0.0.1",
	 /* ip donde se publicaran los servidores, con 0.0.0.0 se publica en todas y se puede acceder desde la LAN */

	"compress": false,
	/* si se encuentra la librería lz-string, podes comprimir las apps. */

	"ports": {
	/* puertos de los servers */
		...
		"template": 9002
		/* de uso interno, para desarrollo de templates */
	},

	"setGitVersionOnPackage": false,
	/* actualiza el package.json con el hash del ultimo commit */

	"autoprefixer": ["ie 10","android 4","chrome 42","ff 27","ios 7","opera 19","safari 7"],
	/* genera los prefijos css (--webkit, --ms, etc) automáticamente según versiones configuradas aquí. */

	"contentEditable": false,
	/* con este flag podes hacer que el contenido textual sea editable, util para conocer dimenciones y demas */

	"appCache":{
		"active": false,
		"filename": "",
		/* nombre particular, si no, le pondrá automáticamente el del proyecto */
		"ext": ".cache",
		"files": ["dist/**/*"],
		/* selección de archivos a incluir */
		"options": {
			"hash": true,
			"preferOnline": false,
			"network": ["http://!*", "https://!*", "*"]
		}
	},
	/* genera un manifest.cache automáticamente con todos los archivos del proyecto */

	"app": {
		"release": true,
		/* esto mismo a nivel app, minificando y otras tareas más */

		"firstApp": "app",
		/* primera app que va a lanzar, es requerido, tiene que saber por dónde empieza el flujo */

		"site": "http://",
		/* el site se pondrá automáticamente en el footer */

		"folders": {
			"www": "www",
			"build": "build",
			"dist": "dist",
			"temp": ".tmp"
		},
		/* configuración de folders, si necesitas cambiarle el nombre, directamente desde aquí */

		"compatibilityMatrix": {
			"ie": [9.9,10.9],
			"firefox": [23.9,25.9],
			"android": [3.9,3.9],
			"chrome": [17.9,18.9],
			"chromeMobile": [3.9,3.9],
			"safari": [6.0,6.0],
			"ios": [6,6]
		},
		/* seteo de mínimo y recomendado por cada browser, menos del mínimo da error (panic) y recomienda updatear o usar otro (ver "text"), debería haber correlación con autoprefixer */

		"consoleError": [
			"Error unknown",
			"..."
		]
		/* Errores falsos para mostrar en la consola y confundir */
	},

	"cordova":{
		"active": false,
		/* si es del tipo cordova el proyecto, active debería ser true */
		"folder": "cordova/",
		"www": "cordova/www/",
		"isDevice": false,
		/* NO CAMBIAR, ni setear, lo hará automáticamente */

		"files": {
			"index": "index-cordova.html"
		},
		"platform": {
			"android": {
				"keypass": "provisoryKey1",
				"storepass": "provisoryKey1"
			}
		}
		/* parámetros según plataforma */
	},
	/* utilización de cordova para generar proyecto hibrido */

	"loader": {
		"name": "WEBAPP BUILDER",
		"version": "1.0.0",
		"release": true,
		"loading": 1,
		/* 7 opciones */

		"compatibilityFirst": "...",
		/* primer chequeo de compatibilidad, métodos nativos */

		"files": {
			"index": "index.html"
		},

		"folders": {...},
		/* configuración de folders */

		"viewport": "...",
		/* configuración del elemento meta: viewport */

		"contentSecurity": "...",
		/* configuración del elemento meta: content-security */

		"bower": {
			"platform": {
				"version": "1.3.0",
				"js-dev": ["platform/platform.js"],
				"js-prod": ["platform/platform.min.js"],
				"generate-js": true
			},
			...
		},
		/* componentes a usar (solo para _loader_), si no se quiere alguno de los por default, en el config del proyecto setearle null. También soporta la generación de los minificados si es que la librería no lo provee, usar "generate-js": true */

		"text": {...}
		/* todos los textos del loader (no soporta i18n) */
	}
}
```

