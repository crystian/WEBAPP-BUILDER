///**
// * Created by Crystian on 3/3/14.
// */
//
////shortcuts:
//var byId = function (id) {
//	'use strict';
//	return document.getElementById(id);
//};
//
//var byClass = function(_class){
//	'use strict';
//	return document.getElementsByClassName(_class)[0];
//};
//
///* insert html in id sent */
////jshint unused:false
//var h = function(id, v){
//	'use strict';
//	var el = byId(id);
//	if( el ){
//		el.innerHTML = v;
//	}
//};
//var hp = function(id, v){
//	'use strict';
//	var el = byId(id);
//	if( el ){
//		el.placeholder = v;
//	}
//};
////jshint unused:false
//var t = function(id, v){
//	'use strict';
//	var el = byId(id);
//	if( el ){
//		el.innerText = v;
//	}
//};
//
////show message in debug zone
////jshint unused:false
//var d = function(m){
//	'use strict';
//	loader.diag.debugAdd(m);
//};
//
//
////jshint maxstatements:false
//loader.utils = (function () {
//	'use strict';
//
//	var _cache = [];
//
//	//return 0 === equals, 1 === a > b, -1 === a < b
//	function compareSemVer(a, b) {
//		if (a === b) {
//			return 0;
//		}
//
//		var aComponents = a.split('.');
//		var bComponents = b.split('.');
//
//		var len = Math.min(aComponents.length, bComponents.length);
//
//		// loop while the components are equal
//		for (var i = 0; i < len; i++) {
//			// A bigger than B
//			if (parseInt(aComponents[i],10) > parseInt(bComponents[i],10)) {
//				return 1;
//			}
//
//			// B bigger than A
//			if (parseInt(aComponents[i],10) < parseInt(bComponents[i],10)) {
//				return -1;
//			}
//		}
//
//		// If one's a prefix of the other, the longer one is greater.
//		if (aComponents.length > bComponents.length) {
//			return 1;
//		}
//
//		if (aComponents.length < bComponents.length) {
//			return -1;
//		}
//
//		// Otherwise they are the same.
//		return 0;
//	}
//
//
//	function request(file, callback) {
//		console.log('request: '+ file);
//		var xhr = new XMLHttpRequest();
//
//		function errorDetected(er) {
//			console.error(er);
//			alert(er);
//		}
//
//		xhr.onreadystatechange = function(){
//			if (this.readyState === 4 &&
//				this.status === 200 &&
//				this.responseText !== null){
//
//				callback(this.responseText);
//			} else if( this.readyState === 4 ) {
//				errorDetected(loader.i18n.loader.errorRequestFile);
//			}
//		};
//
//		xhr.ontimeout = function(){errorDetected(loader.i18n.loader.errorTimeoutServer);};
//		xhr.open('GET', file, true);
//		// 10000 is to much?
//		xhr.timeout = 10000;//yes here, porque ie11 pincha :S
//		xhr.send();
//	}
//
//	function getJsAsync(file) {
//		var resourceLoader = document.createElement('script');
//		resourceLoader.type = 'text/javascript';
//		resourceLoader.async = true;
//		resourceLoader.src = file;
//
//		setNewResourceByTag(resourceLoader, 'script');
//	}
//
//	function setJsSync(content) {
//		var resourceLoader = document.createElement('script');
//		resourceLoader.type = 'text/javascript';
//		resourceLoader.async = false;
//		resourceLoader.innerHTML = content;
//
//		setNewResourceByTag(resourceLoader, 'head');
//	}
//
//	function getCssAsync(file) {
//		var resourceLoader = document.createElement('link');
//		resourceLoader.rel = 'stylesheet';
//		resourceLoader.async = true;
//		resourceLoader.href = file;
//
//		setNewResourceByTag(resourceLoader, 'link');
//	}
//
//	function setCssSync(content) {
//		var resourceLoader = document.createElement('style');
//		resourceLoader.innerHTML = content;
//		setNewResourceByTag(resourceLoader, 'head');
//	}
//
//	function setHtmlMain(data){
//		var el = document.getElementById('mainView');
//		el.innerHTML = data;
//	}
//
//	function setNewResourceByTag(resourceLoader, tagWhere) {
//		var scripts = document.getElementsByTagName(tagWhere)[0];
//		scripts.appendChild(resourceLoader);
//	}
//
//	function setNewResourceById(resourceLoader, id) {
//		var el = document.getElementById(id);
//		el.appendChild(resourceLoader);
//	}
//
//	function getInternetExplorerVersion() {
//		var rv = -1,
//			ua, re;
//		if (navigator.appName === 'Microsoft Internet Explorer') {
//			ua = navigator.userAgent;
//			re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
//			if (re.exec(ua) !== null){
//				rv = parseFloat(RegExp.$1);
//			}
//		}
//		else if (navigator.appName === 'Netscape') {
//			ua = navigator.userAgent;
//			re = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})');
//			if (re.exec(ua) !== null){
//				rv = parseFloat(RegExp.$1);
//			}
//		}
//		return rv;
//	}
//
//
//	//via: http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
//	function scrollTo(element, to, duration) {
//		var start = element.scrollTop,
//			change = to - start,
//			currentTime = 0,
//			increment = 20;
//
//		var animateScroll = function(){
//			currentTime += increment;
//			element.scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
//			if(currentTime < duration) {
//				setTimeout(animateScroll, increment);
//			}
//		};
//		animateScroll();
//	}
//
//	//t = current time
//	//b = start value
//	//c = change in value
//	//d = duration
//	Math.easeInOutQuad = function (t, b, c, d) {
//		t /= d/2;
//		if (t < 1){ return c/2*t*t + b;}
//		t--;
//		return -c/2 * (t*(t-2) - 1) + b;
//	};
//	////
//
//	function showSkeletor(){
//		toggleSkeletor(false);
//	}
//
//	function hideSkeletor(){
//		toggleSkeletor(true);
//	}
//
//	//TODO remove with gulp
//	function toggleSkeletor(v){
//		var el = document.getElementsByTagName('body')[0],
//			className = 'skeletor',
//			byValue = false;
//
//		byValue = (v === true || v === false) ? v :  el.classList.contains(className);
//
//		if( byValue ){
//			el.classList.remove(className);
//		} else {
//			el.classList.add(className);
//		}
//	}
//
//	function showPanicError(m){
//		if(window.console){window.console.error(m);}
//		var body = document.getElementsByTagName('body')[0];
//		body.innerHTML = m;
//	}
//
//	function getRandomInt(max) {
//		return Math.round(getRandomRange(0, max));
//	}
//
//	function getRandom(max) {
//		return getRandomRange(0, max);
//	}
//
//	function getRandomRange(min, max) {
//		return Math.random() * (max - min) + min;
//	}
//
//	function handleCompress(data){
//		//anchor for compress, DON't touch it!
//		if(true){return data;}//flagCompress
//		return LZString.decompressFromUTF16(data);
//	}
//
//	//merge between objects
//	function merge(root){
//		for ( var i = 1; i < arguments.length; i++ ){
//			for ( var key in arguments[i] ){
//				root[key] = arguments[i][key];
//			}
//		}
//		return root;
//	}
//
//	//two arguments are set, one is a get, just for encapsular y no ver las variables
//	function cache(key, value) {
//		if(value !== undefined){
//			_cache[key] = value;
//		} else {
//			return _cache[key];
//		}
//	}
//
//	return {
//		merge: merge,
//		cx: cache,
//		za: handleCompress,
//		showSkeletor: showSkeletor,
//		compareSemVer: compareSemVer,
//		hideSkeletor: hideSkeletor,
//		toggleSkeletor: toggleSkeletor,
//		scrollTo: scrollTo,
//		getRandom: getRandom,
//		getRandomInt: getRandomInt,
//		getRandomRange: getRandomRange,
//		getJsAsync: getJsAsync,
//		setJsSync: setJsSync,
//		getCssAsync: getCssAsync,
//		setCssSync: setCssSync,
//		setHtmlMain: setHtmlMain,
//		getInternetExplorerVersion: getInternetExplorerVersion,
//		showPanicError: showPanicError,
//		setNewResourceByTag: setNewResourceByTag,
//		setNewResourceById: setNewResourceById,
//		request: request
//	};
//
//}());