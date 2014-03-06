angular.module('rcApp').controller('profileCtrl', ['$scope', '$location','Navigation',
	function ($scope, $location, Navigation) {
	Navigation.add($location.url());
  	$scope.profile = JSON.parse(localStorage.getItem('user'));
	$scope.section='Profile';
	$scope.title='Profile';
  }]);