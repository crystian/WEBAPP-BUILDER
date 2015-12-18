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
		var path = '../' + loader.cfg.folders.template + loader.cfg.folders.www + appName + '/';

		return requestJson(path + 'www.json').then(function(data){

			var i    = 0,
					l    = data.length,
					urls = [];

			for(; i < l; i++){
				var file = data[i];

				urls.push('../'+ loader.cfg.folders.template + loader.cfg.folders.www + file);
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
			//console.group('requestMultipleSync: ' + url);

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

		if((options && options.replace === false) || !el.getElementById(options.appName)){

			var app = document.createElement('div');
			app.innerHTML = data;
			app.id = options.appName;
			app.classList.add('height100');

			loader.utils.setNewResourceById(app, 'mainContainer');
		} else {
			el.getElementById(options.appName).innerHTML = data;
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