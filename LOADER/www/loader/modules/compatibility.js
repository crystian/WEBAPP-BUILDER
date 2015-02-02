/**
 * Created by Crystian on 10/27/2014.
 */

//This is the first test for compatibility, next test are on diag.js
(function(){
	'use strict';

	if(!loader.diag.isCompatible()){
		//use _loaderCfg, porque todavia no lo uni en el loader
		alert(_loaderCfg.i18n.loader.incompatibleByFeatures);
		var body = document.getElementsByTagName('body')[0];
		body.innerHTML = _loaderCfg.i18n.loader.incompatibleByFeatures+'<br>'+_loaderCfg.i18n.loader.faqLink;
	}
}());