var host = 'http://crm.mlsdev.com'
angular.module('rcApp').factory('Projects', ['$resource', function($resource){
	return $resource(host + '/projects.:format', {format: 'json'}, {
		query: {method: 'GET', isArray: false}
	})
}]);

angular.module('rcApp').factory('Issues', ['$resource', function($resource){
	return $resource(host + '/issues/:issueId.:format', {format: 'json'}, {
		query: {method: 'GET', isArray: false},
		update: {method : 'PUT'}	
  })
}]);
