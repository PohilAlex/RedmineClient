angular.module('rcApp').controller('profileCtrl', ['$scope', 
	function ($scope) {
  	$scope.profile = JSON.parse(localStorage.getItem('user'));
	$scope.section='Profile';
	$scope.title='Profile';
  }]);