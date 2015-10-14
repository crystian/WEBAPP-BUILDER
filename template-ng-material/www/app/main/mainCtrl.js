/**
 * Created by Crystian on 3/12/2015.
 */

app.controller('MainCtrl', ['$scope', '$location', 'toastr',
	function ($scope, $location, toastr) {
		'use strict';

		console.debug('MainCtrl init');
		toastr.success('yes works with toastr!', 'Title', {timeOut:10000});

		$scope.title1 = 'Button';
		$scope.title4 = 'Warn';
		$scope.isDisabled = true;

		$scope.googleUrl = 'http://google.com';
	}
]);
