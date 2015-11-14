/**
 * Created by Crystian on 2/22/2015.
 */
var landing = (function() {

	function init(){
		initSwipe();
	}

	function initSwipe() {
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			onInit: function (swiper) {
				landingFinished();
			}
		});
	}

	function landingFinished(){
		loader.hide();
		//loadApp();


	}

	function loadApp(){
        loader.show();
        loader.utils.requestApp('app2', function () {
            //need it into a function
            appInit();

        }, function (e) {
            console.error('Error: ',e);
        });
	}

	return {
		landingFinished: landingFinished,
		loadApp: loadApp,
		init: init
	};
}());

document.addEventListener('loaderFinished', landing.init);
