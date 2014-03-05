angular.module('rcApp').controller('menuCtrl', ['$scope', '$location', '$spMenu', 'Navigation',
  function ($scope, $location, $spMenu, Navigation) {
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
    $scope.backVisible = function() {
      return !Navigation.isEmpty();
    }
  }]);