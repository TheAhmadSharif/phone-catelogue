'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', ['$scope', '$http', function($scope, $http) {

$scope.phoneOrder = 'age';


		$http.get('phones/phones.json').success(function(data) {
			$scope.phones = data;
		});


		$http({method: 'get', url: 'phones/phones.json'}).then(function success(a){
				console.log(a);
		}, function error(a){
				console.log(error);
		})  

}]);
