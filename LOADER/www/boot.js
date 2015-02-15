(function(){
	'use strict';

	if(_loaderCfg.compatibilityFirstRun()){
		document.addEventListener('DOMContentLoaded',function(){
			loader.init();
		});
	} else {
		loader.loadingScreen.off();
	}

}());