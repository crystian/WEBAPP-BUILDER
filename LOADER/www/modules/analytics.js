////analytics
//loader.ga = (function (){
//	'use strict';
//
//	function load(){
//		console.debug('ga.load');
//
//		//jshint sub:true, asi:true, expr:true
//		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
//
//		ga('create',{trackingId: loader.cfg.gaId, cookieDomain: 'auto'});
//		ga('require', 'linkid');
//		ga('require', 'displayfeatures');
//		ga('set',{
//			'appVersion': loader.cfg.version,
//			'appName': loader.cfg.appName,
//			'appId': loader.cfg.appId,
//			'appInstallerId': loader.cfg.appInstallerWeb
//		});
//
//		window['ga-disable-'+ loader.cfg.gaId] = !loader.cfg.analytics;
//
//		//jshint camelcase:false
////		window.ga_debug = {trace: true};
//
//		//EVENT: Category, Action, Label, Value
//		//PAGE: Location, Page, Title
//	}
//
//	function landing() {
//		console.debug('ga.landing');
//
//		ga('send','pageview',{'sessionControl': 'start'});
//		ga('send', 'event', 'FlagsLang', 'Selected', flagName);
//	}
//
//
//	return {
//		load: load,
//		landing: landing
//	};
//}());