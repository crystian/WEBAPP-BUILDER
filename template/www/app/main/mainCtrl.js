/**
 * Created by Crystian on 3/12/2015.
 */

app.controller('MainCtrl', ['$scope', '$location', 'DataServices', 'toastr',
	function ($scope, $location, DataServices, toastr) {
		'use strict';

		console.debug('MainCtrl init');

		$scope.pageSelected = 0;

		$scope.page = function (n) {
			//console.log('n',n);
			$scope.pageSelected = n;
			$location.url('page/'+n);
		};

		toastr.success('yes works with toastr!', 'Title', {timeOut:10000});

		$scope.page($scope.pageSelected);

		$scope.localData = $scope.remoteData = 'not yet';

		DataServices.getLocal().then(function (data) {
			$scope.localData = data;
		}, errorHandle);

		DataServices.getRemote().then(function (data) {
			$scope.remoteData = data;
		}, function (m) {
			errorHandle(m + ' (Maybe the server api is not up?)')
		});

		function errorHandle(m){
			toastr.error(m, 'Error');
		}
	}
]);
