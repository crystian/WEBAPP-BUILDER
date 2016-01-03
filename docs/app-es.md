# app.json

_Configuracion por cada app_

App.json contiene un array de este objeto llamado "grupo", soporta [GLOB pattern](https://github.com/isaacs/node-glob), con lo cual podemos sumar archivos usando comodines, e incluso excluir.

**IMPORTANTE:** Tener en cuenta que si usas el patron glob para una app con dos grupos, si uno de ellos crea un backup/min, el otro lo puede estar leyendo, **debes ignorarlo con "!myfile.backup.js"**

Tener en cuenta que estos son los valores default (confirmar con core.js), con lo cual, solo agrega a tus app.json atributos distintos de los defaults.

```javascript
	{
		'files': [],
		/* Agregar paths, la extension de cada archivo determina su flujo, ya que en funcion del tipo utiliza los preprocessors. */

		'active': 'true'
		/* para desactivar temporalmente este "grupo", se puede enviar expresiones */

		'minificated': false,
		/* Si ya existe el archivo minificado (tipico en librerias) setear en true para evitar que vuelva minificar (ignorando el overwrite), asegurarse de usar minExtension correcto */

		'minExtension': 'min',
		/* prefijo de extension */

		'generateMin': false,
		/* genera la version minificada */

		'forceUseMin': false,
		/* fuerza a usar versiones minificadas en modo dev */

		'overwrite': true,
		/* especialmente para librerias (en el caso de generateMin) */

		'backupExtension': 'original',
		/* Si hay replaces para la version original, se genera un backup automatico con este prefijo */

		'overwriteOnRelease': false,
		/* escribe si no existe o si es release */

		'linter': false,
		/* usar linter y generar reporte (no aplica grupos con minificated === true) */

		'linterForce': false,
		/* en caso de que el linter encuentre algun error, frena la ejecucion devolviendo el error */

		'autoPrefixer': true,
		/* aplicar autoprefixer, solo para CSSs */

		'genSprite': false,
		/* generacion de sprites automaticamente, se debe seguir ciertas reglas, ver readme.md */

		'ignoreOnRelease': false,
		'ignoreOnBuild': false,
		'ignoreOnDist': false,
		/* eso mismo */

		'replaces': {
			/* En varios momentos se puede usar el reemplazo de texto; Soporta regexp para esto comenzar slash ("/"); Para utilizar enviar un array con dos elementos (key y value), dentro de otro array, como el ejemplo: */
			'original': [
				["/(border:)(\\w*)/gi", "$150em"]
			],
			/* modifica a los archivos originales (genera backup) */

			'originalMin': [],
			/* modifica a los archivos originales en sus versiones "min" (genera backup) */

			'originalDist': [],
			/* NO modifica los originales, solo lo hace en memoria al momento de hacer la version dist */

			'prePreprocess': [],
			/* antes de ejecutar el preprocessor */

			'postPreprocess': [],
			/* despues de ejecutar el preprocessor */

			'prePreprocessDist': [],
			/* antes de ejecutar cualquier preprocessor pero para dist, **esto es sobre-cargado** o sea lo hace en memoria y antes del replace "prePreprocess". */

			'postPreprocessDist': [],
			/* misma explicacion que el anterior, pero esta vez para despues de */

			'preMin': [],
			/* antes de minificar */

			'postMin': []
			/* despues de minificar */
		}
	}
```