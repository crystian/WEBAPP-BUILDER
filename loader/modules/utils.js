/**
 * Created by Crystian on 3/3/14.
 */

	//jshint maxstatements:false
loader.utils = (function(){
	'use strict';

	var _cache = [];

	//return 0 === equals, 1 === a > b, -1 === a < b
	function compareSemVer(a, b){
		if(a === b){
			return 0;
		}

		var aComponents = a.split('.');
		var bComponents = b.split('.');

		var len = Math.min(aComponents.length, bComponents.length);

		// loop while the components are equal
		for(var i = 0; i < len; i++){
			// A bigger than B
			if(parseInt(aComponents[i], 10) > parseInt(bComponents[i], 10)){
				return 1;
			}

			// B bigger than A
			if(parseInt(aComponents[i], 10) < parseInt(bComponents[i], 10)){
				return -1;
			}
		}

		// If one's a prefix of the other, the longer one is greater.
		if(aComponents.length > bComponents.length){
			return 1;
		}

		if(aComponents.length < bComponents.length){
			return -1;
		}

		// Otherwise they are the same.
		return 0;
	}

	function getExtensionFile(s){
		var arr = s.split('.');
		if(arr.length === 0){
			return s;
		}
		return arr[arr.length - 1];
	}

	function setExtensionFilename(s, extension){
		var arr = s.split('.');
		if(arr.length <= 1){
			console.logRed('Extension not found!');
			return s;
		}

		arr.pop();
		arr.push(extension);

		return arr.join('.');
	}

	function request(url){
		return new Promise(function(resolve, reject){
			console.log('request: ' + url);
			var xhr = new XMLHttpRequest();

			function errorDetected(er){
				reject(er);
			}

			xhr.onreadystatechange = function(){
				if(this.readyState === 4 &&
					this.status === 200 &&
					this.responseText !== null){

					resolve(this.responseText);
				} else if(this.readyState === 4){
					errorDetected(loader.cfg.loader.text.errorRequestFile);
				}
			};

			xhr.ontimeout = function(){
				errorDetected(loader.cfg.loader.text.errorTimeoutServer);
			};
			xhr.open('GET', url, true);
			// 10000 is to much?
			xhr.timeout = 10000;//yes here, porque ie11 pincha :S
			xhr.send();
		});
	}

	function requestJson(url){
		return request(url).then(JSON.parse);
	}


	function requestApp(appName, loadAppSuccess, loadAppFail){
		return _requestOneOrAllInOne(appName, loadAppSuccess, loadAppFail);
	}

	function _requestOneOrAllInOne(appName, loadAppSuccess, loadAppFail){
		//debugger
		if(loader.cfg.oneRequest){
			console.info('oneRequest!');
			requestAllInOne(appName + '.json', {appName: appName}).then(loadAppSuccess, loadAppFail);
			return;
		}

		console.info('multiple request!');
		var path = '../' + loader.cfg.folders.project + loader.cfg.folders.www + appName + '/';

		return requestJson(path + 'www.json').then(function(data){

			var i    = 0,
					l    = data.length,
					urls = [];

			for(; i < l; i++){
				var file = data[i];

				urls.push('../'+ loader.cfg.folders.project + loader.cfg.folders.www + file);
			}

			return requestMultipleSync(urls, {appName: appName}).then(loadAppSuccess);
		});
	}

	function requestAllInOne(url, options){
		return request(url).then(function(data){

			try {
				data = JSON.parse(handleCompress(data));
			} catch (e) {
				return Promise.reject(e);
			}

			//console.dir(data);
			if(data.h){
				_setHtml(data.h, options);
			}
			if(data.c){
				_setCss(data.c);
			}
			if(data.j){
				_setJs(data.j);
			}
			//if (data.d) {
			//
			//}
			return Promise.resolve();
		});
	}

	//be careful, HTML option pisa old version
	function requestMultipleAsync(requestsArray, options){

		return Promise.all(requestsArray.map(function(url){
			var q = {};

			var type = getExtensionFile(url);

			switch (type){
				case 'html':
					q = requestAndSetHtml(url, options);
					break;
				case 'css':
					q = requestAndSetCss(url);
					break;
				case 'js':
					q = requestAndSetJs(url);
					break;
				default:
					return Promise.reject('Error key not found on requestMultiple array');
			}

			return q;
		}));
	}

	function requestMultipleSync(requestsArray, options){
		if(requestsArray.length === 0){
			return Promise.resolve();
		}

		var url = requestsArray.shift();
		return requestMultimpleSyncUnique(url, options)
			.then(function(){
				return requestMultipleSync(requestsArray, options);
			});

	}

	function requestMultimpleSyncUnique(url, options){
		return new Promise(function(resolve, reject){
			//console.group('requestMultipleSync: ' + url);

			var type = getExtensionFile(url),
					fn;

			switch (type){
				case 'html':
					fn = function(data){
						return requestAndSetHtml(data, options);
					};
					break;
				case 'css':
					fn = requestAndSetCss;
					break;
				case 'js':
					fn = requestAndSetJs;
					break;

				default:
					reject('Error key not found on requestMultiple array');
			}

			//console.log('type:', type);
			fn(url).then(function(){
				//console.log('resolved');
				//console.groupEnd();
				resolve();
			}, function(m){
				reject(m);
			});
		});
	}

	//potential issue about security, review it
	function getJsFile(file){
		var resourceLoader = document.createElement('script');
		resourceLoader.type = 'text/javascript';
		resourceLoader.async = true;
		resourceLoader.src = file;

		setNewResourceByTag(resourceLoader, 'head');
	}

	function requestAndSetJs(url){
		return request(url).then(_setJs);
	}

	function _setJs(content){
		var resourceLoader = document.createElement('script');
		resourceLoader.type = 'text\/javascript';
		resourceLoader.async = false;
		resourceLoader.innerHTML = content;
		setNewResourceByTag(resourceLoader, 'head');
	}

	function requestAndSetCss(url){
		return request(url).then(_setCss);
	}

	function _setCss(content){
		var resourceLoader = document.createElement('style');
		resourceLoader.type = 'text/css';
		if(!loader.cfg.phantom){
			resourceLoader.innerHTML = content;
		}
		setNewResourceByTag(resourceLoader, 'head');
	}

	function requestAndSetHtml(url, options){
		return request(url).then(function(data){
			_setHtml(data, options);
		});
	}

	function _setHtml(data, options){
		var el = document.getElementById('mainContainer');

		options = options || {appName: 'app'};
		options.replace = options.replace || false;

		if((options && options.replace === false) || !el.getElementById(options.appName)){

			var app = document.createElement('div');
			app.innerHTML = data;
			app.id = options.appName;
			app.classList.add('height100');

			setNewResourceById(app, 'mainContainer');
		} else {
			el.getElementById(options.appName).innerHTML = data;
		}
	}

	function setNewResourceByTag(resourceLoader, tagWhere){
		var tag = document.getElementsByTagName(tagWhere)[0];
		tag.appendChild(resourceLoader);
	}

	function setNewResourceById(resourceLoader, id){
		var el = document.getElementById(id);
		el.appendChild(resourceLoader);
	}

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

	function showSkeletor(){
		toggleSkeletor(false);
	}

	function hideSkeletor(){
		toggleSkeletor(true);
	}

	function toggleSkeletor(v){
		//removeIf(production)
		var el        = document.getElementsByTagName('body')[0],
				className = 'skeletor',
				byValue   = false;

		byValue = (v === true || v === false) ? v : el.classList.contains(className);

		if(byValue){
			el.classList.remove(className);
		} else {
			el.classList.add(className);
		}
		//endRemoveIf(production)
	}

	function showPanicError(m){
		if(window.console){
			window.console.error(m);
		}
		var body = document.getElementsByTagName('body')[0];
		body.innerHTML = m;
		loader.hide();
	}

	function getRandomInt(max){
		return Math.round(getRandomRange(0, max));
	}

	function getRandom(max){
		return getRandomRange(0, max);
	}

	function getRandomRange(min, max){
		return Math.random() * (max - min) + min;
	}

	function handleCompress(data){
		//anchor for compress, DON't touch it!
		if(!loader.cfg.compress){return data;}//flagCompress
		console.log('Resource compressed');
		return LZString.decompressFromUTF16(data);
	}

	//two arguments are set, one is a get, just for encapsular y no ver las variables
	function cache(key, value){
		if(value !== undefined){
			_cache[key] = value;
		} else {
			return _cache[key];
		}
	}

	return {
		cx: cache,
		za: handleCompress,
		showSkeletor: showSkeletor,
		compareSemVer: compareSemVer,
		getExtensionFile: getExtensionFile,
		setExtensionFilename: setExtensionFilename,
		hideSkeletor: hideSkeletor,
		toggleSkeletor: toggleSkeletor,
		//		scrollTo: scrollTo,
		getRandom: getRandom,
		getRandomInt: getRandomInt,
		getRandomRange: getRandomRange,

		request: request,
		requestJson: requestJson,
		requestApp: requestApp,
		requestMultipleSync: requestMultipleSync,
		requestMultipleAsync: requestMultipleAsync,
		//requestAllInOne: requestAllInOne,
		requestAndSetJs: requestAndSetJs,
		requestAndSetHtml: requestAndSetHtml,
		requestAndSetCss: requestAndSetCss,
		getJsFile: getJsFile,

		showPanicError: showPanicError,
		setNewResourceByTag: setNewResourceByTag
		//		setNewResourceById: setNewResourceById,
	};

})();