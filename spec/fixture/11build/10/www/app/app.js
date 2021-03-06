/**
 * Created by Crystian on 2/22/2015.
 */
var app = {};

(function(angular) {'use strict';

	function appInit() {
		//FIRST before all modules!
		app = angular.module('app', ['ngRoute', 'ngAnimate']);

		app.config(['$routeProvider', '$locationProvider', function ($routeProvider) {
			$routeProvider
				.when('/about', {
					templateUrl: 'app/about.html',
					controller: 'AboutCtrl',
					controllerAs: 'about'
				}).otherwise({
					redirectTo: '/'
				});

			//angular.reloadWithDebugInfo();
			//$locationProvider.html5Mode(true);
		}]);

		app.run(['$rootScope', function ($rootScope) {
			console.log('run angular run');
		}]);
	}

	appInit();
})(window.angular);