'use strict';

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'ngResource'
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


phonecatApp.controller('PhoneListCtrl', ['$scope', '$routeParams','$http', 'restAPI',function($scope, $routeParams, $http, restAPI) {
		
		$scope.phoneOrder = 'age';
		$scope.phones = restAPI.getData();

}]);


phonecatApp.controller('detailsController',['$scope','$http','$routeParams','restAPI',function($scope,$http, $routeParams, restAPI){

	 var rest = restAPI.get({cool: $routeParams.cool}).$promise.then(function (Dataset) {
	 		$scope.focusImage = Dataset.images[0];
	 		$scope.phone = Dataset;
	    console.log(Dataset);
	 });
	 console.log(rest);
	 
	$scope.setImage = function (imgUrl) {
		console.log(imgUrl);
		$scope.focusImage = imgUrl;
	}
}]);


/* Factory */
phonecatApp.factory('restAPI', ['$resource',function ($resource) {
		return $resource('phones/:cool.json', {}, {
			getData: { method: 'GET', params: {cool: 'phones'}, isArray: true }
		});
}]);

/* Filters */
phonecatApp.filter('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});





