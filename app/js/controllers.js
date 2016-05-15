'use strict';

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute'
]);

/* Route */

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phone/:cool', {
        templateUrl: 'partials/details.html',
        controller: 'detailsController'
      }).
      otherwise({
        redirectTo: '/nothing-found',
        templateUrl: 'partials/404.html'
      });
  }]);


/* Controllers */


phonecatApp.controller('PhoneListCtrl', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http) {
$scope.phoneOrder = 'age';
		$http({method: 'get', url: 'phones/phones.json'}).then(function success(a){
				console.log(a);
				$scope.phones = a.data;
		}, function error(a){
		})  

}]);


phonecatApp.controller('detailsController',['$scope','$http','$routeParams',function($scope,$http, $routeParams){

	var path = $scope.name = $routeParams.cool;
	console.log($routeParams.cool);

	$http({method: 'get', url: 'phones/' + path + '.json'}).then(function success(Dataset){
			$scope.phone = Dataset.data;
			console.log(Dataset);
	}, function error (){
			console.log(Dataset);
	});



}]);