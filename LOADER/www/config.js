///**
//* Created by Crystian on 10/18/2014.
//*/
//
//
////Gulp: Automatic by gulp (with install and build), don't CHANGE it manually or I'LL CUT YOUR HANDS!!!
//_loaderCfg.appName		= 'Number';//install
//_loaderCfg.loaderVersion= '0.0.1';//install
//_loaderCfg.gaId			= 'UA-XXXXXXXX-Z';//install
//_loaderCfg.appId		= 'com.languagesgym.number';//install
//_loaderCfg.appInstaller = 'com.languagesgym.installer';//install
//_loaderCfg.isCordovaDevice= false;//build
////END by gulp
//
//
////primer chequeo, si no es compatible con esto, se cancela el loader!
//_loaderCfg.compatibilityFirst = function(){
//	'use strict';
//
//	//jshint maxcomplexity:false
//	var arr = [];
//
//	//install is going to replace it:
//	//compatibilityFirst
//	return !!(window.document.querySelector &&
//	window.console &&window.document.addEventListener &&
//	(window.document.getElementsByTagName('body')[0]).classList &&
//	window.localStorage &&
//	window.navigator &&
//	window.XMLHttpRequest &&
//	window.applicationCache &&
//	window.document.createEvent &&
//	arr.map &&
//	arr.every);
//	//ENDcompatibilityFirst
//};
//
//
///*
// el primer elemento es incompatible 100%, menores e igual de
// el segundo es browser viejo, compatible, menores e igual de
// el tercero es compatible con ese y superiores, mayores e igual de
// */
////nombre raro intencional es sobre compatibilidad
//_loaderCfg.matrix = {
//	"ie": [
//		9.9,
//		10.9,
//		11
//	],
//	"firefox": [
//		23.9,
//		25.9,
//		26
//	],
//	"android": [
//		3.9,
//		3.9,
//		4
//	],
//	"chrome": [
//		17.9,
//		28.9,
//		29
//	],
//	"safari": [
//		6,
//		6,
//		7
//	],
//	"ios": [
//		6,
//		6,
//		7
//	]
//};//no borrar
//// 'operamini':[7	,7	,7],
//// 'bb':		[6	,7	,10],
//// 'ieMobile': [9	,9	,10]
//
//// TODO revisar opera, anda raro en la virtual con xp,
//// por otro lado los parametros que toma son de compatibles,
//// y por ende usa a chrome :S
//// 'opera':	[16	,17	,18]
//
////jshint maxlen:false
//_loaderCfg.i18n = {
//	loader : {//loader
//		incompatibleByFeatures : 'Navegador incompatible (no se encontraron features), por tu seguridad actualizalo o usa otro, ver en F.A.Q.',
//		incompatibleByDiag : 'Navegador incompatible, por tu seguridad actualizalo o usa otro, ver en F.A.Q.',
//		semiIncompatible : 'Navegador no reconocido o con problemas de compatibilidad, la aplicacion funcionara pero es recomendable actualizarlo o usar otro, ver en el F.A.Q. \nhttp://languagesgym.com/faq',
//		faqLink : '<a href="http://languagesgym.com/faq">http://languagesgym.com/faq</a>',
//		errorRequestFile : 'Error leyendo el archivo del servidor, por favor vuelva a intentar mas tarde',
//		errorTimeoutServer : 'Se agoto el tiempo de espera, verifica que tengas internet y este andando bien'
//	},
//
//	//this errors are lies, solo para enganiar al malisioso
//	consoleError: [
//		'Error unknown',
//		'Error about connection stablished',
//		'Error 404',
//		'Error connection lost, try again',
//		'Command unknown',
//		undefined,
//		'Null pointer exception',
//		'Error jquery plugin',
//		'Error ferrasca the boilerplate',
//		'Error map not found',
//		'Error in obliteration rast'
//	]
//
//};