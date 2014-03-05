angular.module('rcApp').controller('menuCtrl', ['$scope', '$location', '$spMenu',
  function ($scope, $location, $spMenu) {
    $scope.redirectToProfile = function() {
      $location.path('/profile');
      $spMenu.hide();
    }
  	$scope.redirectToProject = function() {
	    $location.path('/projects');
	    $spMenu.hide();
    }
    $scope.redirectToIssue = function() {
      $location.path('/issues');
      $spMenu.hide();
    }
  }]);