/**
 * Created by Crystian on 18/12/2015.
 */

loader.xhr = (function(){

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


	function requestApp(appConfig, loadAppSuccess, loadAppFail){
		appConfig = typeof(appConfig) === 'string' ? {appName: appConfig} : appConfig;
		return _requestOneOrAllInOne(appConfig, loadAppSuccess, loadAppFail);
	}

	function _requestOneOrAllInOne(appConfig, loadAppSuccess, loadAppFail){
		//debugger
		if(loader.cfg.isDist){
			console.info('isDist!');
			requestAllInOne(appConfig.appName + '.json', appConfig).then(loadAppSuccess, loadAppFail);
			return;
		}
		var templatePath = '';
		if(loader.cfg.folders.template){
			templatePath = loader.cfg.folders.template + loader.cfg.folders.www;
		}

		console.info('multiple request!');
		var path = '../' + templatePath + appConfig.appName + '/';

		return requestJson(path + 'www.json', appConfig).then(function(data){

			var i    = 0,
					l    = data.length,
					urls = [];

			for(; i < l; i++){
				var file = data[i];

				urls.push('../'+ templatePath + file);
			}

			return requestMultipleSync(urls, appConfig).then(loadAppSuccess);
		});
	}

	function requestAllInOne(url, options){
		return request(url).then(function(data){

			try {
				data = JSON.parse(loader.utils.za(data));
			} catch (e) {
				return Promise.reject(e);
			}

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

			var type = loader.utils.getExtensionFile(url);

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

			var type = loader.utils.getExtensionFile(url),
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

			fn(url).then(function(){
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

		loader.utils.setNewResourceByTag(resourceLoader, 'head');
	}

	function requestAndSetJs(url){
		return request(url).then(_setJs);
	}

	function _setJs(content){
		var resourceLoader = document.createElement('script');
		resourceLoader.type = 'text\/javascript';
		resourceLoader.async = false;
		resourceLoader.innerHTML = content;
		loader.utils.setNewResourceByTag(resourceLoader, 'head');
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
		loader.utils.setNewResourceByTag(resourceLoader, 'head');
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

		if((options && options.replace === false) || !el.querySelector('#' + options.appName)){

			var app = document.createElement('div');
			app.innerHTML = data;
			app.id = options.appName;
			app.classList.add('height100');

			loader.utils.setNewResourceById(app, 'mainContainer', options.clear);
		} else {
			el.querySelector('#' + options.appName).innerHTML = data;
		}
	}

	return {
		request: request,
		requestJson: requestJson,
		requestApp: requestApp,
		requestMultipleSync: requestMultipleSync,
		requestMultipleAsync: requestMultipleAsync,
		//requestAllInOne: requestAllInOne,
		requestAndSetJs: requestAndSetJs,
		requestAndSetHtml: requestAndSetHtml,
		requestAndSetCss: requestAndSetCss,
		getJsFile: getJsFile
	};
}());