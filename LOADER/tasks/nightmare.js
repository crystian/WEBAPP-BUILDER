///**
//* Created by Crystian on 10/16/2014.
//*
//* The main propose for this file is test the loader
//*/
//
//var gulp = require('gulp'),
//	Nightmare = require('nightmare'),
//	webserver = require('gulp-webserver'),
//	//mocha = require('gulp-mocha'),
//	async = require('async'),
//	gutil = require('gulp-util');
//
//gulp.task('serve:nightmare', function() {
//	'use strict';
//
//	return gulp.src(global.cfg.folders.build)
//		.pipe(webserver({
//			host: global.cfg.ip,
//			port: global.cfg.ports.nightmare,
//			livereload: false,
//			fallback: 'index.html',
//			open: false
//		}));
//});
//
//gulp.task('test:loader',['serve:nightmare'], function(cb) {
//	'use strict';
//
//	var browsers =[
//
//		//CHROME
//		{
//			name: 'chrome40',
//			ua: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.91 Safari/537.36',
//			compatibility: 2,
//			isDevice: 0,	isDesktop: 1,	isTablet: 1,	isMobile: 0,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		},
//		{
//			name: 'chrome37',
//			ua: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36)',
//			compatibility: 2,
//			isDevice: 0,	isDesktop: 1,	isTablet: 1,	isMobile: 0,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		},
//
//		//FIREFOX
//		{
//			name: 'ff32',
//			ua: 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0',
//			compatibility: 2,
//			isDevice: 0,	isDesktop: 1,	isTablet: 1,	isMobile: 0,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		},
//
//
//		//IE
//		{
//			name: 'ie5',
//			ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 0
//		},{
//			name: 'ie7',
//			ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 0
//		},{
//			name: 'ie8',
//			ua: 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 0
//		},{
//			name: 'ie9',
//			ua: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 0
//		},{
//			name: 'ie10',
//			ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 1,
//			isDevice: 0,	isDesktop: 1,	isTablet: 1,	isMobile: 0,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		},
//
//		//IPHONE
//		{
//			name: 'iphone3gs',
//			ua: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
//			compatibility: 0
//		},{
//			name: 'iphone4',
//			ua: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
//			compatibility: 0
//		},{
//			name: 'iphone5',
//			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 320,	height: 568,	orientation: 0,	lang: 'en-us'
//		},{
//			name: 'iphone6',
//			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 375,	height: 667,	orientation: 0,	lang: 'en-us'
//		},{
//			name: 'iphone6plus',
//			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 375,	height: 667,	orientation: 0,	lang: 'en-us'
//		},{
//			name: 'ipad1-2',
//			ua: 'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5',
//			compatibility: 0
//		},{
//			name: 'ipad3-4',
//			ua: 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 1,	isMobile: 0,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		},
//
//		//ANDROID
//		{
//			name: 'androidS2',
//			ua: 'Mozilla/5.0 (Linux; U; Android 2.1; en-us; GT-I9000 Build/ECLAIR) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2',
//			compatibility: 0
//		},{
//			name: 'androidS3',
//			ua: 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 360,	height: 640,	orientation: 0,	lang: 'en'
//		},{
//			name: 'androidS4',
//			ua: 'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 360,	height: 640,	orientation: 0,	lang: 'en-us'
//		},{
//			name: 'androidLG-G',
//			ua: 'Mozilla/5.0 (Linux; Android 4.0; LG-E975 Build/IMM76L) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
//			compatibility: 1,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 384,	height: 640,	orientation: 0,	lang: 'en-us'
//		},{
//			name: 'androidHTC-ONE',
//			ua: 'Mozilla/5.0 (Linux; Android 4.0.3; HTC One X Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
//			compatibility: 1,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		},{
//			name: 'androidNexus4',
//			ua: 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
//			compatibility: 1,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en'
//		},{
//			name: 'androidNexus5',
//			ua: 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
//			compatibility: 1,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en'
//		},{
//			name: 'androidSTab',
//			ua: 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 600,	orientation: 1,	lang: 'en'
//		},{
//			name: 'androidSonyXperiaZ1',
//			ua: 'Mozilla/5.0 (Linux; U; Android 4.2; en-us; SonyC6903 Build/14.1.G.1.518) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en'
//		},{
//			name: 'androidMotorlaDroid',
//			ua: 'Mozilla/5.0 (Linux; U; Android 2.0; en-us; Milestone Build/ SHOLS_U2_01.03.1) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en'
//		},
//
//		//OTHERS
//		{
//			name: 'nokiaN97',
//			ua: 'NokiaN97/21.1.107 (SymbianOS/9.4; Series60/5.0 Mozilla/5.0; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebkit/525 (KHTML, like Gecko) BrowserNG/7.1.4',
//			compatibility: 1,
//			//TODO: IMPROVE IT!
//			isDevice: 0,	isDesktop: 1,	isTablet: 1,	isMobile: 0,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		},{
//			name: 'nokiaLumia820',
//			ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 820)',
//			compatibility: 1,
//			//TODO: IMPROVE IT!
//			isDevice: 0,	isDesktop: 1,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		},{
//			name: 'blackberryZ10',
//			ua: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
//			compatibility: 1,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 768,	orientation: 1,	lang: 'en-us'
//		}
//	];
//
//
//	async.mapSeries(browsers, function (b,cbMap) {
//
//		gutil.log('Browser to test: ' + b.name);
//
//		var nightmare = new Nightmare({weak: false, timeout: 100});
//		nightmare
//			.useragent(b.ua)
//			.viewport(b.width, b.height)
//			.on('error', gutil.log)
//			.goto('http://' + global.cfg.ip + ':' + global.cfg.ports.nightmare + '/index.html')
//			.wait(1000)
//			.screenshot(global.cfg.folders.screens + '/' + b.name + '.jpg')
//			.evaluate(function () {return window;},
//				function (window){
//
//					var cfg = window.loader.cfg;
//
//					//just in case
//					if (global.cfg.release &&
//						(
//						cfg.debugMode ||
//						cfg.showDeviceInfo ||
//						cfg.showSkeletor ||
//						cfg.contentEditable
//						)
//						){
//						gutil.beep();
//						throw new Error('Mode release with debugMode (and others) activate!');
//					}
//
//					if (cfg.compatibility !== b.compatibility) {
//						gutil.beep();
//						throw new Error('Compatibility throuble: Esperado "' + b.compatibility + '" pero vino: "' + cfg.compatibility + '" Browser: ' + b.name);
//					}
//
//					if(cfg.compatibility === 0){return;}
//
//					if (!window.loader.platform) {
//						gutil.beep();
//						throw new Error('WTF? there aren\'t platform! -  Browser: ' + b.name);
//					}
//
//					if (cfg.isCordovaDevice) {
//						gutil.beep();
//						throw new Error('WTF?? cordova detected?! -  Browser: ' + b.name);
//					}
//					if (cfg.isDevice != b.isDevice) {
//						gutil.beep();
//						throw new Error('Device not detected correctly! -  Browser: ' + b.name);
//					}
//					if (cfg.isDesktop != b.isDesktop) {
//						gutil.beep();
//						throw new Error('Desktop not detected correctly! -  Browser: ' + b.name);
//					}
//
//					if (cfg.isMobile != b.isMobile) {
//						gutil.beep();
//						throw new Error('Mobile not detected correctly! -  Browser: ' + b.name);
//					}
//					if (cfg.isTablet != b.isTablet) {
//						gutil.beep();
//						throw new Error('Desktop/Tablet not detected correctly! -  Browser: ' + b.name);
//					}
//
//					if (cfg.orientation != b.orientation) {
//						gutil.beep();
//						throw new Error('Orientation not detected correctly! -  Browser: ' + b.name);
//					}
//
//					if (cfg.lang != b.lang) {
//						gutil.beep();
//						throw new Error('Language not detected correctly! -  Browser: ' + b.name);
//					}
//
//
//				})
//			.run(function (err, nightmare) {
//				if (err) return console.log(err);
//				cbMap();
//			});
//	}, function (e){
//		setTimeout(function () {
//			process.exit(0);
//		},500);
//		cb();
//	});
//
//});
//
