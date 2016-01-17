/**
 * Created by Crystian on 3/14/2015.
 */

app.factory('DataServices', ['$http', '$q',
	function($http, $q){
		'use strict';

		console.debug('DataServices init');

		return {
			getRemote: getRemote,
			getLocal: getLocal
		};

		function getLocal(){
			var localRequest = '../templates/angular-full/www/app2/data/local.json';
			return $http.get(localRequest).then(function(response, status, headers, config){
				return response.data.dataFromJson;
			}, handleError);
		}

		function getRemote(){
			var remoteRequest = 'http://127.0.0.1:9005/echo/pepe';
			return $http.get(remoteRequest).then(function(response, status, headers, config){
				return JSON.stringify(response.data);
			}, handleError);
		}

		function handleError(response){
			if(
				!angular.isObject(response) || !response.data
			){
				return ( $q.reject("An unknown error occurred, reopen please") );
			}

			return ( $q.reject(response.data) );
		}
	}
]);