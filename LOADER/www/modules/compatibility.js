/**
* Created by Crystian on 10/27/2014.
*/

//This is the first test for compatibility, next tests are on diag.js
(function(loaderCfg){
	'use strict';

	//yes on _loaderCfg, after this test, will be removed
	loaderCfg.compatibilityFirstRun = function(){
		if(!loaderCfg.compatibilityFirst()){
			//TODO i18n ?
			alert(loaderCfg.textIncompatibleByFeatures);
			var body = document.getElementsByTagName('body')[0];
			body.innerHTML = loaderCfg.textIncompatibleByFeatures+'<br>'+loaderCfg.textFaqLink;
			return false;
		} else {
			return true;
		}
	};
}(_loaderCfg));