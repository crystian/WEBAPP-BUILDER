/**
 * Created by Crystian on 3/14/2015.
 */

app.factory('DataServices', ['$http', '$q',
	function ($http, $q) {
		'use strict';

		console.debug('DataServices init');

		return {
			getRemote: getRemote,
			getLocal: getLocal
		};

		function getLocal(){
			var localRequest = loader.cfg.appRoot +'/www/app/data/local.json';
			return $http.get(localRequest).
				then(function(response, status, headers, config) {
					return response.data.dataFromJson;
				}, handleError);
		}

		function getRemote(){
			var remoteRequest = 'http://10.0.1.2:9002/hello/pepe';
			return $http.get(remoteRequest).
				then(function(response, status, headers, config) {
					return response.data;
				}, handleError);
		}

		function handleError( response ) {
			if (
				! angular.isObject( response ) ||
				! response.data
			) {
				return( $q.reject( "An unknown error occurred, reopen please" ) );
			}

			return( $q.reject( response.data ) );
		}
	}
]);