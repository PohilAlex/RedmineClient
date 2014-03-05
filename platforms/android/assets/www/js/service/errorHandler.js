angular.module('rcApp').factory('ApiErrorHandler', ['$location', function($location) {
	return {
		handle: function(httpResponse) {
			if (httpResponse.status == 401) {
	            $location.path("/");
	            alert('Auth problem');  
	          } else  if (httpResponse.status == 404) {
	            alert('Conection problem');  
	          } else {
	            alert('Data loading failed');
	          }		
		}
	}
}]);