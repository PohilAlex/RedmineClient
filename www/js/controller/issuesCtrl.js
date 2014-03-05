var issuesOffset = 0;
var issuesLimit = 20;
var issuesLoadCount = 0;
var issuesTotalCount = 0;
var projectId;

angular.module('rcApp').controller('issuesCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$location','Issues', 'ApiErrorHandler', 'Navigation',
	function ($scope, $rootScope, $http, $routeParams, $location, Issues, ApiErrorHandler, Navigation) {
    Navigation.add($location.url());
  	var currentProjectId = $routeParams.projectId;
  	if (projectId != currentProjectId) {
      issuesTotalCount = 0;
  		issuesLoadCount = 0;
  		issuesOffset = 0;
  	}
    projectId = currentProjectId;
	 
    $scope.title = 'Issues';
    $scope.section = 'Issues';
  	
  	$scope.issues = [];
  	loadIssuesData();
  	
  	$scope.isIssuesEmpty = function() {
  		return $scope.issues.length == 0;
  	}

    $scope.isIssuesLoad = function() {
      return issuesTotalCount == issuesLoadCount;
    }

  	$scope.loadMoreIssues = function() {
  		issuesOffset = issuesOffset + issuesLimit;
  		loadIssuesData();
  	};

  	function loadIssuesData() {
      var api_key = JSON.parse(localStorage.getItem('user')).api_key;   
  		var params = {'key':api_key, 'project_id': projectId/*, 'assigned_to_id':'me'*/, 'status_id': '*', 'offset': issuesOffset, 'limit': issuesLimit}
      var data = Issues.query(params, 
        function() {
          $scope.issues = $scope.issues.concat(data.issues);
          issuesLoadCount = $scope.issues.length;
          issuesTotalCount = data.total_count;
          if (projectId != undefined) {
            $scope.title = data.issues[0].project.name;
          }
        },
        function(httpResponse) {
          ApiErrorHandler.handle(httpResponse);
        });
  	}

  }]);