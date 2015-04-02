/**
 * Created by Crystian on 3/14/2015.
 */

app.controller('PageCtrl', ['$scope', '$routeParams',
	function ($scope, $routeParams) {
		'use strict';

		console.debug('PageCtrl init');

		$scope.model = {'page': $routeParams.n};
	}
]);
