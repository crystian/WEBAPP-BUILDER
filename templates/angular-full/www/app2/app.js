/**
 * Created by Crystian on 2/22/2015.
 */
var app = {};

(function(angular) {'use strict';

	function appInit() {
		//FIRST before all modules!
		app = angular.module('app', ['ngRoute', 'toastr', 'ngAnimate', 'templates']);
		angular.module('templates',[]);//flagTemplates

		app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/page/:n', {
					templateUrl: '../templates/angular-full/www/app2/page/page.tpl.html',
					controller: 'PageCtrl',
					controllerAs: 'page'
				})
				.when('/about', {
					templateUrl: 'app2/about.html',
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