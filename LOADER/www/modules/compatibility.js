/**
* Created by Crystian on 10/27/2014.
*/

//This is the first test for compatibility, next tests are on diag.js
(function(){
	'use strict';

	//yes on _loaderCfg, after this test, will be removed
	if(!_loaderCfg.compatibilityFirst()){
		alert(_loaderCfg.textIncompatibleByFeatures);
		var body = document.getElementsByTagName('body')[0];
		body.innerHTML = _loaderCfg.textIncompatibleByFeatures+'<br>'+_loaderCfg.textFaqLink;
		console.error(_loaderCfg.textIncompatibleByFeatures);
	}

}());