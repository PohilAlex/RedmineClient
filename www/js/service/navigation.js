angular.module('rcApp').factory('Navigation', ['$location', function($location) {
	var histoty = [];
	var rootPath = ['/projects', '/issues', '/profile'];

	function isEmpty() {
		return histoty.length <= 1;
	}

	return {

		back: function() {
			if (isEmpty()) {
				return;
			}
			histoty.pop();
			var path = histoty[histoty.length - 1];
			$location.path(path);
			console.log('back ' + path + '   histoty ' + histoty);
		},

		add: function(path) {
			if (rootPath.indexOf(path) != -1) {
				histoty.length = 0;
			}
			var top = histoty[histoty.length - 1];
			if (top != path) {
				histoty.push(path);
			}
			console.log('add ' + path + '   histoty ' + histoty);
		},

		isEmpty: isEmpty


	}
}]);