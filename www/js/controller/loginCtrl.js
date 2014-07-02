var loginUrl = 'http://crm.mlsdev.com/users/current.json'

angular.module('rcApp').controller('loginCtrl', ['$scope', '$http', '$location',
  function ($scope, $http, $location) {
    var api_key;
    var loading = false;
    var user = localStorage.getItem('user');//JSON.parse(localStorage.getItem('user'));
    if (user != "undefined") {
      if (JSON.parse(user) != undefined && api_key in JSON.parse(user)) {
        api_key = JSON.parse(user).api_key;
      }
    }
    if (api_key != undefined) {
      $location.path('/projects');
    }
  	$scope.login = function() {
      if ($scope.user == undefined || $scope.user.name == undefined || $scope.user.pass == undefined) {
        alert('Fill credentials');
        return;
      }
      console.log('Login ' + $scope.user.name + ":" + $scope.user.pass);
      loading = true;
	    $http({method: 'GET', url: loginUrl, headers: {'Authorization': 'Basic ' + window.btoa($scope.user.name + ":" + $scope.user.pass)}})
      //$http({method: 'GET', url: loginUrl, headers: {'Authorization': 'Basic ' + window.btoa(username + ":" + password)}})
	    	.success(function(data, status, headers, config) {
          loading = false;
          localStorage.setItem('user', JSON.stringify(data.user));
          $location.path('/projects');
          
	    	})
	    	.error(function(data, status, headers, config) {
          loading = false;
          if (status == 404) {
            alert('Conection problem');  
          } else {
	  			  alert('Login fail');
          } 
	    	});
    }

    $scope.isLoading = function() {
      return loading;
    }
  }])
;