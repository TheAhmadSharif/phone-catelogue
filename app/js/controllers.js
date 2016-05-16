'use strict';

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatFilters'
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
      when('/about', {
      	templateUrl: 'partials/about.html'
      }).
      when('/contact', {
      	templateUrl: 'partials/contact.html'
      }).
      otherwise({
        redirectTo: '/nothing-found',
        templateUrl: 'partials/404.html'
      });
  }]);


/* Controllers */


phonecatApp.controller('PhoneListCtrl', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http) {
$scope.phoneOrder = 'age';
		$http({
			method: 'get', 
			url: 'phones/phones.json'
		}).then(function success(a){
				console.log(a);
				$scope.phones = a.data;
		}, function error(a){
		})  

}]);


phonecatApp.controller('detailsController',['$scope','$http','$routeParams',function($scope,$http, $routeParams){

	var path = $scope.name = $routeParams.cool;
	console.log($routeParams.cool);

	$http({
		method: 'get', 
		url: 'phones/' + path + '.json'
	}).then(function success(Dataset){
			$scope.phone = Dataset.data;
			console.log(Dataset);

			$scope.focusImage = Dataset.data.images[0];

	}, function error (){
			console.log(Dataset);
	});


	$scope.setImage = function (imgUrl) {
		console.log(imgUrl);
		$scope.focusImage = imgUrl;
	}



}]);

/* Filters */

angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});