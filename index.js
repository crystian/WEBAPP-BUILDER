/**
 * Created by Crystian on 10/19/2014.
 */


var landing = {

	init : function () {
		'use strict';

		loader.loadingScreen.off();
	},


	baseLoad: function(){
		//'use strict';
		//console.info('Enter to the base');
		//
		//// si es local en modo dev, busca archivo por archivo
		//// si no es modo dev va a ir a buscar un json unico con all lo necesario
		//
		////siempre carga la landing
		//if( loader.cfg.devLocal ){
		//
		//	loader.utils.request('landing/landing.html', function (data) {
		//		app.utils.cx('lh',data);
		//
		//		app.utils.request('landing/landing.css', function (data) {
		//			app.utils.cx('lc',data);
		//
		//			app.utils.request('landing/landing.js', function (data) {
		//				app.utils.cx('lj',data);
		//
		//				$(document).ready(function(){
		//					//finally all loaded!
		//					app.baseFinished();
		//				});
		//			});
		//		});
		//	});
		//
		//} else {
		//	app.utils.request('b', function( data ){
		//		data = JSON.parse(app.utils.za(data));
		//
		//		var resourceLoader = document.createElement('style');
		//		resourceLoader.innerHTML = data.bc;
		//		app.utils.setNewResourceByTag(resourceLoader, 'style');
		//
		//		resourceLoader = document.createElement('script');
		//		resourceLoader.innerHTML = data.bj;
		//		app.utils.setNewResourceByTag(resourceLoader, 'script');
		//
		//		app.utils.cx('lh',data.lh);
		//		app.utils.cx('lc',data.lc);
		//		app.utils.cx('lj',data.lj);
		//
		//		$(document).ready(function(){
		//			//finally all loaded!
		//			app.baseFinished();
		//		});
		//	});
		//
		//}
	},

	baseFinished: function () {
		//'use strict';
		//
		////TODO desacoplar
		//this.cordovaConnectionTypeCheck();
		//
		//app.ga.load();
		//
		//if( app.settings.get(app.settings.LOGGED) ){
		//	console.log('Login: Logged previously');
		//	app.appLoad();
		//} else {
		//	app.landingLoad();
		//}
	},

	landingLoad: function () {
		//'use strict';
		//
		//console.info('Enter to the landing');
		//
		//app.utils.setHtmlMain(app.utils.cx('lh'));
		//app.utils.setCssSync(app.utils.cx('lc'));
		//app.utils.setJsSync(app.utils.cx('lj'));
		//
		//app.landing.init(this.landingFinish);
		//
		//app.ga.landing();
	},

	landingFinish: function(){
		//'use strict';
		//
		//app.loader.hide();
	},

	landingDestroy: function () {
		//'use strict';
		//
		//app.landing.destroy();
		//
		//window.location.href = '#/home';
		//
		//app.appLoad();
	},

	//TODO
	//from buttons
	landingLogin: function(){
		//	'use strict';
		//	console.log('Login: first time, via: ', e);
		//
		//	var username = document.getElementById('form-username');
		//
		//	if(username.value.length === 0){
		//		alert('Ingresa un nombre de usuario che!\n despues hago un lindo cartelito');
		//		return;
		//	}
		//
		//
		//	app.ga.loginIn(e);
		//
		//	app.settings.set(app.settings.LOGGED, 1);
		//	app.settings.set(app.settings.USER, username.value);
		//
		//	app.loadingScreen.on(this.landingDestroy);
	},

	appLoad: function () {
		//'use strict';
		//console.info('Load app');
		//
		//if( app.cfg.devLocal ){
		//	app.appFinished();
		//} else {
		//
		//	app.utils.request('m', function( data ){
		//		data = JSON.parse(app.utils.za(data));
		//
		//		var resourceLoader = document.createElement('style');
		//		app.utils.cx('mc',data.mc);
		//		resourceLoader.innerHTML = data.mc;
		//		app.utils.setNewResourceByTag(resourceLoader, 'style');
		//
		//		resourceLoader = document.createElement('script');
		//		app.utils.cx('mj',data.mj);
		//		resourceLoader.innerHTML = data.mj;
		//		app.utils.setNewResourceByTag(resourceLoader, 'script');
		//
		//		$(document).ready(function(){
		//			app.appFinished();
		//		});
		//
		//	});
		//}
	},

	appFinished: function () {
		//'use strict';
		//console.info('START THE APP!');
		//
		//byId('mainContainer').classList.add('application');
		//
		//var continueApp = function() {
		//	angular.element(document).ready(function () {
		//		app.ng = angular.bootstrap(document, ['app']);
		//	});
		//};
		//
		//if( app.cfg.devLocal ){
		//	continueApp();
		//} else {
		//
		//	app.utils.request('h', function (data) {
		//		data = JSON.parse(app.utils.za(data));
		//
		//		app.utils.cx('dpl', data.p);//parameter language
		//		app.utils.cx('da', data.a);//artists
		//		app.utils.cx('dd', data.d);//discographics
		//		app.utils.cx('ds', data.s);//songs!
		//		app.utils.cx('dg', data.g);//genre
		//
		//		continueApp();
		//	});
		//}
	}
};

document.addEventListener('loaderFinished', landing.init);
