var loginUrl = 'http://crm.mlsdev.com/users/current.json'

angular.module('rcApp').controller('loginCtrl', ['$scope', '$http', '$location',
  function ($scope, $http, $location) {
    var user = localStorage.getItem('user');//JSON.parse(localStorage.getItem('user'));
    var api_key;
    if (user != "undefined") {
      api_key = JSON.parse(user).api_key;
    }
    if (api_key != undefined) {
      $location.path('/projects');
    }
  	$scope.login = function() {
	    $http({method: 'GET', url: loginUrl, headers: {'Authorization': 'Basic ' + window.btoa($scope.user.name + ":" + $scope.user.pass)}})
      //$http({method: 'GET', url: loginUrl, headers: {'Authorization': 'Basic ' + window.btoa(username + ":" + password)}})
	    	.success(function(data, status, headers, config) {
          localStorage.setItem('user', JSON.stringify(data.user));
          $location.path('/projects');
	    	})
	    	.error(function(data, status, headers, config) {
          if (status == 404) {
            alert('Conection problem');  
          }
	  			alert('Login fail');
	    	});
    }
  }]);