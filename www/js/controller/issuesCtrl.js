    var projectId;  

angular.module('rcApp').controller('issuesCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$location','Issues', 'ApiErrorHandler', 'Navigation', 'DataLoader',
	function ($scope, $rootScope, $http, $routeParams, $location, Issues, ApiErrorHandler, Navigation, DataLoader) {
    Navigation.add($location.url());
    $scope.title = 'Issues';
    $scope.section = 'Issues';
    $scope.issues = DataLoader.getEntityInstance('issue');

    var currentProjectId = $routeParams.projectId;
    if (projectId != currentProjectId) {
      DataLoader.clearInstance('issue');
    }
    projectId = currentProjectId;

    $scope.issues.loadData = function() {
      var api_key = JSON.parse(localStorage.getItem('user')).api_key;   
      var params = {'key':api_key, 'project_id': projectId, 'status_id': '*', 'offset': $scope.issues.offset, 'limit': $scope.issues.limit}
      var data = Issues.query(params, 
        function() {
          $scope.issues.onDataLoaded(data.issues, data.total_count);
          if (projectId != undefined) {
            $scope.title = data.issues[0].project.name;
          }
        },
        function(httpResponse) {
          ApiErrorHandler.handle(httpResponse);
        });     
    }

  	 if ($scope.issues.isEmpty()) {
      $scope.issues.loadData();
    }

    $scope.isIssuesEmpty = function() {
      return $scope.issues.isEmpty();
    }

    $scope.isIssuesLoad = function() {
      return $scope.issues.isLoad();
    }

    $scope.loadMoreIssues = function() {
      $scope.issues.loadMore();
    };  

  }]);